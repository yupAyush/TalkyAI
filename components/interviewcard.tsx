"use client"
import React from 'react'
import Image from 'next/image'
import { getRandomInterviewCover } from '@/lib/utils'
import { useState } from 'react'
import Link from 'next/link'


function interviewcard({role,type,level,techstack,questions,createdAt,_id}:any) {
  const [feedback, setfeedback] = useState<string>();

  return (
    <div className='w-[300px]   bg-gradient-to-br h-[300px] from-gray-900 to-black shad shadow-[0_0_20px_rgba(0,0,0,0.3)]  shadow-purple-600/50 hover:shadow-purple-500/70 focus:shadow-purple-500/70 active:shadow-purple-500/70 transition px-0 py-0 rounded-2xl '>
        <div className='flex flex-row justify-between'>
          <Image src={getRandomInterviewCover()} width={60} height={60} alt='cover image' className='rounded-full m-4' />
          <h1 className=' font-medium font-mono bg-purple-700 p-1.5 m-1 rounded-md h-[30px]'>{type}</h1>
          

        </div>
        <h1 className='text-2xl font-semibold font-sans m-4'>{role}</h1>
        <div className='flex flex-row m-4'>
          <div className='flex flex-row'>
            <Image src="/calendar.svg" width={15} height={15} alt='date' />
            <h1 className='text-sm text-white/70 font-semibold ml-0.5 mr-0.5'>{createdAt}</h1>
          </div>
          <div className='flex flex-row ml-5'>
            <Image src="/star.svg" width={15} height={15} alt='star' />
            
            <span className='text-sm text-white/70 font-semibold ml-0.5 mr-0.5'>{feedback?feedback:".../100"}</span>
          </div>

        </div>
        <span className='text-sm font-semibold font-sans text-white/80 m-4'>{feedback?"Check your feedback":"You haven't taken this interview"}</span>
        <button  className='bg-green-500 p-1 m-4 font-bold font-mono rounded text-sm  hover:bg-green-700 right-0'><Link href={{pathname:"interview",query:{id:_id}}}>{feedback?"View Feedback":"View Interview"}</Link></button>
      
    </div>
  )
}

export default interviewcard
