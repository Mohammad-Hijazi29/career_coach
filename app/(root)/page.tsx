import React from 'react'
import Image from 'next/image'
import {getCurrentUser} from "@/lib/actions/auth.action"

import TemplateForm from '@/components/TemplateForm'
import TemplateLibrary from '@/components/TemplateLibrary'
import SideBanner from '@/components/SideBanner'


 const Page = async () =>{

  const user = await getCurrentUser();
  return(
    <>

      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
              <h2>AI-Powered Mock Interviews for the Real World</h2>
              <p className='text-lg'>
                  Get real-time interview questions with instant, personalized feedback.
              </p>
            
        </div>


        <Image src="/robot.png" alt="robot pic" width={400}  height={400} className="max-sm:hidden" />
      </section>

      <div className="form-banner">
          <SideBanner />
          <TemplateForm />
      </div>

    <TemplateLibrary/>

     



    </>
  )

 }

 export default Page