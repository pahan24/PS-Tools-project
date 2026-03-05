# PS Tools - 70+ Free Online Tools

A comprehensive web application featuring 70+ online tools including AI-powered tools, image processors, text utilities, and developer tools.

## 🚀 Features

- **AI Tools** (10 tools): Text generation, code generation, translation, rewriting, summarization, chat, Q&A, blog writing, and story generation
- **Image Tools** (12 tools): Compression, resizing, cropping, format conversion, filters, meme generation, and more
- **Text Tools** (11 tools): Word counter, case converter, text cleaner, palindrome checker, and more
- **Developer Tools** (16 tools): JSON formatter, code minifiers/beautifiers, Base64 encoding, regex tester, and more
- **Utilities** (21 tools): QR generator, password generator, calculator, color picker, weather checker, and more
- **Fun Tools** (5 tools): Joke generator, quote generator, emoji picker, horoscope, and more

## 📁 Project Structure

```
pstools/
├── backend/                 # Node.js backend
│   ├── server.js           # Main server file
│   ├── package.json        # Dependencies
│   ├── .env               # Environment variables
│   ├── routes/
│   │   ├── auth.js        # Authentication routes
│   │   ├── tools.js       # Tools CRUD routes
│   │   └── ai.js          # AI API routes
│   ├── middleware/
│   │   └── auth.js        # JWT authentication
│   └── data/
│       └── tools.json     # Tools database
│
├── frontend/               # Frontend website
│   ├── index.html         # Homepage
│   ├── assets/
│   │   ├── css/style.css  # Styles
│   │   └── js/main.js     # JavaScript utilities
│   └── tools/             # 70+ tool pages
│
└── admin/                  # Admin panel
    ├── login.html
    ├── dashboard.html
    └── tools.html
```

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Clone or download the project**

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   
   The `.env` file is already configured with:
   - Admin credentials: username `admin`, password `admin123`
   - Your Groq API key for AI features
   - JWT secret for authentication

4. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Website: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin/login.html

## 🔑 Default Admin Credentials

- **Username**: admin
- **Password**: admin123

**Important**: Change these credentials in production by:
1. Generating a new password hash:
   ```javascript
   const bcrypt = require('bcryptjs');
   const hash = bcrypt.hashSync('your-new-password', 10);
   console.log(hash);
   ```
2. Update `ADMIN_PASSWORD` in `.env` with the new hash
3. Update `JWT_SECRET` to a random secure string

## 🌐 API Endpoints

### Public Endpoints

- `GET /api/health` - Health check
- `GET /api/tools` - Get all enabled tools
- `GET /api/tools/:id` - Get specific tool
- `POST /api/ai/text` - AI text generation
- `POST /api/ai/code` - AI code generation
- `POST /api/ai/translate` - Translation
- `POST /api/ai/rewrite` - Text rewriting
- `POST /api/ai/summarize` - Text summarization
- `POST /api/ai/chat` - Chat with AI
- `POST /api/ai/story` - Story generation
- `POST /api/ai/blog` - Blog post generation
- `POST /api/ai/qa` - Question answering

### Admin Endpoints (Require Authentication)

- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `GET /api/tools/admin` - Get all tools (including disabled)
- `PUT /api/tools/:id` - Update tool
- `PATCH /api/tools/:id/toggle` - Toggle tool enabled status

## 🔧 Configuration

### Environment Variables

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-jwt-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=hashed-password
GROQ_API_KEY=your-groq-api-key
CORS_ORIGIN=*
```

### Tools Configuration

Edit `backend/data/tools.json` to:
- Enable/disable tools
- Modify tool metadata
- Configure ad placements
- Update descriptions and icons

## 🚀 Deployment

### Deploy to Production Server

1. **Set environment to production**
   ```env
   NODE_ENV=production
   ```

2. **Use a process manager** (recommended: PM2)
   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name pstools
   pm2 save
   pm2 startup
   ```

3. **Set up reverse proxy** (Nginx example)
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Deploy to Heroku

1. Create `Procfile`:
   ```
   web: node backend/server.js
   ```

2. Deploy:
   ```bash
   heroku create your-app-name
   heroku config:set GROQ_API_KEY=your-key
   heroku config:set JWT_SECRET=your-secret
   git push heroku main
   ```

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Create `vercel.json`:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "backend/server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "backend/server.js"
       }
     ]
   }
   ```

3. Deploy:
   ```bash
   vercel
   ```

## 📝 Adding New Tools

1. **Add tool metadata** to `backend/data/tools.json`:
   ```json
   {
     "id": "my-tool",
     "name": "My Tool",
     "category": "Utilities",
     "description": "Description here",
     "icon": "🔧",
     "path": "/tools/my-tool.html",
     "enabled": true,
     "featured": false,
     "ads": {
       "enabled": true,
       "positions": ["top", "bottom"]
     }
   }
   ```

2. **Create tool page** at `frontend/tools/my-tool.html` using existing tools as templates

3. **Restart server** to load changes

## 🎨 Customization

### Branding

- Update logo and name in `frontend/index.html` and `frontend/assets/css/style.css`
- Modify color scheme in CSS variables (`:root` section)

### Ad Integration

- Replace ad placeholders in tool pages with actual ad code
- Ad positions configured in `tools.json`: top, sidebar, bottom

## 🔒 Security

- JWT tokens expire after 24 hours
- Passwords are hashed with bcrypt
- CORS configured (update CORS_ORIGIN for production)
- Always use HTTPS in production
- Keep dependencies updated: `npm audit fix`

## 🐛 Troubleshooting

### Server won't start
- Check if port 3000 is available
- Verify all dependencies are installed
- Check `.env` file exists and is configured

### AI features not working
- Verify GROQ_API_KEY is set correctly
- Check API rate limits
- Review backend logs for errors

### Tools not appearing
- Check `backend/data/tools.json` is valid JSON
- Verify tool `enabled` property is true
- Clear browser cache

## 📊 Features Overview

### AI Tools (Powered by Groq API)
- Text generation with customizable parameters
- Multi-language translation
- Code generation for multiple languages
- Text rewriting with style options
- Automatic summarization
- Interactive chat assistant
- Q&A system
- Blog post generation
- Creative story writing

### Image Processing
- Client-side processing (no uploads to server)
- Format conversion (PNG, JPG, WebP)
- Compression with quality control
- Resize, crop, rotate operations
- Filters and effects
- Meme and sticker creation

### Text Utilities
- Real-time word/character counting
- Case conversion
- Text cleaning and formatting
- Duplicate line removal
- Palindrome checking
- Lorem ipsum generation

### Developer Tools
- JSON formatting and validation
- Code minification (HTML/CSS/JS)
- Code beautification
- Base64 encoding/decoding
- URL encoding/decoding
- Regex testing
- SEO meta tag generation

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For issues or questions:
- Check the troubleshooting section
- Review API documentation
- Check server logs for errors

## 🔄 Updates

To update tools or add features:
1. Modify `backend/data/tools.json`
2. Create new tool pages in `frontend/tools/`
3. Add API endpoints in `backend/routes/` if needed
4. Restart server

---

**Built with ❤️ using Node.js, Express, and Groq AI**
