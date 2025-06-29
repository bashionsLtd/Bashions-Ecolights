import React from 'react'
import Image from 'next/image'
import ContactInfo from '../../shared/contactInfo'
import Message from '../../shared/message'

const Info = () => {
  return (
    <section className="py-16 px-4">
        <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide relative inline-block">
          <span className="before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-[1px] before:bg-black after:absolute after:top-1/2 after:-right-10 after:w-8 after:h-[1px] after:bg-black">
            GET IN TOUCH
          </span>
        </h2>
        <p className="text-gray-500 italic mt-2">Let&apos;s talk</p>
      </div>
      <ContactInfo />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start mt-12">
        <Message />
        <div className="hidden lg:block relative w-full h-[520px]">
                  <Image
                    src="/images/inter.jpeg" // Replace with your image path
                    alt="Tattoo machine"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority
                  />
                </div>
      </div>
    </section>
  )
}

export default Info