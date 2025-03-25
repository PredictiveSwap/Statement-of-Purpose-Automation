import { NextRequest, NextResponse } from 'next/server';

// Configuration
const OLLAMA_API_BASE = "http://localhost:11434";
const MODEL_NAME = "llama3.1:8b";

// Define SOP sections with word limits and content requirements
const SOP_SECTION_PROMPTS = {
  "introduction": {
    title: "Respected Sir/Ma'am,",
    word_limit: 54,
    content: "A formal and respectful introduction that addresses the admission committee. Mention the specific program and university you're applying to."
  },
  "academic_background": {
    title: "Academic Background",
    word_limit: 71,
    content: "Brief overview of educational history focusing on most recent degree, major, institution, and graduation year. Include GPA if notable."
  },
  "language_proficiency": {
    title: "Language Proficiency",
    word_limit: 180,
    content: "Detail English language proficiency with test specifics (IELTS/TOEFL/PTE). Explain how language skills prepare you for academic success."
  },
  "financial_background": {
    title: "Financial Background",
    word_limit: 148,
    content: "Explain funding sources (personal, family, loans, scholarships). Provide evidence of sufficient funds for tuition and living expenses."
  },
  "why_this_country": {
    title: "Why I Choose this Country for my Studies",
    word_limit: 122,
    content: "Explain reasons for selecting this country for education. Mention educational quality, cultural aspects, or specific opportunities."
  },
  "career_opportunities": {
    title: "Career Opportunities in My Country After Completing the Program",
    word_limit: 354,
    content: "Detail job prospects in your home country after graduation. Include specific roles, companies, or industry needs for your new skills."
  },
  "family_ties": {
    title: "My Family Ties and Return to Home Country",
    word_limit: 275,
    content: "Describe family connections in your home country. Explain your intention to return after studies, including specific reasons."
  },
  "conclusion": {
    title: "Conclusion",
    word_limit: 70,
    content: "Brief summary reiterating key points. Express gratitude for consideration and enthusiasm for the opportunity."
  }
};

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const userData: Record<string, string> = {};
    
    // Convert FormData to object
    for (const [key, value] of formData.entries()) {
      userData[key] = value.toString();
    }
    
    // Generate the SOP
    const sopContent = await generateCompleteSOP(userData);
    
    return NextResponse.json({
      success: true,
      sop: sopContent
    });
  } catch (error) {
    console.error('Error generating SOP:', error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message
    }, { status: 500 });
  }
}

async function generateCompleteSOP(userData: Record<string, string>) {
  const sections: string[] = [];
  
  console.log("Generating SOP with sections:");
  for (const [sectionKey, sectionInfo] of Object.entries(SOP_SECTION_PROMPTS)) {
    console.log(`- ${sectionKey}: ${sectionInfo.word_limit} words`);
    
    // Generate this section with specific word count
    const sectionContent = await generateSectionWithOllama(
      sectionKey, 
      userData,
      sectionInfo.word_limit,
      sectionInfo.content
    );
    
    // Add the section to our list
    sections.push(sectionInfo.title);
    sections.push(sectionContent);
  }
  
  // Join all sections with double newlines
  return sections.join("\n\n");
}

async function generateSectionWithOllama(
  sectionKey: string, 
  userData: Record<string, string>, 
  wordLimit: number, 
  contentInstruction: string
) {
  try {
    // Prepare the prompt for the LLM
    const prompt = preparePrompt(sectionKey, userData, wordLimit, contentInstruction);
    
    // Calculate appropriate token count based on the word limit
    // Assuming approximately 1.5 tokens per word as a rough estimate
    const tokensNeeded = Math.max(Math.floor(wordLimit * 2.5), 1000); // At least 1000 tokens
    
    // Generate content using the model
    const sectionContent = await generateWithOllamaAPI(
      MODEL_NAME,
      prompt,
      0.7, // Balanced creativity
      tokensNeeded
    );
    
    // If there was an error, throw it
    if (sectionContent.startsWith("Error:")) {
      throw new Error(sectionContent);
    }
    
    // Validate the content length - this is now just for logging
    const wordCount = sectionContent.split(/\s+/).length;
    console.log(`Generated ${sectionKey} with ${wordCount} words (target: ${wordLimit})`);
    
    return sectionContent.trim();
  } catch (error) {
    console.error(`Error generating ${sectionKey}:`, error);
    throw error;
  }
}

