'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { PiLampFill } from 'react-icons/pi'
import { HiArrowSmRight } from 'react-icons/hi'
import { TbLamp2 } from 'react-icons/tb'

interface Service {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  image: string
  readMoreLink: string
}

const allServices: Service[] = [
  {
    id: 'lighting',
    title: 'Wooden Lighting',
    description:
      'Excellence projecting is dewonshine dispatched remarkably on estimating. Side in so life past.',
    icon: <PiLampFill className="text-black" />,
    image: '/images/lig.jpg',
    readMoreLink: '#wedding',
  },
  {
    id: 'wood',
    title: 'Wooden Lamps',
    description:
      'Excellence projecting is dewonshine dispatched remarkably on estimating. Side in so life past.',
    icon: <PiLampFill className="text-black" />,
    image: '/images/bulb.jpeg',
    readMoreLink: '#wedding',
  },
  {
    id: 'arts',
    title: 'Wooden Wall Arts',
    description:
      'Excellence projecting is dewonshine dispatched remarkably on estimating. Side in so life past.',
    icon: <TbLamp2 className="text-black" />,
    image: '/images/art.jpeg',
    readMoreLink: '#home',
  },
  {
    id: 'Kitchen',
    title: 'Wooden Kitchen Material',
    description:
      'Excellence projecting is dewonshine dispatched remarkably on estimating. Side in so life past.',
    icon: <PiLampFill className="text-black" />,
    image: '/images/plate.jpeg',
    readMoreLink: '#life',
  },
  {
    id: 'brand',
    title: 'Wooden Branding Signs',
    description:
      'Excellence projecting is dewonshine dispatched remarkably on estimating. Side in so life past.',
    icon: <PiLampFill className="text-black" />,
    image: '/images/hello.jpg',
    readMoreLink: '#home',
  },
  {
    id: 'intern',
    title: 'Wood Working Internship',
    description:
      'Excellence projecting is dewonshine dispatched remarkably on estimating. Side in so life past.',
    icon: <PiLampFill className="text-black" />,
    image: '/images/int.jpeg',
    readMoreLink: '#home',
  },
]

const chunkServices = (services: Service[], isMobile: boolean) => {
  const chunkSize = isMobile ? 1 : 3
  const chunks: Service[][] = []
  for (let i = 0; i < services.length; i += chunkSize) {
    chunks.push(services.slice(i, i + chunkSize))
  }
  return chunks
}

const ServicesSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const slides = chunkServices(allServices, isMobile)

  useEffect(() => {
    // Fix: Clamp currentSlide to valid range after slide length changes
    setCurrentSlide((prev) => Math.min(prev, slides.length - 1))

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="text-center mb-10 px-4">
        <h2 className="text-4xl md:text-5xl font-bold relative inline-block">
          <span className="text-black before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-[1px] before:bg-black after:absolute after:top-1/2 after:-right-10 after:w-8 after:h-[1px] after:bg-black">
            SERVICES
          </span>
        </h2>
        <p className="text-gray-500 italic mt-2">We Offer To Our Clients</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 transition-all duration-500">
          {slides[currentSlide]?.map((service) => (
            <div
              key={service.id}
              className="bg-[#f7f7f7] p-5 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="relative mb-4 h-64 w-full rounded-md overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex items-center mb-5">
                <span className="mr-3 text-xl">{service.icon}</span>
                <h3 className="text-xl font-semibold text-black">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-8">
                {service.description}
              </p>
              <div className="bg-[#121121] hover:bg-[#353d44] mt-4 py-[7px] text-center">
                <a
                  href={service.readMoreLink}
                  className="text-white font-semibold hover:text-gray-200 italic justify-center flex gap-1 items-center"
                >
                  Read More
                  <span className="pt-1">
                    <HiArrowSmRight />
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-3">
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentSlide ? 'bg-black scale-110' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
