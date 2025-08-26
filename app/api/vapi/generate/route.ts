import { generateText } from "ai";
import {google} from "@ai-sdk/google"



import user from "@/lib/models";
import dbconnect from "@/lib/dbconnect";
import { currentUser } from '@clerk/nextjs/server'



export async function GET() {
    return Response.json({sucess :true, message:"helloooooo"},{status:200});
    
}

export async function POST(request:Request) {
    const {type,role,level,techstack,amount} = await request.json()
    const clerkUser:null|any=await  currentUser()
    try {
        const {text} = await generateText({
            model:google("gemini-2.0-flash-001",),
            prompt:`Prepare questions for a job interview.
                    The job role is ${role}.
                    The job experience level is ${level}.
                    The tech stack used in the job is: ${techstack}.
                    The focus between behavioural and technical questions should lean towards: ${type}.
                    The amount of questions required is: ${amount}.
                    Please return only the questions, without any additional text.
                    The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
                    Return the questions formatted like this:
                    ["Question 1", "Question 2", "Question 3"]
                    
                    Thank you! <3
              `,
        })
        console.log(`generated ${text}`);
      try {
          await dbconnect();
          await user.create({
            role:role,
            level:level,
            techstack:techstack.split(","),
            questions:JSON.parse(text),
            type:type,
            username:clerkUser.firstName,
            createdAt:new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })
,
            amount:parseInt(amount)
            
         })
        return Response.json({sucess :true, message:"agya data"},{status:200});
      } catch (error) {
        console.error("Error saving interview data:", error);
        return Response.json({success: false, message: "Failed to save interview data"}, {status: 500});
        
        
      }

        
       
        
    } catch (error) {
        console.error("Error in POST request:", error);
        return Response.json({success: false, message: "Internal Server Error"}, {status: 500});
        
    }
    
}