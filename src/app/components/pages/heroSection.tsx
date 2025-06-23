'use client';

import Image from 'next/image';
import { useState } from 'react';

const HeroSection = () => {
  // Fake slides – can be extended to actual images
  const slides = [
    '/images/lamp.jpg',
    '/images/nlamp1.jpg',
    '/images/nlamp2.jpg', // Place this image in public/ folder and name accordingly
    // Add more if needed
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[calc(100vh-86px)] w-full overflow-hidden font-sans">
      {/* Background image */}
      <Image
        src={slides[currentSlide]}
        alt="Wooden lamps background"
        layout="fill"
        // objectFit="cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-20 z-10" />

      {/* Content */}
      <div className="relative z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
        <h1 className="text-3xl sm:text-5xl font-bold italic mb-4">
          Light up your life, <br className="sm:hidden" />
          the eco-friendly way
        </h1>
        <p className="text-lg sm:text-lg mb-6 italic">
          Bring nature indoors with our automated wooden lamps <br className="hidden sm:inline" />
          and one-of-a-kind wooden art.
        </p>
        <button className="bg-white text-black font-semibold py-2 px-6 rounded hover:bg-[#cbc9c5] transition">
          Order now
        </button>
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 text-white text-4xl"
        aria-label="Previous"
      >
        &#10094;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 text-white text-4xl"
        aria-label="Next"
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
