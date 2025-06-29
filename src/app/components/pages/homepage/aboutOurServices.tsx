'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

type Step = {
  number: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: '01',
    title: 'Personal Consultation',
    description: 'Est ante in nibh mauris. Aliquet nec ullamcorper sit amet. Pharetra magna ac placerat vestibulum.',
  },
  {
    number: '02',
    title: 'Finalizing your design',
    description: 'Est ante in nibh mauris. Aliquet nec ullamcorper sit amet. Pharetra magna ac placerat vestibulum.',
  },
  {
    number: '03',
    title: 'Appointment Booking',
    description: 'Est ante in nibh mauris. Aliquet nec ullamcorper sit amet. Pharetra magna ac placerat vestibulum.',
  },
  {
    number: '04',
    title: 'Finding your artist',
    description: 'Est ante in nibh mauris. Aliquet nec ullamcorper sit amet. Pharetra magna ac placerat vestibulum.',
  },
];

const AboutOurServices: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(3); // Open step 4 by default

  const toggleStep = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-gradient-to-bl from-[#010e1c] via-[#18120b] to-[#000925] text-white">
      <div className="w-full mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Image */}
        <div className="hidden lg:block relative w-full h-[658px]">
          <Image
            src="/images/eco.jpg" // Replace with your image path
            alt="Tattoo machine"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>

        {/* Right Accordion */}
        <div className='py-15  pr-4'>
          <h2 className="text-4xl md:text-5xl font-bold mb-10">How does it work ?</h2>

          <div className="space-y-8">
            {steps.map((step, index) => {
              const isOpen = activeIndex === index;

              return (
                <div
                  key={index}
                  className={`border p-5 transition-all duration-300 ${
                    isOpen ? 'border-white' : 'border-white/10'
                  }`}
                >
                  <div
                    onClick={() => toggleStep(index)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-2xl font-bold transition ${
                          isOpen ? 'text-orange-500' : 'text-gray-600'
                        }`}
                      >
                        {step.number}
                      </span>
                      <h3 className="text-xl md:text-2xl font-semibold">{step.title}</h3>
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOurServices;
