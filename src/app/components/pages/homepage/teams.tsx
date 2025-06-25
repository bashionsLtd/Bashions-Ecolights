'use client';

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
}

const allMembers: TeamMember[] = [
  {
    name: 'BYIRINGIRO Patrick',
    title: 'CEO',
    description:
      'Venenatis urna cursus eget nunc scelerisque viverra mauris in. Parturient montes.',
    image: '/images/patr.jpeg',
  },
  {
    name: 'IRANZI David',
    title: 'CTO',
    description:
      'Nascetur ridiculus mus mauris vitae ultricies. Nibh cras pulvinar mattis nunc sed.',
    image: '/images/nor.jpg',
  },
  {
    name: 'MURENZI Norbert',
    title: 'Technical Manager',
    description:
      'Quisque ridiculus mus sed blandit libero non tellus orci ac auctor augue mauris.',
    image: '/images/man.jpeg',
  },
  {
    name: 'MUYANGO Noella',
    title: 'Chief Marketing Manager',
    description:
      'Senectus et netus et malesuada fames. Non tellus orci ac auctor augue mauris.',
    image: '/images/muy.png',
  },
];

// Helper to chunk based on screen size
const chunkMembers = (members: TeamMember[], perSlide: number) => {
  const chunks: TeamMember[][] = [];
  for (let i = 0; i < members.length; i += perSlide) {
    chunks.push(members.slice(i, i + perSlide));
  }
  return chunks;
};

const TeamSection: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState<TeamMember[][]>([]);

  const updateSlides = () => {
    const perSlide = window.innerWidth < 768 ? 1 : 2;
    const newSlides = chunkMembers(allMembers, perSlide);
    setSlides(newSlides);
    setCurrentIndex(0);
  };

  useEffect(() => {
    updateSlides();
    window.addEventListener('resize', updateSlides);
    return () => window.removeEventListener('resize', updateSlides);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <section className="bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] text-white py-20 px-4">
      <div className="text-center mb-20">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide relative inline-block">
          <span className="text-white before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-[1px] before:bg-white after:absolute after:top-1/2 after:-right-10 after:w-8 after:h-[1px] after:bg-white">
            MEET OUR TEAM
          </span>
        </h2>
        <p className="text-gray-400 italic mt-2">Who Are Behind Everything</p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Cards */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-10 transition-all duration-700 ease-in-out">
          {slides[currentIndex].map((member, idx) => (
            <div
              key={idx}
              className="text-center rounded-xl overflow-hidden max-w-md mx-auto"
            >
              <div className="rounded-xl overflow-hidden w-full h-86 relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  priority
                />
              </div>
              <h3 className="text-white text-xl font-semibold mt-6">{member.name}</h3>
              <p className="text-[#ff9d76] text-md mt-1">{member.title}</p>
              <p className="text-sm text-gray-300 mt-4 px-4">{member.description}</p>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
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

export default TeamSection;
