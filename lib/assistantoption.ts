import { CreateAssistantDTO } from '@vapi-ai/web/dist/api';
export  const    vapifunction = (name:string,role:string,level:string,questions:[string]):any=>{
     
  const assistantOptions: CreateAssistantDTO = {
                        name: "AI Recruiter",
                        firstMessage: `Hi ${name}, how are you? Ready for your interview on ${role}?`,
                        
                        voice: {
                          provider: "playht",
                          voiceId: "jennifer"
                        },

                        transcriber: {
                          provider: "deepgram", // or "whisper" depending on your setup
                          language: "en"        // optional, specify language if needed
                        },

                        model: {
                          provider: "openai",
                          model: "gpt-4",
                          messages: [
                            {
                              role: "system",
                              content: `
                                You are an AI voice assistant conducting interviews., assess their responses.
                                Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
                                "Hey there! Welcome to your ${level} interview for ${role} Let's get started with a few questions!"
                                Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
                                Questions: ${questions}
                                If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
                                "Need a hint? 
                                Provide brief, encouraging feedback after each answer. Example:
                                "Nice! That's a solid answer."
                                "Hmm, not quite! Want to try again?"
                                Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!" after asking ${questions}, 
                                End on a positive note:
                                "Thanks for chatting! Hope to see you crushing projects soon!"
                                Key Guidelines:
                                - Be friendly, engaging, and witty
                                - Keep responses short and natural, like a real conversation
                                - Adapt based on the candidate's confidence level
                                end the meeting when user says end it , or any other word for ending 
                              `.trim()
                            }
                          ]
                        }
                      };
  return assistantOptions;

}