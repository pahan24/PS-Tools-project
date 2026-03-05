const fs = require('fs');
const path = require('path');

const NEW_HEADER = `    <header class="header">
        <div class="header-container">
            <a href="/" class="logo">
                <span>🛠️</span>
                <span>PS<span>Tools</span></span>
            </a>
            <nav class="nav">
                <a href="/">Home</a>
                <a href="/super/ai-studio.html" class="super-link">AI Studio</a>
                <a href="/guide/master-guide.html">Master Guide</a>
                <a href="/admin/login.html">Admin</a>
            </nav>
        </div>
    </header>`;

const NEW_FOOTER = `    <footer class="footer">
        <div class="footer-content">
            <p>&copy; 2025 PS Tools. Engineered for performance.</p>
        </div>
    </footer>`;

const HEADER_REGEX = /<header class="header">[\s\S]*?<\/header>/;
const FOOTER_REGEX = /<footer class="footer">[\s\S]*?<\/footer>/;

function updateDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(HEADER_REGEX, NEW_HEADER);
        content = content.replace(FOOTER_REGEX, NEW_FOOTER);
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${path.relative(process.cwd(), filePath)}`);
    });
}

updateDirectory(path.join(__dirname, 'frontend/tools'));
updateDirectory(path.join(__dirname, 'frontend/super'));
updateDirectory(path.join(__dirname, 'frontend/guide'));

console.log('All tools and super pages synchronized.');
