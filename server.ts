import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defaultWeddingData } from './src/defaultWeddingData.ts';
import { RSVP, WeddingData } from './src/types.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Ensure data and upload directories exist
const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const weddingDataFile = path.join(dataDir, 'wedding-data.json');
const rsvpsFile = path.join(dataDir, 'rsvps.json');
const adminAuthFile = path.join(dataDir, 'admin-auth.json');

// Initialize data files if not present
if (!fs.existsSync(weddingDataFile)) {
  fs.writeFileSync(weddingDataFile, JSON.stringify(defaultWeddingData, null, 2), 'utf-8');
}

if (!fs.existsSync(rsvpsFile)) {
  // Pre-seed with a couple of heartfelt sample greetings/duas so the admin and guest feed look lively
  const initialRsvps: RSVP[] = [
    {
      id: 'rsvp-subhan-1',
      fullName: 'Dr. Zameer Ahmed & Family',
      mobileNumber: '+91 98490 12345',
      guestCount: 4,
      attending: 'Yes',
      eventChoice: 'Both',
      personalMessage: 'Mubarak to Mohammad Subhan Sahab & family! May Allah bless the couple Abdul Saleem and Sadiya with eternal joy and Mawaddah.',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'rsvp-subhan-2',
      fullName: 'Tariq Hussain & Family',
      mobileNumber: '+91 94401 67890',
      guestCount: 3,
      attending: 'Yes',
      eventChoice: 'Nikah',
      personalMessage: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fee khair. Looking forward to celebrating the Nikah at TYR Garden!',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];
  fs.writeFileSync(rsvpsFile, JSON.stringify(initialRsvps, null, 2), 'utf-8');
}

if (!fs.existsSync(adminAuthFile)) {
  fs.writeFileSync(
    adminAuthFile,
    JSON.stringify({ password: 'subhanfamily2027', token: 'admin_token_' + Date.now() }, null, 2),
    'utf-8'
  );
}

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Serve public directory (includes audio and uploads)
app.use(express.static(path.join(__dirname, 'public')));

// Helper to get admin config
function getAdminAuth() {
  try {
    const raw = fs.readFileSync(adminAuthFile, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { password: 'subhanfamily2027', token: 'secret-token' };
  }
}

// Admin auth middleware
function requireAdmin(req: Request, res: Response, next: () => void) {
  const authHeader = req.headers.authorization;
  const adminAuth = getAdminAuth();
  if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.slice(7) !== adminAuth.token) {
    res.status(401).json({ error: 'Unauthorized: Invalid admin credentials' });
    return;
  }
  next();
}

// --- API ROUTES ---

// 1. Get Wedding Data
app.get('/api/wedding-data', (_req: Request, res: Response) => {
  try {
    if (fs.existsSync(weddingDataFile)) {
      const data = JSON.parse(fs.readFileSync(weddingDataFile, 'utf-8'));
      res.json(data);
    } else {
      res.json(defaultWeddingData);
    }
  } catch (err) {
    console.error('Error reading wedding data:', err);
    res.json(defaultWeddingData);
  }
});

// 2. Update Wedding Data (Admin Protected)
app.post('/api/wedding-data', requireAdmin, (req: Request, res: Response) => {
  try {
    const updatedData: WeddingData = req.body;
    if (!updatedData.groomName || !updatedData.brideName) {
      res.status(400).json({ error: 'Groom and bride names are required' });
      return;
    }
    fs.writeFileSync(weddingDataFile, JSON.stringify(updatedData, null, 2), 'utf-8');
    res.json({ success: true, data: updatedData });
  } catch (err) {
    console.error('Error updating wedding data:', err);
    res.status(500).json({ error: 'Failed to update wedding data' });
  }
});

// 3. Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const adminAuth = getAdminAuth();
    if (password === adminAuth.password) {
      // Regenerate token or reuse
      const token = 'subhan_' + Math.random().toString(36).substring(2, 12);
      adminAuth.token = token;
      fs.writeFileSync(adminAuthFile, JSON.stringify(adminAuth, null, 2), 'utf-8');
      res.json({ success: true, token });
    } else {
      res.status(401).json({ error: 'Incorrect admin password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal login error' });
  }
});

