'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Review {
  id: number;
  name: string;
  message: string;
  avatar: string;
}

const allReviews: Review[] = [
  {
    id: 1,
    name: 'Maria Culhane',
    message:
      "I'm in love with Luchiana's products! The quality is amazing and the prices are unbeatable. I've tried everything from their skincare line to their lipsticks.",
    avatar: '/images/patr.jpeg',
  },
  {
    id: 2,
    name: 'Emery Herwitz',
    message:
      "It's so important to me to use products that align with my values, and I'm so happy to have found a brand that does just that.",
    avatar: '/images/man.jpeg',
  },
  {
    id: 3,
    name: 'Ava Thompson',
    message:
      "Luchiana has completely transformed my skincare routine. I love how gentle and effective their products are.",
    avatar: '/images/nor.jpg',
  },
  {
    id: 4,
    name: 'Olivia Reed',
    message:
      "The natural ingredients make such a difference. My skin has never felt better. Thank you Luchiana!",
    avatar: '/images/art.jpeg',
  },
];

// Splits reviews into chunks depending on screen size
const chunkReviews = (reviews: Review[], perSlide: number): Review[][] => {
  const chunks: Review[][] = [];
  for (let i = 0; i < reviews.length; i += perSlide) {
    chunks.push(reviews.slice(i, i + perSlide));
  }
  return chunks;
};

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState<Review[][]>([]);

  // Determines how many reviews to show per slide based on screen width
  const updateSlides = () => {
    const perSlide = window.innerWidth < 768 ? 1 : 2;
    const newSlides = chunkReviews(allReviews, perSlide);
    setSlides(newSlides);
    setCurrentIndex(0); // Reset on resize for consistency
  };

  useEffect(() => {
    updateSlides();
    window.addEventListener('resize', updateSlides);
    return () => window.removeEventListener('resize', updateSlides);
  }, []);

  // Auto-slide every 30s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <section className="bg-gradient-to-bl from-slate-700 via-slate-950 to-slate-800 text-center py-20 px-4">
     <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold relative inline-block">
          <span className="text-white before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-[1px] before:bg-white after:absolute after:top-1/2 after:-right-10 after:w-8 after:h-[1px] after:bg-white">
            REVIEWS
          </span>
        </h2>
        <p className="text-gray-400 italic mt-2">From Our Customers</p>
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* Review Cards */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 transition-all duration-700 ease-in-out">
          {slides[currentIndex].map((review) => (
            <div key={review.id} className="max-w-md mx-auto">
              <p className="text-gray-200 text-sm sm:text-lg leading-relaxed mb-6 italic">
                {review.message}
              </p>
              <div className="flex items-center justify-center gap-3">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover w-12 h-12"
                />
                <span className="text-orange-400 font-medium">{review.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        

        {/* Dots */}
        <div className="mt-10 flex justify-center gap-3">
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentIndex ? 'bg-white' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
