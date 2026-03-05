# PS Tools Deployment Checklist

## Pre-Deployment

### Security
- [ ] Change default admin password in `.env`
- [ ] Generate new JWT secret (use random 64+ character string)
- [ ] Update CORS_ORIGIN to your domain (remove `*`)
- [ ] Review and test all API endpoints
- [ ] Enable HTTPS/SSL certificate
- [ ] Set NODE_ENV=production

### Configuration
- [ ] Verify Groq API key is valid and has sufficient credits
- [ ] Test all AI tools functionality
- [ ] Check database/tools.json permissions
- [ ] Configure proper logging
- [ ] Set up error monitoring (optional: Sentry, LogRocket)

### Testing
- [ ] Test all 70+ tools functionality
- [ ] Verify admin panel authentication
- [ ] Test tool enable/disable functionality
- [ ] Check responsive design on mobile
- [ ] Test cross-browser compatibility
- [ ] Verify all API endpoints work correctly
- [ ] Load test with expected traffic

## Deployment

### Server Setup
- [ ] Install Node.js (v14+)
- [ ] Install PM2 process manager: `npm install -g pm2`
- [ ] Clone project to server
- [ ] Run `npm install` in backend directory
- [ ] Configure .env file with production values

### Web Server (Nginx/Apache)
- [ ] Install and configure reverse proxy
- [ ] Set up SSL certificate (Let's Encrypt recommended)
- [ ] Configure static file serving
- [ ] Set up proper cache headers
- [ ] Enable gzip compression

### Domain & DNS
- [ ] Point domain to server IP
- [ ] Configure A record
- [ ] Configure www subdomain (optional)
- [ ] Wait for DNS propagation (24-48 hours)

### Process Management
- [ ] Start application with PM2: `pm2 start backend/server.js --name pstools`
- [ ] Save PM2 configuration: `pm2 save`
- [ ] Set PM2 to start on boot: `pm2 startup`
- [ ] Test auto-restart: `pm2 restart pstools`

## Post-Deployment

### Monitoring
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure log rotation
- [ ] Set up PM2 monitoring: `pm2 monitor`
- [ ] Test error alerting
- [ ] Monitor API rate limits

### Performance
- [ ] Enable CDN for static assets (optional)
- [ ] Optimize images
- [ ] Enable browser caching
- [ ] Monitor server resources (CPU, RAM)
- [ ] Set up database backups (tools.json)

### Analytics & Ads
- [ ] Add Google Analytics or alternative
- [ ] Integrate ad network (Google AdSense, etc.)
- [ ] Replace ad placeholders with actual ad code
- [ ] Test ad rendering on all pages
- [ ] Monitor ad performance

### SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Verify meta tags on all pages
- [ ] Set up robots.txt
- [ ] Add structured data markup
- [ ] Test with Google PageSpeed Insights

### Documentation
- [ ] Update README with production URLs
- [ ] Document custom configurations
- [ ] Create backup/restore procedures
- [ ] Document troubleshooting steps

## Maintenance

### Regular Tasks
- [ ] Update dependencies monthly: `npm update`
- [ ] Check security vulnerabilities: `npm audit`
- [ ] Review error logs weekly
- [ ] Monitor API usage and costs
- [ ] Backup tools.json regularly
- [ ] Review and respond to user feedback

### Updates
- [ ] Test updates in staging environment first
- [ ] Keep Node.js updated
- [ ] Update SSL certificates before expiry
- [ ] Monitor Groq API changes
- [ ] Keep PM2 updated

## Quick Commands

### Start Server
```bash
pm2 start backend/server.js --name pstools
```

### Stop Server
```bash
pm2 stop pstools
```

### Restart Server
```bash
pm2 restart pstools
```

### View Logs
```bash
pm2 logs pstools
```

### Monitor
```bash
pm2 monit
```

### Update Application
```bash
git pull
npm install
pm2 restart pstools
```

## Backup Command
```bash
# Backup tools data
cp backend/data/tools.json backend/data/tools.backup.$(date +%Y%m%d).json
```

## Emergency Procedures

### If Server Crashes
1. Check logs: `pm2 logs pstools --lines 100`
2. Check error: `pm2 describe pstools`
3. Restart: `pm2 restart pstools`
4. If issue persists, restore from backup

### If Database Corrupted
1. Stop server: `pm2 stop pstools`
2. Restore backup: `cp backend/data/tools.backup.YYYYMMDD.json backend/data/tools.json`
3. Restart server: `pm2 restart pstools`

### If API Key Issues
1. Check .env GROQ_API_KEY is valid
2. Verify API credits/limits
3. Update key if needed
4. Restart server

## Support Contacts

- Hosting Provider: [contact info]
- Domain Registrar: [contact info]
- SSL Certificate: [renewal info]
- API Provider: [Groq support]

---

**Last Updated**: January 2025
**Version**: 1.0.0
