# PS Tools - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
cd pstools/backend
npm install
```

### 2. Start the Server
```bash
npm start
```

Or use the quick start script:
```bash
cd pstools
./start.sh
```

### 3. Access the Application
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login.html
- **Admin Login**: 
  - Username: `admin`
  - Password: `admin123`

## 📦 What's Included

### ✅ 70+ Tools Across 6 Categories

1. **AI Tools (10)** - Powered by Groq API
   - Text Generator, Code Generator, Translator
   - Rewriter, Summarizer, Chat, Q&A
   - Story Writer, Blog Writer

2. **Image Tools (12)**
   - Compressor, Resizer, Cropper, Converter
   - PNG/JPG Converter, WebP Converter
   - Rotate, Blur, Sharpen, Filters
   - Meme Generator, Sticker Maker, GIF Maker

3. **Text Tools (11)**
   - Word Counter, Character Counter
   - Case Converter, Text Cleaner
   - Remove Spaces, Duplicate Lines
   - Lorem Ipsum, Text-to-Speech, Palindrome Checker

4. **Developer Tools (16)**
   - JSON Formatter/Minifier
   - HTML/CSS/JS Minifier & Beautifier
   - Base64 Encoder/Decoder
   - URL Encoder/Decoder
   - Regex Tester, Meta Generator, SEO Analyzer
   - Markdown Preview

5. **Utilities (16)**
   - QR Generator, Password Generator
   - UUID Generator, Color Picker
   - IP Lookup, Browser Info
   - Calculator, Unit Converter
   - Binary/Decimal Converter
   - Random Number, Password Strength
   - Stopwatch, Timer
   - Date/Time Converter

6. **Fun Tools & More (5)**
   - Emoji Generator, Random Joke
   - Quote Generator, Weather Checker
   - Currency Converter, BMI Calculator
   - Age Calculator, Horoscope, Birthday Reminder

## 🔑 Key Features

### For Users
- ✅ All tools work client-side (no data sent to server except AI tools)
- ✅ Fast, responsive design
- ✅ Mobile-friendly interface
- ✅ No registration required
- ✅ Search and filter functionality
- ✅ Copy to clipboard feature
- ✅ Download results

### For Admins
- ✅ Secure admin panel
- ✅ Enable/disable tools
- ✅ View statistics
- ✅ Manage tool settings
- ✅ Configure ad placements
- ✅ JWT authentication

### For Developers
- ✅ RESTful API
- ✅ Clean, modular code
- ✅ Easy to extend
- ✅ Well-documented
- ✅ Ready for deployment

## 🛠️ Configuration

### Change Admin Password
1. Generate new hash:
```javascript
const bcrypt = require('bcryptjs');
console.log(bcrypt.hashSync('your-new-password', 10));
```

2. Update in `backend/.env`:
```env
ADMIN_PASSWORD=your-new-hash-here
```

### Update API Key
Edit `backend/.env`:
```env
GROQ_API_KEY=your-groq-api-key-here
```

### Modify Tools
Edit `backend/data/tools.json` to:
- Enable/disable tools
- Update descriptions
- Configure ad settings
- Change categories

## 📁 Project Structure

```
pstools/
├── backend/              # Node.js server
│   ├── server.js        # Main server
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   └── data/           # Tools database
│
├── frontend/            # Website
│   ├── index.html      # Homepage
│   ├── tools/          # 70 tool pages
│   └── assets/         # CSS & JS
│
├── admin/              # Admin panel
│   ├── login.html
│   ├── dashboard.html
│   └── tools.html
│
├── start.sh            # Quick start script
├── README.md           # Full documentation
└── DEPLOYMENT.md       # Deployment guide
```

## 🌐 API Endpoints

### Public
- `GET /api/tools` - Get all enabled tools
- `POST /api/ai/text` - Generate text
- `POST /api/ai/code` - Generate code
- `POST /api/ai/translate` - Translate text
- `POST /api/ai/chat` - Chat with AI

### Admin (requires auth)
- `POST /api/auth/login` - Login
- `GET /api/tools/admin` - Get all tools
- `PATCH /api/tools/:id/toggle` - Toggle tool

## 🚀 Deployment Options

### Option 1: VPS/Cloud Server
```bash
# Install PM2
npm install -g pm2

# Start server
cd backend
pm2 start server.js --name pstools

# Save configuration
pm2 save
pm2 startup
```

### Option 2: Heroku
```bash
heroku create your-app-name
heroku config:set GROQ_API_KEY=your-key
git push heroku main
```

### Option 3: Vercel/Netlify
- Import project from Git
- Set environment variables
- Deploy!

## 🔧 Troubleshooting

### Server won't start?
- Check if port 3000 is free
- Verify .env file exists
- Run `npm install` again

### AI tools not working?
- Verify GROQ_API_KEY in .env
- Check API credits/limits
- Review server logs

### Can't login to admin?
- Default: admin / admin123
- Check JWT_SECRET in .env
- Clear browser cache

## 📊 File Count
- **Total HTML files**: 74 (1 homepage + 70 tools + 3 admin)
- **Backend files**: 8 (server, routes, middleware, data)
- **Frontend assets**: 2 (CSS + JS)
- **Documentation**: 3 (README, DEPLOYMENT, this guide)

## 🎯 Next Steps

1. ✅ Customize branding (logo, colors)
2. ✅ Add your own domain
3. ✅ Integrate analytics
4. ✅ Add advertising code
5. ✅ Deploy to production
6. ✅ Promote your tools!

## 💡 Tips

- Keep dependencies updated: `npm update`
- Monitor server logs: `pm2 logs`
- Backup tools.json regularly
- Test tools after updates
- Use HTTPS in production

## 📞 Support

- Check README.md for full documentation
- Review DEPLOYMENT.md for deployment help
- Check server logs for errors: `pm2 logs pstools`

---

**Your PS Tools project is ready to launch! 🎉**

Run `./start.sh` to begin!
