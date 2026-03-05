// API Configuration
const API_BASE_URL = window.location.origin;

// Utility Functions
const utils = {
  // Show loading state on button
  setLoading(button, isLoading) {
    if (isLoading) {
      button.disabled = true;
      button.dataset.originalText = button.innerHTML;
      button.innerHTML = '<span class="loading"></span> Processing...';
    } else {
      button.disabled = false;
      button.innerHTML = button.dataset.originalText;
    }
  },

  // Show alert message
  showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    const container = document.querySelector('.tool-content') || document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);

    setTimeout(() => alertDiv.remove(), 5000);
  },

  // Copy to clipboard
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showAlert('Copied to clipboard!', 'success');
    } catch (err) {
      this.showAlert('Failed to copy', 'error');
    }
  },

  // Download text as file
  downloadText(text, filename) {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Download image
  downloadImage(dataUrl, filename) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },

  // Format file size
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  },

  // Validate file type
  validateFile(file, allowedTypes) {
    return allowedTypes.some(type => file.type.includes(type));
  },

  // Read file as data URL
  readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  // Read file as text
  readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  },

  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Format number with commas
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  // Initialize premium effects
  initScrollReveal() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.tool-card, .tool-content, .stat-card, .guide-card, .pane').forEach(el => {
      el.classList.add('reveal-on-scroll');
      observer.observe(el);
    });
  },

  // Command Palette (Cmd+K)
  initCommandPalette() {
    const palette = document.createElement('div');
    palette.className = 'search-palette';
    palette.id = 'commandPalette';
    palette.innerHTML = `
      <div class="search-palette-content">
        <div class="palette-input-wrapper">
          <span>🔍</span>
          <input type="text" class="palette-input" id="paletteInput" placeholder="Jump to any tool... (Esc to close)">
        </div>
        <div class="palette-results" id="paletteResults"></div>
      </div>`;
    document.body.appendChild(palette);

    const input = document.getElementById('paletteInput');
    const results = document.getElementById('paletteResults');

    // Toggle Palette
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        palette.classList.add('active');
        input.focus();
      }
      if (e.key === 'Escape') palette.classList.remove('active');
    });

    palette.addEventListener('click', (e) => {
      if (e.target === palette) palette.classList.remove('active');
    });

    // Search Logic
    input.addEventListener('input', async (e) => {
      const q = e.target.value.toLowerCase();
      if (!q) { results.innerHTML = ''; return; }

      const allTools = (await api.getTools()).tools;
      const filtered = allTools.filter(t =>
        t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      ).slice(0, 8);

      results.innerHTML = filtered.map(t => `
        <div class="palette-item" onclick="window.location.href='${t.path}'">
          <i>${t.icon}</i>
          <div>
            <div style="font-weight: 700;">${t.name}</div>
            <div style="font-size: 0.75rem; color: var(--text-dim);">${t.category}</div>
          </div>
        </div>
      `).join('');
    });
  }
};

// Initialize premium effects if in a browser environment
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    utils.initScrollReveal();
    utils.initCommandPalette();
  });
}

// API Helper Functions
const api = {
  // Generic API call
  async call(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // AI Text Generation
  async generateText(prompt, maxTokens = 1000, temperature = 0.7) {
    return this.call('ai/text', {
      method: 'POST',
      body: JSON.stringify({ prompt, maxTokens, temperature })
    });
  },

  // AI Code Generation
  async generateCode(prompt, language = 'javascript') {
    return this.call('ai/code', {
      method: 'POST',
      body: JSON.stringify({ prompt, language })
    });
  },

  // AI Translation
  async translate(text, targetLanguage, sourceLanguage = 'auto') {
    return this.call('ai/translate', {
      method: 'POST',
      body: JSON.stringify({ text, targetLanguage, sourceLanguage })
    });
  },

  // AI Rewriter
  async rewrite(text, style = 'formal') {
    return this.call('ai/rewrite', {
      method: 'POST',
      body: JSON.stringify({ text, style })
    });
  },

  // AI Summarizer
  async summarize(text, length = 'medium') {
    return this.call('ai/summarize', {
      method: 'POST',
      body: JSON.stringify({ text, length })
    });
  },

  // AI Chat
  async chat(message, history = []) {
    return this.call('ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history })
    });
  },

  // AI Story
  async generateStory(prompt, genre = 'general', length = 'medium') {
    return this.call('ai/story', {
      method: 'POST',
      body: JSON.stringify({ prompt, genre, length })
    });
  },

  // AI Blog
  async generateBlog(topic, keywords = [], tone = 'professional') {
    return this.call('ai/blog', {
      method: 'POST',
      body: JSON.stringify({ topic, keywords, tone })
    });
  },

  // AI Q&A
  async askQuestion(question) {
    return this.call('ai/qa', {
      method: 'POST',
      body: JSON.stringify({ question })
    });
  },

  // Get all tools
  async getTools() {
    return this.call('tools');
  },

  // Get tool by ID
  async getTool(id) {
    return this.call(`tools/${id}`);
  }
};

// Image Processing Utilities
const imageUtils = {
  // Compress image
  async compressImage(file, quality = 0.7) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            resolve(blob);
          }, file.type, quality);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  },

  // Resize image
  async resizeImage(file, width, height) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            resolve(blob);
          }, file.type);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  },

  // Convert image format
  async convertImage(file, format = 'image/jpeg') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            resolve(blob);
          }, format);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  },

  // Apply filter to image
  applyFilter(canvas, filter) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    switch (filter) {
      case 'grayscale':
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = avg;
        }
        break;
      case 'sepia':
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
          data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
          data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        }
        break;
      case 'invert':
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
        break;
    }

    ctx.putImageData(imageData, 0, 0);
  }
};

// Text Processing Utilities
const textUtils = {
  // Count words
  countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  },

  // Count characters
  countCharacters(text, includeSpaces = true) {
    return includeSpaces ? text.length : text.replace(/\s/g, '').length;
  },

  // Count sentences
  countSentences(text) {
    return text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  },

  // Count paragraphs
  countParagraphs(text) {
    return text.split(/\n\n+/).filter(p => p.trim().length > 0).length;
  },

  // Remove extra spaces
  cleanText(text) {
    return text.replace(/\s+/g, ' ').trim();
  },

  // Convert case
  convertCase(text, caseType) {
    switch (caseType) {
      case 'upper':
        return text.toUpperCase();
      case 'lower':
        return text.toLowerCase();
      case 'title':
        return text.replace(/\w\S*/g, txt =>
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
      case 'sentence':
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      default:
        return text;
    }
  },

  // Remove duplicate lines
  removeDuplicateLines(text) {
    const lines = text.split('\n');
    const unique = [...new Set(lines)];
    return unique.join('\n');
  },

  // Check palindrome
  isPalindrome(text) {
    const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { utils, api, imageUtils, textUtils };
}
