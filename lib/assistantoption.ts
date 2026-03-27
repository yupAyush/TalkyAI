import { CreateAssistantDTO } from '@vapi-ai/web/dist/api';

export const vapifunction = (
  name: string,
  role: string,
  level: string,
  questions: string[]
): CreateAssistantDTO => {
  return {
    name: "AI Recruiter",
    firstMessage: `Hi ${name}, how are you? Ready for your interview on ${role}?`,

    // ✅ Switch from playht → 11labs to fix timeout errors
    voice: {
      provider: "11labs",
      voiceId: "paula", // reliable ElevenLabs voice
    },

    transcriber: {
      provider: "deepgram",
      language: "en",
    },

    model: {
      provider: "openai",
      model: "gpt-4o", // gpt-4o is faster & cheaper than gpt-4
      messages: [
        {
          role: "system",
          content: `
            You are an AI voice assistant conducting interviews, assess their responses.
            Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
            "Hey there! Welcome to your ${level} interview for ${role}. Let's get started with a few questions!"
            Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below are the questions, ask one by one:
            Questions: ${questions.join(", ")}
            If the candidate struggles, offer hints or rephrase the question without giving away the answer.
            Provide brief, encouraging feedback after each answer.
            Keep the conversation natural and engaging.
            End on a positive note: "Thanks for chatting! Hope to see you crushing projects soon!"
            Key Guidelines:
            - Be friendly, engaging, and witty
            - Keep responses short and natural, like a real conversation
            - Adapt based on the candidate's confidence level
            - End the meeting when user says to end it
          `.trim(),
        },
      ],
    },
  };
};