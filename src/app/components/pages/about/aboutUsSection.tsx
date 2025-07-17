'use client'

import Image from 'next/image'

const AboutUsSection = () => {
  return (
    <section className="w-full bg-gradient-to-bl from-slate-700 via-slate-950 to-slate-800 text-[#fff] mt-20 px-4 py-16">
        <div className="text-center mb-18 px-4">
        <h2 className="text-4xl md:text-5xl font-bold relative inline-block">
          <span className="text-white uppercase before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-[1px] before:bg-white after:absolute after:top-1/2 after:-right-10 after:w-8 after:h-[1px] after:bg-white">
            About Us
          </span>
        </h2>
        <p className="text-gray-500 italic mt-2">Learn What we Are All About</p>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Staggered Images */}
        <div className="relative flex flex-col sm:flex-row items-start gap-6">
          {/* Top Image (aligned higher) */}
          <div className="w-64 h-105 rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/images/bashart.jpg" // replace with your image
              alt="Team working"
              width={256}
              height={320}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Lower Image (staggered lower using mt) */}
          <div className="w-64 h-105 rounded-2xl overflow-hidden shadow-md mt-20 relative z-10">
            <Image
              src="/images/bash.jpg" // replace with your image
              alt="Developer working"
              width={256}
              height={320}
              className="w-full h-full object-cover"
            />
            {/* Decorative background dot/glow */}
            <div className="absolute -z-10 -bottom-8 -left-8 w-48 h-48 bg-gradient-to-r from-sky-100 via-sky-200 to-transparent rounded-full blur-2xl opacity-60"></div>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="flex-1">
          <h4 className="text-sm text-sky-600 font-semibold mb-2">
            Who we are
          </h4>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Bashions Ecolights
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl">
            a forward-thinking interior design company based in Rwanda, 
            drawing inspiration from Rwanda’s rich cultural craftsmanship, 
            our creations seamlessly merge traditional artistry with cutting-edge 
            technology to create unique, functional, and sustainable spaces that reflect the beauty of Africa.
          </p>
          <hr className="border-t border-gray-200 mb-8" />

          <div className="flex flex-col sm:flex-row gap-8 text-sm text-gray-400">
            <div className="flex-1">
              <h5 className="text-base text-white font-semibold mb-2">Our Mission</h5>
              <p>
                BASHIONS aims to create sustainable, accessible interior designs that enhance comfort 
                and reduce environmental impact, featuring innovative eco-friendly wooden lamps for all.
              </p>
            </div>
            <div className="flex-1">
              <h5 className="text-base text-white font-semibold mb-2">Our Vision</h5>
              <p>
                Our vision is to lead sustainable interior design in Rwanda, creating inclusive, 
                beautiful spaces that reflect ecological responsibility and enrich lives for a greener future
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUsSection
