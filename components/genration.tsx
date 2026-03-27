"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { object } from 'zod';

import { useState,useEffect } from 'react';

import axios from 'axios';
import Interviewcard from './interviewcard';
import { useUser } from '@clerk/nextjs';



function main() {
  const [people, setpeople] = useState([]);
  const [interIndi, setinterIndi] = useState<boolean>(false);
  const { isSignedIn ,user } = useUser();




  useEffect(() => {
    const username = user?.firstName
    async function whatever() {
            

      
    
            const res = await axios.get("/api/getdata",{
              params:{username},
            })
            setpeople(res.data)
            console.log(res.data) 
            if (res.data.length > 0) {
              setinterIndi(true)
            } else {
              setinterIndi(false)
            }
       
      

  
  }
  whatever()
  console.log(username)
    
   
  }, [isSignedIn]);


  

  return (
    <>
    <div className='flex m-[30px] lg:m-[100px] lg:mt-[100px] flex-row justify-center items-center mt-[50px] rounded-xl bg-gradient-to-br from-purple-900 to-black h-[300px]  lg:h-[300px]  text-white'>
        <div className='p-[20px] max-w-lg'><h1 className='font-mono font-bold  text-2xl lg:text-4xl '>Get ready with AI-<br />powered practice and feedback</h1>
        <h5 className='font-bold font-mono  text-[15px] lg:text-xl  mx-sm:mt-[10px]'>practice real interview questions and get feedback</h5>
        <button  className='bg-green-500 p-2 mt-2.5 font-bold font-mono rounded hover:bg-green-700 w-full lg:w-auto '><Link href="/formgen">Genrate  interview</Link></button>
        </div>
        <div className='max-sm:hidden' ><Image src="/robot.png" alt="robot image" height={400} width={400}/></div>
    
      
    </div>
    <div className='mt-4 text-white mb-[50px] '>
      <h1 className='text-white font-mono flex items-center  justify-center font-bold text-3xl'>{interIndi? (isSignedIn?"Your  Interviews":"Sign In to see Interview"):"No interviews"}</h1>
      <div className='flex flex-col lg:flex-row gap-12  lg:overflow-auto    p-7 ml-[20px] scrollbar-hide'>
        {isSignedIn && <div className='flex-shrink-0 flex flex-col lg:flex-row gap-12'>
            
            {people?.map((e:object,i:any)=>{
            return <Interviewcard {...e} key={i} />
          
          })}
        </div>}
        
      </div>
      
    </div>
    
    
    </>
  )
}

export default main
