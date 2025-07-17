'use client'

import React from 'react'
import Image from 'next/image'
import ContactInfo from '../../shared/contactInfo'
import Message from '../../shared/message'

const Info = () => {
  return (
    <section className="bg-gradient-to-bl from-slate-700 via-slate-950 to-slate-800 py-24 px-4 text-white">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold relative inline-block">
          <span className="text-white before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-[1px] before:bg-white after:absolute after:top-1/2 after:-right-10 after:w-8 after:h-[1px] after:bg-white">
            GET IN TOUCH
          </span>
        </h2>
        <p className="text-gray-400 italic mt-2">Let&apos;s talk</p>
      </div>

      <ContactInfo />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start mt-12 px-2">
        <Message />

        {/* Responsive image container */}
        <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[520px]">
          <Image
            src="/images/inter.jpeg" // Replace with actual image
            alt="Tattoo machine"
            fill
            className="object-cover rounded-md"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default Info
