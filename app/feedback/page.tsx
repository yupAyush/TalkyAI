"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

function page() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const [feedback, setfeedback] = useState<any>();
  useEffect(() => {
    const feedbackdata =async()=>{
      await axios.get("/api/byid")
    }
    
    
  }, []);


  return (
    <div className='text-2xl text-white'>
        feedback page
      
    </div>
  )
}

export default page
