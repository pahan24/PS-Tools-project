const express = require('express');
const axios = require('axios');
const router = express.Router();

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Text generation endpoint
router.post('/text', async (req, res) => {
  try {
    const { prompt, maxTokens = 1000, temperature = 0.7 } = req.body;

    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        message: 'Prompt is required' 
      });
    }

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: maxTokens,
        temperature: temperature
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const generatedText = response.data.choices[0].message.content;

    res.json({ 
      success: true, 
      text: generatedText,
      usage: response.data.usage
    });
  } catch (error) {
    console.error('AI Text Error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: error.response?.data?.error?.message || 'Failed to generate text',
      error: error.message
    });
  }
});

// Code generation endpoint
router.post('/code', async (req, res) => {
  try {
    const { prompt, language = 'javascript' } = req.body;

    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        message: 'Prompt is required' 
      });
    }

    const systemPrompt = `You are an expert programmer. Generate clean, well-commented ${language} code based on the user's request. Only output the code, no explanations unless asked.`;

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.3
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const generatedCode = response.data.choices[0].message.content;

    res.json({ 
      success: true, 
      code: generatedCode,
      language: language
    });
  } catch (error) {
    console.error('AI Code Error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to generate code',
      error: error.message
    });
  }
});

// Translation endpoint
router.post('/translate', async (req, res) => {
  try {
    const { text, targetLanguage, sourceLanguage = 'auto' } = req.body;

    if (!text || !targetLanguage) {
      return res.status(400).json({ 
        success: false, 
        message: 'Text and target language are required' 
      });
    }

    const prompt = sourceLanguage === 'auto' 
      ? `Translate the following text to ${targetLanguage}. Only output the translation:\n\n${text}`
      : `Translate the following text from ${sourceLanguage} to ${targetLanguage}. Only output the translation:\n\n${text}`;

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1500,
        temperature: 0.3
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const translation = response.data.choices[0].message.content;

    res.json({ 
      success: true, 
      translation: translation
    });
  } catch (error) {
    console.error('Translation Error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to translate text',
      error: error.message
    });
  }
});

// Rewriter endpoint
router.post('/rewrite', async (req, res) => {
  try {
    const { text, style = 'formal' } = req.body;

    if (!text) {
      return res.status(400).json({ 
        success: false, 
        message: 'Text is required' 
      });
    }

    const stylePrompts = {
      formal: 'Rewrite the following text in a formal, professional style:',
      casual: 'Rewrite the following text in a casual, friendly style:',
      academic: 'Rewrite the following text in an academic, scholarly style:',
      creative: 'Rewrite the following text in a creative, engaging style:'
    };

    const prompt = `${stylePrompts[style] || stylePrompts.formal}\n\n${text}`;

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1500,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const rewrittenText = response.data.choices[0].message.content;

    res.json({ 
      success: true, 
      text: rewrittenText
    });
  } catch (error) {
    console.error('Rewrite Error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to rewrite text',
      error: error.message
    });
  }
});

// Summarizer endpoint
router.post('/summarize', async (req, res) => {
  try {
    const { text, length = 'medium' } = req.body;

    if (!text) {
      return res.status(400).json({ 
        success: false, 
        message: 'Text is required' 
      });
    }

    const lengthPrompts = {
      short: 'Provide a very brief summary (2-3 sentences):',
      medium: 'Provide a concise summary (4-6 sentences):',
      long: 'Provide a detailed summary:'
    };

    const prompt = `${lengthPrompts[length] || lengthPrompts.medium}\n\n${text}`;

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.5
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const summary = response.data.choices[0].message.content;

    res.json({ 
      success: true, 
      summary: summary
    });
  } catch (error) {
    console.error('Summarize Error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to summarize text',
      error: error.message
    });
  }
});

// Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Message is required' 
      });
    }

    const messages = [
      {
        role: 'system',
        content: 'You are a helpful AI assistant. Provide clear, concise, and accurate responses.'
      },
      ...history,
      {
        role: 'user',
        content: message
      }
    ];

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        max_tokens: 1500,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({ 
      success: true, 
      reply: reply
    });
  } catch (error) {
    console.error('Chat Error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get chat response',
      error: error.message
    });
  }
});

// Story generation endpoint
router.post('/story', async (req, res) => {
  try {
    const { prompt, genre = 'general', length = 'medium' } = req.body;

    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        message: 'Prompt is required' 
      });
    }

    const lengthGuide = {
      short: '200-300 words',
      medium: '400-600 words',
      long: '800-1000 words'
    };

    const storyPrompt = `Write a ${genre} story of approximately ${lengthGuide[length] || lengthGuide.medium} based on this prompt: ${prompt}`;

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: storyPrompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.8
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const story = response.data.choices[0].message.content;

    res.json({ 
      success: true, 
      story: story
    });
  } catch (error) {
    console.error('Story Error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to generate story',
      error: error.message
    });
  }
});

// Blog post generation endpoint
router.post('/blog', async (req, res) => {
  try {
    const { topic, keywords = [], tone = 'professional' } = req.body;

    if (!topic) {
      return res.status(400).json({ 
        success: false, 
        message: 'Topic is required' 
      });
    }

    const keywordText = keywords.length > 0 ? `Include these keywords: ${keywords.join(', ')}. ` : '';
    const prompt = `Write a ${tone} blog post about: ${topic}. ${keywordText}The post should be well-structured with an introduction, main points, and conclusion.`;

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const blogPost = response.data.choices[0].message.content;

    res.json({ 
      success: true, 
      post: blogPost
    });
  } catch (error) {
    console.error('Blog Error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to generate blog post',
      error: error.message
    });
  }
});

// Q&A endpoint
router.post('/qa', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ 
        success: false, 
        message: 'Question is required' 
      });
    }

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable assistant. Provide accurate, detailed answers to questions.'
          },
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 1500,
        temperature: 0.5
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const answer = response.data.choices[0].message.content;

    res.json({ 
      success: true, 
      answer: answer
    });
  } catch (error) {
    console.error('Q&A Error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to answer question',
      error: error.message
    });
  }
});

module.exports = router;
