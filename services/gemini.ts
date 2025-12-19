
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async executeStreamPrompt(promptText: string, systemInstruction: string, onChunk: (chunk: string) => void) {
    try {
      const response = await this.ai.models.generateContentStream({
        model: 'gemini-3-pro-preview',
        contents: promptText,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      for await (const chunk of response) {
        if (chunk.text) {
          onChunk(chunk.text);
        }
      }
    } catch (error) {
      console.error("Gemini Streaming Error:", error);
      throw error;
    }
  }

  /**
   * Performs the multi-step Expert Polish as per the instructions:
   * 1. Circular discussion by critics.
   * 2. Implementation Director refinement.
   * 3. Expert UI/UX review and final version.
   */
  async executeExpertPolish(promptText: string, onProgress: (step: number, data: string) => void) {
    const model = 'gemini-3-pro-preview';

    // Step 1: Roundtable Critique
    const step1Prompt = `Imagine a roundtable of expert critics (A Pragmatic Architect, A Customer Obsessed Designer, and A Hard-nosed QA Lead) sitting in a circular discussion. Review the following content/request:
    "${promptText}"
    Create a multi-perspective critique where each critic has a distinct personality and tone. Present the discussion in real time.`;

    let step1Result = "";
    const res1 = await this.ai.models.generateContentStream({
      model,
      contents: step1Prompt,
      config: { systemInstruction: "You are hosting an expert circular discussion." }
    });
    for await (const chunk of res1) { if(chunk.text) { step1Result += chunk.text; onProgress(1, step1Result); } }

    // Step 2 & 3: Implementation Director Refinement
    const step2Prompt = `You are now an AI Implementation Director. Goal: Analyze the previous circular review, extract actionable recommendations, and produce an improved version of the original content while preserving its core essence.
    
    Original Content: "${promptText}"
    Expert Critique: "${step1Result}"
    
    Identify improvement opportunities. Apply one improvement at a time until complete.`;

    let step2Result = "";
    const res2 = await this.ai.models.generateContentStream({
      model,
      contents: step2Prompt,
      config: { systemInstruction: "Refine content based on expert panel feedback." }
    });
    for await (const chunk of res2) { if(chunk.text) { step2Result += chunk.text; onProgress(2, step2Result); } }

    // Step 4: UI/UX Audit & Final Version
    const step4Prompt = `You are my expert developer and UI/UX reviewer. Review the following refined code/plan for functionality, style, and best practices.
    
    Refined Content: "${step2Result}"
    
    Identify bugs, code smells, and opportunities to improve readability, accessibility (WCAG 2.2), and performance. Provide a prioritized list of issues with concise explanations and the final polished version.`;

    let finalResult = "";
    const res4 = await this.ai.models.generateContentStream({
      model,
      contents: step4Prompt,
      config: { systemInstruction: "Conduct a deep UI/UX and technical audit for WCAG compliance and best practices." }
    });
    for await (const chunk of res4) { if(chunk.text) { finalResult += chunk.text; onProgress(3, finalResult); } }
  }
}

export const geminiService = new GeminiService();
