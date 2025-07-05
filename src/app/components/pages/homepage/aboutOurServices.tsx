'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

type Step = {
  number: string
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Explore the Collection',
    description:
      'Browse our curated selection of handcrafted wooden lamps, ranging from minimalist to rustic and boho styles.',
  },
  {
    number: '02',
    title: 'Select Your Base & Shade',
    description:
      'Choose your preferred lamp base and shade material. We offer a variety of wood finishes and premium fabrics.',
  },
  {
    number: '03',
    title: 'Personalize Your Details',
    description:
      'Customize dimensions, color accents, bulb types, or even add engraving to make it truly your own.',
  },
  {
    number: '04',
    title: 'View Real-time Previews',
    description:
      'See a live preview of your selections using our product visualizer to ensure it complements your interior.',
  },
  {
    number: '05',
    title: 'Add to Cart & Review',
    description:
      'Once satisfied, add your design to the cart. You can review or edit your choices before proceeding.',
  },
  {
    number: '06',
    title: 'Secure Checkout',
    description:
      'Complete your order using a secure payment method. We accept all major cards, PayPal, and mobile money.',
  },
]

const AboutOurServices: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0) // Open step 4 by default

  const toggleStep = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="bg-gradient-to-bl from-slate-700 via-slate-950 to-slate-800 text-white py-20 px-6 md:px-12">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold relative inline-block">
          <span className="text-white before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-[1px] before:bg-white after:absolute after:top-1/2 after:-right-10 after:w-8 after:h-[1px] after:bg-white">
            How Does It Work?
          </span>
        </h2>
        <p className="text-gray-400 italic mt-2">Below are step by step procedure on how you can render our services</p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Image */}
        <div className="relative rounded-xl w-full h-72 sm:h-96 md:h-[500px] lg:h-[658px] hidden lg:block">
          <Image
            src="/images/eco.jpg" // Replace with your image path
            alt="Tattoo machine"
            fill
            className="object-cover rounded-md"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>

        {/* Right Accordion */}
        <div className="w-full">
          <div className="space-y-8">
            {steps.map((step, index) => {
              const isOpen = activeIndex === index

              return (
                <div
                  key={index}
                  className={`border rounded-md p-5 transition-all duration-300 ${
                    isOpen ? 'border-white' : 'border-white/10'
                  }`}
                >
                  <div
                    onClick={() => toggleStep(index)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xl md:text-2xl font-bold transition ${
                          isOpen ? 'text-orange-500' : 'text-gray-600'
                        }`}
                      >
                        {step.number}
                      </span>
                      <h3 className="text-base md:text-lg font-semibold">{step.title}</h3>
                    </div>
                    <span className="text-gray-400">
                      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </div>

                  {isOpen && (
                    <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutOurServices
