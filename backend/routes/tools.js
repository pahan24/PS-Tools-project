const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

const TOOLS_FILE = path.join(__dirname, '../data/tools.json');

// Get all tools (public)
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(TOOLS_FILE, 'utf8');
    const toolsData = JSON.parse(data);
    
    // Filter enabled tools for public
    const enabledTools = toolsData.tools.filter(tool => tool.enabled);
    
    res.json({ 
      success: true, 
      tools: enabledTools 
    });
  } catch (error) {
    console.error('Error reading tools:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to load tools' 
    });
  }
});

// Get all tools (admin)
router.get('/admin', authMiddleware, async (req, res) => {
  try {
    const data = await fs.readFile(TOOLS_FILE, 'utf8');
    const toolsData = JSON.parse(data);
    
    res.json({ 
      success: true, 
      tools: toolsData.tools 
    });
  } catch (error) {
    console.error('Error reading tools:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to load tools' 
    });
  }
});

// Get single tool
router.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(TOOLS_FILE, 'utf8');
    const toolsData = JSON.parse(data);
    const tool = toolsData.tools.find(t => t.id === req.params.id);
    
    if (!tool) {
      return res.status(404).json({ 
        success: false, 
        message: 'Tool not found' 
      });
    }
    
    res.json({ 
      success: true, 
      tool 
    });
  } catch (error) {
    console.error('Error reading tool:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to load tool' 
    });
  }
});

// Update tool (admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const data = await fs.readFile(TOOLS_FILE, 'utf8');
    const toolsData = JSON.parse(data);
    const toolIndex = toolsData.tools.findIndex(t => t.id === req.params.id);
    
    if (toolIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Tool not found' 
      });
    }
    
    // Update tool
    toolsData.tools[toolIndex] = {
      ...toolsData.tools[toolIndex],
      ...req.body,
      id: req.params.id // Prevent ID change
    };
    
    await fs.writeFile(TOOLS_FILE, JSON.stringify(toolsData, null, 2));
    
    res.json({ 
      success: true, 
      tool: toolsData.tools[toolIndex] 
    });
  } catch (error) {
    console.error('Error updating tool:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update tool' 
    });
  }
});

// Toggle tool enabled status (admin)
router.patch('/:id/toggle', authMiddleware, async (req, res) => {
  try {
    const data = await fs.readFile(TOOLS_FILE, 'utf8');
    const toolsData = JSON.parse(data);
    const tool = toolsData.tools.find(t => t.id === req.params.id);
    
    if (!tool) {
      return res.status(404).json({ 
        success: false, 
        message: 'Tool not found' 
      });
    }
    
    tool.enabled = !tool.enabled;
    await fs.writeFile(TOOLS_FILE, JSON.stringify(toolsData, null, 2));
    
    res.json({ 
      success: true, 
      tool 
    });
  } catch (error) {
    console.error('Error toggling tool:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to toggle tool' 
    });
  }
});

// Get tools by category
router.get('/category/:category', async (req, res) => {
  try {
    const data = await fs.readFile(TOOLS_FILE, 'utf8');
    const toolsData = JSON.parse(data);
    const tools = toolsData.tools.filter(
      t => t.category === req.params.category && t.enabled
    );
    
    res.json({ 
      success: true, 
      tools 
    });
  } catch (error) {
    console.error('Error reading tools:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to load tools' 
    });
  }
});

module.exports = router;
