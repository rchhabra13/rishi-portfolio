// utils/localModels.js

// Quick check if Ollama is running
export async function checkOllamaStatus() {
  try {
    const response = await fetch('http://localhost:11435/api/tags', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// List available models
export async function listAvailableModels() {
  try {
    const response = await fetch('http://localhost:11435/api/tags');
    if (!response.ok) return [];
    
    const data = await response.json();
    return data.models?.map(model => model.name) || [];
  } catch (error) {
    console.error('Failed to list models:', error);
    return [];
  }
}

// Call local LLM with timeout and error handling
export async function callLocalLLM(message, systemPrompt = '', timeout = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // Check if Ollama is running first
    const isRunning = await checkOllamaStatus();
    if (!isRunning) {
      throw new Error('Ollama is not running. Please start Ollama and try again.');
    }

    const response = await fetch('http://localhost:11435/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'phi', // Use available model
        prompt: systemPrompt ? `${systemPrompt}\n\nUser: ${message}\nAssistant:` : message,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 200, // Shorter responses for speed
          top_k: 40,
          top_p: 0.9,
        }
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.response) {
      throw new Error('Empty response from Ollama');
    }

    return data.response.trim();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timed out - Ollama is taking too long to respond');
    }
    
    throw error;
  }
}

// Generate embeddings with local model
export async function generateLocalEmbedding(text, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch('http://localhost:11435/api/embeddings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'nomic-embed-text',
        prompt: text.slice(0, 512), // Limit for performance
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Embedding API error: ${response.status}`);
    }

    const data = await response.json();
    return data.embedding;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Embedding generation timed out');
    }
    
    throw error;
  }
}

// Health check for debugging
export async function healthCheck() {
  try {
    const status = await checkOllamaStatus();
    const models = await listAvailableModels();
    
    return {
      ollamaRunning: status,
      availableModels: models,
      recommendedModels: {
        chat: models.includes('llama3.2:1b') ? 'llama3.2:1b' : models.includes('phi') ? 'phi' : 'none',
        embedding: models.includes('nomic-embed-text') ? 'nomic-embed-text' : 'none'
      }
    };
  } catch (error) {
    return {
      ollamaRunning: false,
      error: error.message,
      availableModels: [],
      recommendedModels: { chat: 'none', embedding: 'none' }
    };
  }
}

export default {
  callLocalLLM,
  generateLocalEmbedding,
  checkOllamaStatus,
  listAvailableModels,
  healthCheck
};