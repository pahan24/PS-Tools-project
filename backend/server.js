require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const toolsRoutes = require('./routes/tools');
const aiRoutes = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/tools/:toolName', (req, res) => {
  res.sendFile(path.join(__dirname, `../frontend/tools/${req.params.toolName}.html`));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║                                        ║
║        PS Tools Server Running         ║
║                                        ║
║  Port: ${PORT}                           ║
║  Environment: ${process.env.NODE_ENV || 'development'}            ║
║                                        ║
║  API Endpoints:                        ║
║  - GET  /api/health                    ║
║  - POST /api/auth/login                ║
║  - GET  /api/tools                     ║
║  - POST /api/ai/text                   ║
║  - POST /api/ai/code                   ║
║  - POST /api/ai/translate              ║
║  - POST /api/ai/chat                   ║
║                                        ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
