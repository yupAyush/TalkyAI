"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { vapifunction } from '@/lib/assistantoption';
import Link from 'next/link';
import Vapi from '@vapi-ai/web';

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  END = "END",
}

export default function Inter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  
  const vapiRef = useRef<Vapi | null>(null);

  const [isSpeaking, setIsSpeaking] = useState(false); 
  const [callStat, setCallStat] = useState<CallStatus>(CallStatus.INACTIVE);
  const [data, setData] = useState<any>();
  const [transcription, setTranscription] = useState<string>("");

  const { user } = useUser();
  const url = user?.imageUrl || "/default-user.png";

  
  useEffect(() => {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    return () => {
      
      vapiRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    const getDataById = async () => {
      const res = await axios.get("/api/byid", { params: { id } });
      setData(res.data);
    };
    getDataById();
  }, [id]);

  const handleStop = () => {
    vapiRef.current?.stop();
    setIsSpeaking(false);
    setCallStat(CallStatus.END);
  };

  const buttonHandler = async () => {
    if (!data || !vapiRef.current) return;

    try {
      setCallStat(CallStatus.CONNECTING);
      const assistantOptions = vapifunction(
        data.username,
        data.role,
        data.level,
        data.questions
      );

      const vapi = vapiRef.current;

      vapi.on("speech-start", () => setIsSpeaking(true));
      vapi.on("speech-end", () => setIsSpeaking(false));

      
      vapi.on("call-start", () => {
        console.log("call started");
        setCallStat(CallStatus.ACTIVE);
      });

      
      vapi.on("call-end", () => {
        setCallStat(CallStatus.END);
        router.push(`/feedback?id=${id}`);
      });

      vapi.on("message", (message) => {
        if (message.type === "transcript") {
          setTranscription(message.transcript);
        }
      });

      vapi.on("error", (error) => {
        console.error("Vapi error:", error);
        setCallStat(CallStatus.INACTIVE);
      });

      await vapi.start(assistantOptions);
    } catch (error) {
      console.error("Error starting Vapi conversation:", error);
      setCallStat(CallStatus.INACTIVE);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center sm:mt-11 p-0'>
      <div className='flex flex-row items-center justify-center mt-12 gap-10'>
        <div className='rounded w-[350px] h-[200px] lg:w-[500px] lg:h-[300px] bg-gradient-to-br from-purple-900 to-black flex flex-col items-center justify-center outline-amber-50 outline-2'>
          <Image src="/logo.svg" alt="robot image" height={70} width={70} className='translate-y-4' />
          {isSpeaking && (
            <span className='absolute inline-flex size-[70] rounded-full bg-purple-300 opacity-75 animate-ping'></span>
          )}
          <h1 className='text-xl font-mono font-bold text-white mt-3 translate-y-8'>AI interviewer</h1>
        </div>

        <div className='rounded w-[500px] h-[300px] bg-gradient-to-br max-sm:hidden from-blue-900 to-black flex flex-col items-center justify-center outline-amber-50 outline-2 mb-0'>
          <Image className='rounded-full translate-y-4' src={url} alt="user image" height={70} width={70} />
          <h1 className='text-xl font-mono font-bold text-white mt-3 translate-y-8'>{user?.firstName}</h1>
        </div>
      </div>

      
      {callStat === CallStatus.ACTIVE ? (
        <button
          className='rounded bg-red-500 w-[300px] h-12 mt-11 text-lg p-2 font-mono text-white hover:bg-red-700'
          onClick={handleStop}
        >
          End
        </button>
      ) : (
        <button
          onClick={callStat === CallStatus.INACTIVE ? buttonHandler : undefined}
          className='rounded bg-green-500 w-[300px] h-12 mt-11 text-lg p-2 font-mono text-white hover:bg-green-700 disabled:opacity-50'
          disabled={callStat === CallStatus.CONNECTING}
        >
          {callStat === CallStatus.INACTIVE && "Start Interview"}
          {callStat === CallStatus.CONNECTING && "Connecting..."}
          {callStat === CallStatus.END && (
            <Link href={{ pathname: "feedback", query: { id } }}>View Feedback</Link>
          )}
        </button>
      )}

      {transcription && (
        <div className="mt-4 p-2 bg-gray-800 text-white rounded w-[500px]">
          <strong>Live Transcription:</strong> {transcription}
        </div>
      )}
    </div>
  );
}