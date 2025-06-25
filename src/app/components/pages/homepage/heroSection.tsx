'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Slide {
  image: string;
  headline: string;
  subtext: string;
}

const slides: Slide[] = [
  {
    image: '/images/nlamp2.jpg',
    headline: 'Where nature meets design',
    subtext: 'Sustainable wooden craftsmanship that glows with elegance.',
  },
  {
    image: '/images/plates.jpg',
    headline: 'Where nature meets design',
    subtext: 'Sustainable wooden craftsmanship that glows with elegance.',
  },
  // Add more slides as needed
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // 10,000 ms = 10 seconds

    return () => clearInterval(timer); // Cleanup
  }, []);

  return (
    <div className="relative h-[calc(100vh-86px)] w-full overflow-hidden">
      {/* Background image */}
      <Image
        src={slides[currentSlide].image}
        alt={slides[currentSlide].headline}
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      {/* Content */}
      <div className="relative max-w-6xl z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
          {slides[currentSlide].headline}
        </h1>
        <p className="text-sm sm:text-lg mb-6 italic">
          {slides[currentSlide].subtext}
        </p>
        <button className="bg-white text-black font-semibold py-2 px-12 hover:bg-[#cbc9c5] transition">
          Order now
        </button>
      </div>

      {/* Clickable dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-4 h-4 rounded-full border transition ${
              currentSlide === index
                ? 'bg-white border-white scale-110'
                : 'bg-transparent border-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
