import { NextResponse } from 'next/server';

// Configuration
const OLLAMA_API_BASE = "http://localhost:11434";
const MODEL_NAME = "llama3.1:8b";

export async function GET() {
  try {
    const response = await fetch(`${OLLAMA_API_BASE}/api/tags`, {
      cache: 'no-store'
    });

    if (response.ok) {
      const data = await response.json();
      const models = data.models || [];
      
      // Check if our model is in the list
      const modelAvailable = models.some((model: any) => model.name === MODEL_NAME);
      
      if (modelAvailable) {
        return NextResponse.json({
          success: true,
          model: MODEL_NAME,
          error: null
        });
      } else {
        const availableModels = models.map((model: any) => model.name);
        return NextResponse.json({
          success: false,
          model: null,
          error: `Model ${MODEL_NAME} not found. Available models: ${availableModels.join(', ')}`
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        model: null,
        error: `Ollama API returned status code ${response.status}`
      });
    }
  } catch (error) {
    console.error('Error checking Ollama status:', error);
    return NextResponse.json({
      success: false,
      model: null,
      error: `Failed to connect to Ollama API: ${(error as Error).message}`
    });
  }
} 