// 4. Admin Change Password
app.post('/api/admin/change-password', requireAdmin, (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.trim().length < 4) {
      res.status(400).json({ error: 'Password must be at least 4 characters long' });
      return;
    }
    const adminAuth = getAdminAuth();
    adminAuth.password = newPassword.trim();
    fs.writeFileSync(adminAuthFile, JSON.stringify(adminAuth, null, 2), 'utf-8');
    res.json({ success: true, message: 'Admin password changed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// 5. Submit RSVP
app.post('/api/rsvps', (req: Request, res: Response) => {
  try {
    const { fullName, mobileNumber, guestCount, attending, eventChoice, personalMessage } = req.body;

    if (!fullName || !mobileNumber || !attending || !eventChoice) {
      res.status(400).json({ error: 'Please provide all required RSVP fields' });
      return;
    }

    const cleanPhone = String(mobileNumber).trim().replace(/\s+/g, '');
    let rsvps: RSVP[] = [];
    if (fs.existsSync(rsvpsFile)) {
      rsvps = JSON.parse(fs.readFileSync(rsvpsFile, 'utf-8'));
    }

    // Check duplicate submission for phone number
    const existingIndex = rsvps.findIndex((r) => r.mobileNumber.replace(/\s+/g, '') === cleanPhone);

    const newRsvp: RSVP = {
      id: 'rsvp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      fullName: String(fullName).trim(),
      mobileNumber: String(mobileNumber).trim(),
      guestCount: Math.max(1, parseInt(guestCount) || 1),
      attending: attending === 'No' ? 'No' : 'Yes',
      eventChoice: eventChoice,
      personalMessage: personalMessage ? String(personalMessage).trim() : '',
      createdAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      // Update existing submission rather than duplicating
      rsvps[existingIndex] = { ...newRsvp, id: rsvps[existingIndex].id };
      fs.writeFileSync(rsvpsFile, JSON.stringify(rsvps, null, 2), 'utf-8');
      res.json({
        success: true,
        updated: true,
        rsvp: rsvps[existingIndex],
        message: 'Your RSVP has been updated successfully. Alhamdulillah!',
      });
      return;
    }

    rsvps.unshift(newRsvp);
    fs.writeFileSync(rsvpsFile, JSON.stringify(rsvps, null, 2), 'utf-8');
    res.json({
      success: true,
      rsvp: newRsvp,
      message: 'Alhamdulillah! Thank you for your response. We look forward to celebrating this beautiful occasion with you.',
    });
  } catch (err) {
    console.error('Error saving RSVP:', err);
    res.status(500).json({ error: 'Failed to save RSVP' });
  }
});

// 6. Get RSVPs (Admin Protected or Summary)
app.get('/api/rsvps', requireAdmin, (_req: Request, res: Response) => {
  try {
    if (fs.existsSync(rsvpsFile)) {
      const rsvps: RSVP[] = JSON.parse(fs.readFileSync(rsvpsFile, 'utf-8'));
      res.json(rsvps);
    } else {
      res.json([]);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve RSVPs' });
  }
});

// 7. Delete RSVP (Admin Protected)
app.delete('/api/rsvps/:id', requireAdmin, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (fs.existsSync(rsvpsFile)) {
      let rsvps: RSVP[] = JSON.parse(fs.readFileSync(rsvpsFile, 'utf-8'));
      rsvps = rsvps.filter((r) => r.id !== id);
      fs.writeFileSync(rsvpsFile, JSON.stringify(rsvps, null, 2), 'utf-8');
      res.json({ success: true });
    } else {
      res.json({ success: true });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete RSVP' });
  }
});

// 8. Export RSVPs as CSV
app.get('/api/rsvps/export-csv', requireAdmin, (_req: Request, res: Response) => {
  try {
    let rsvps: RSVP[] = [];
    if (fs.existsSync(rsvpsFile)) {
      rsvps = JSON.parse(fs.readFileSync(rsvpsFile, 'utf-8'));
    }

    const headers = ['ID', 'Full Name', 'Mobile Number', 'Guest Count', 'Attending', 'Events Attending', 'Personal Message / Dua', 'Submitted At'];
    const rows = rsvps.map((r) => [
      `"${r.id}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.mobileNumber}"`,
      r.guestCount,
      `"${r.attending}"`,
      `"${r.eventChoice}"`,
      `"${(r.personalMessage || '').replace(/"/g, '""')}"`,
      `"${new Date(r.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="wedding_rsvps_abdul_saleem_and_sadiya.csv"');
    res.send(csvContent);
  } catch (err) {
    res.status(500).send('Error generating CSV');
  }
});

// 9. Upload image endpoint (base64 data URL)
app.post('/api/upload-image', requireAdmin, (req: Request, res: Response) => {
  try {
    const { dataUrl, filename } = req.body;
    if (!dataUrl || !dataUrl.startsWith('data:image/')) {
      res.status(400).json({ error: 'Invalid image data' });
      return;
    }

    const matches = dataUrl.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      res.status(400).json({ error: 'Invalid base64 image format' });
      return;
    }

    const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    const cleanName = (filename || 'custom_photo').replace(/[^a-zA-Z0-9_-]/g, '_');
    const targetFilename = `${cleanName}_${Date.now()}.${ext}`;
    const targetPath = path.join(uploadsDir, targetFilename);

    fs.writeFileSync(targetPath, buffer);
    const publicUrl = `/uploads/${targetFilename}`;

    res.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error('Error saving image:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// --- VITE DEV MIDDLEWARE & PRODUCTION SERVING ---
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Islamic Wedding Invitation server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
