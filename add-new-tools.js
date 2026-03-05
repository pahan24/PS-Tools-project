const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, 'backend/data/tools.json');
const toolsData = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

const newTools = [
    {
        "id": "ai-seo-optimizer",
        "name": "AI SEO Optimizer",
        "category": "SEO Tools",
        "description": "Analyze and optimize content for SEO",
        "icon": "🚀",
        "path": "/tools/ai-seo-optimizer.html",
        "enabled": true,
        "featured": true,
        "ads": { "enabled": true, "positions": ["top", "bottom"] }
    },
    {
        "id": "code-migrator",
        "name": "AI Code Migrator",
        "category": "Developer Tools",
        "description": "Migrate code between languages",
        "icon": "🔄",
        "path": "/tools/code-migrator.html",
        "enabled": true,
        "featured": true,
        "ads": { "enabled": true, "positions": ["sidebar"] }
    },
    {
        "id": "secure-vault",
        "name": "Secure Text Vault",
        "category": "Utilities",
        "description": "Client-side encrypted notes",
        "icon": "🔐",
        "path": "/tools/secure-vault.html",
        "enabled": true,
        "featured": false,
        "ads": { "enabled": false, "positions": [] }
    },
    {
        "id": "smart-regex",
        "name": "Smart Regex Builder",
        "category": "Developer Tools",
        "description": "Generate Regex with natural language",
        "icon": "🔍",
        "path": "/tools/smart-regex.html",
        "enabled": true,
        "featured": false,
        "ads": { "enabled": true, "positions": ["top"] }
    },
    {
        "id": "ai-studio",
        "name": "AI Studio (Super)",
        "category": "Super Tools",
        "description": "All-in-one AI creation suite",
        "icon": "✨",
        "path": "/super/ai-studio.html",
        "enabled": true,
        "featured": true,
        "ads": { "enabled": false, "positions": [] }
    }
];

toolsData.tools.push(...newTools);
fs.writeFileSync(toolsPath, JSON.stringify(toolsData, null, 2));
console.log('Added 5 new high-value tools.');
