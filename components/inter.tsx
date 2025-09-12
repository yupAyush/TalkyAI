"use client"
import React from 'react'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import Vapi from '@vapi-ai/web';
import { useEffect } from 'react';
import { redirect } from 'next/navigation'
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { vapifunction } from '@/lib/assistantoption';
import { useRef } from 'react';
import Link from 'next/link';

enum callstatus{
    INACTIVE="INACTIVE",
    ACTIVE="ACTIVE",
    END="END",
    CONNECTING="CONNECTING"
}

function inter() {
      const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
      const [isSpeaking, setisSpeaking] = useState(false);
      const [callstat, setcallstat] = useState<callstatus>(callstatus.INACTIVE);
      const [data, setdata] = useState<any>();
      const [transcription, setTranscription] = useState<string>("");
      const searchParams= useSearchParams()
      const id = searchParams.get("id")
      const buttonRef = useRef<HTMLButtonElement>(null);
     

      const vstop=()=>{

       vapi.say("stopped",true)

      setisSpeaking(false);
      console.log("stopped")
      redirect('/')
       
      }
      
      useEffect(() => {
        const getdatabyid =async()=>{
           const res =  await axios.get("/api/byid",{
            params: { id }

        })
        console.log(res.data.questions)
        setdata(res.data)
       
        }
        getdatabyid()
        setcallstat(callstatus.END)
       
      }, []);

        const buttonhandler = () => {
          try {
            const assistantOptions = vapifunction(data?.username, data?.role, data?.level, data?.questions);
            console.log(assistantOptions);
            vapi.start(assistantOptions);
            console.log("started");
            vapi.on("speech-start", () => {
              setisSpeaking(true);
            });
            vapi.on("speech-end", () => {
              setisSpeaking(false);
            });
            vapi.on("call-start", () => {
              console.log("call started");
            });
            vapi.on("call-end", () => {
              redirect("/feedback");
              setcallstat(callstatus.END);
            });
            vapi.on('message', (message) => {
              if (message.type === 'transcript') {
                console.log(`${message.role}: ${message.transcript}`);
                setTranscription(message.transcript);
              }
           });

          
          } catch (error) {
            console.error("Error starting Vapi conversation:", error);
          }
       
      }
      
      

  const { user } = useUser();
  const url = user?.imageUrl || "/default-user.png";

   return (
      <div className='flex flex-col items-center justify-center sm:mt-11  p-0 '>
            <div className='flex flex-row items-center justify-center mt-12 gap-10 '>
                <div className='rounded w-[350px] h-[200px] lg:w-[500px] lg:h-[300px] bg-gradient-to-br from-purple-900 to-black flex flex-col items-center justify-center  outline-amber-50 outline-2 '>
                    <Image src="/logo.svg" alt="robot image" height={70} width={70} className='translate-y-4'/>
                    {isSpeaking && <span className='absolute inline-flex size-[70] rounded-full bg-purple-300 opacity-75 animate-ping '></span>}
                    <h1 className='text-xl font-mono font-bold text-white mt-3 translate-y-8'>AI interviewer</h1>

                    
                </div>
                <div className='rounded w-[500px] h-[300px] bg-gradient-to-br max-sm:hidden from-blue-900 to-black flex flex-col items-center justify-center outline-amber-50 outline-2 mb-0'>
                  <Image className='rounded-full translate-y-4' src={url} alt="user image" height={70} width={70}/>

                  <h1 className='text-xl font-mono font-bold text-white mt-3 translate-y-8' >{user?.firstName}</h1>

                </div>
              
          
                
              
            </div>
            {callstat!==callstatus.ACTIVE ?(<button onClick={buttonhandler} className='rounded bg-green-500 w-[300px] h-12 mt-11 text-lg p-2 font-mono text-white hover:bg-green-700'>

              <span>
                {callstat === callstatus.INACTIVE ? "Start Interview" : callstat === callstatus.END ?
                <Link href={{pathname:"feedback",query:{id:id}}}>View Feedback</Link>

             
                : "...."}
              </span>
            </button>) :<button ref={buttonRef} className='rounded bg-red-500 w-[300px] h-12 mt-11 text-lg p-2 font-mono text-white hover:bg-red-700' onClick={vstop}>End</button>}
            {transcription && (
      <div className="mt-4 p-2 bg-gray-800 text-white rounded w-[500px]">
        <strong>Live Transcription:</strong> {transcription}
      </div>
    )}
            
        </div>
   )
  
  }
export default inter