function preparePrompt(
  sectionKey: string, 
  userData: Record<string, string>, 
  wordLimit: number, 
  contentInstruction: string
) {
  const systemPrompt = `You are an expert SOP writer for Ivy League college applications. 
Write the '${sectionKey}' section of a Statement of Purpose. 
The section should contain EXACTLY ${wordLimit} words - no more, no less. 
Count words carefully. 
Your response must be formal, clear, and professional. 
Use first-person perspective and ensure the content is relevant to the section. 
Do not include the title in your response. 
Avoid using platitudes, clichés, or overly generic statements. 
The response should be personalized with specific details from the user's background.

Section specific instructions: ${contentInstruction}`;
  
  // Create the user prompt with relevant data for this section
  let userPrompt = `Write the ${sectionKey} section for my SOP based on the following information:`;
  
  // Add relevant user data to the prompt based on the section
  if (sectionKey === "introduction") {
    userPrompt += `\nName: ${userData.name || ''}`;
    userPrompt += `\nProgram: ${userData.program || ''}`;
    userPrompt += `\nUniversity: ${userData.target_university || ''}`;
  } else if (sectionKey === "academic_background") {
    userPrompt += `\nDegree: ${userData.degree || ''}`;
    userPrompt += `\nInstitution: ${userData.institution || ''}`;
    userPrompt += `\nGraduation Year: ${userData.graduation_year || ''}`;
    userPrompt += `\nMajor: ${userData.major || ''}`;
    userPrompt += `\nGPA: ${userData.gpa || ''}`;
  } else if (sectionKey === "language_proficiency") {
    userPrompt += `\nLanguage Test: ${userData.language_test || ''}`;
    userPrompt += `\nScore: ${userData.language_score || ''}`;
  } else if (sectionKey === "financial_background") {
    userPrompt += `\nFunding Source: ${userData.funding_source || ''}`;
    userPrompt += `\nProof of Funds: ${userData.proof_of_funds || ''}`;
  } else if (sectionKey === "why_this_country") {
    userPrompt += `\nTarget Country: ${userData.target_country || ''}`;
    userPrompt += `\nUniversity: ${userData.target_university || ''}`;
    userPrompt += `\nProgram: ${userData.program || ''}`;
  } else if (sectionKey === "career_opportunities") {
    userPrompt += `\nDegree: ${userData.degree || ''}`;
    userPrompt += `\nProgram: ${userData.program || ''}`;
    userPrompt += `\nCareer Goals: ${userData.career_goals || ''}`;
  } else if (sectionKey === "family_ties") {
    userPrompt += `\nCountry of Origin: ${userData.country_of_origin || ''}`;
    userPrompt += `\nFamily Ties: ${userData.family_ties || ''}`;
  } else if (sectionKey === "conclusion") {
    userPrompt += `\nName: ${userData.name || ''}`;
    userPrompt += `\nProgram: ${userData.program || ''}`;
    userPrompt += `\nUniversity: ${userData.target_university || ''}`;
  }
  
  // Build the final messages array for the API
  return [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt }
  ];
}

async function generateWithOllamaAPI(
  model: string, 
  prompt: any[], 
  temperature = 0.7, 
  maxTokens = 1000
) {
  try {
    // Prepare the payload for the API call
    const payload = {
      model: model,
      messages: prompt,
      options: {
        temperature: temperature,
        num_predict: maxTokens
      },
      stream: false
    };
    
    // Make the API call
    const response = await fetch(`${OLLAMA_API_BASE}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });
    
    // Check if the request was successful
    if (response.ok) {
      const result = await response.json();
      
      // Extract the generated text
      if (result.message && result.message.content) {
        return result.message.content;
      } else {
        console.error('Unexpected response format:', result);
        return `Error: Unexpected response format from Ollama API`;
      }
    } else {
      const errorMsg = `Ollama API returned status code ${response.status}`;
      console.error(errorMsg);
      return `Error: ${errorMsg}`;
    }
  } catch (error) {
    return `Error: Failed to communicate with Ollama API - ${(error as Error).message}`;
  }
} 