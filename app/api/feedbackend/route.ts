import dbconnect from "@/lib/dbconnect";
import user from "@/lib/models";
import { generateText } from "ai";
import {google} from "@ai-sdk/google";
import { json } from "zod";

export async function POST(request:Request) {
    const {chat} =   await request.json();
    const {searchParams}=new URL(request.url);
    const id=searchParams.get("id")
    
    console.log("type of chat",typeof(chat))
    console.log(JSON.stringify(chat))
    try {
        
        const { text } = await generateText({
            model:google("gemini-2.0-flash-001",),
            prompt:`
               You are an AI conversation /interview  analyst. Given a conversation  Here is the conversation :
                ${JSON.stringify(chat)}  of a conversation between interviewer and a candidate, your task is to:

                1. Analyze the tone, clarity, engagement, and relevance of the conversation.
                2. Provide constructive feedback on how the conversation could be improved.
                3. Assign a score out of 10 based on overall communication quality.
                4. Return the result in the following json format just this nothing else  no explanation just this , feedback and score
                5.Please return only  result like json format format  below  the  without any additional text.
                6.IMPORTANT do not use any special characters like \ ,/ ,\n ,*,json ,etc

               feedback:"the given feedback",
                score:"the given score/10",
              
              `,
        })

        const feedbacktext =JSON.parse(text.replace(/```json|```/g, "").trim())
        

    
        await dbconnect();
        
        await user.findByIdAndUpdate(id,{
            Finalized:true,
            feedback:JSON.stringify(feedbacktext),
        })
       
        
        return Response.json( feedbacktext,{status:200});
        
        
    } catch (error) {
        return Response.json({error:"Error in feedback generation"}, {status:500});
        
    }



    
}