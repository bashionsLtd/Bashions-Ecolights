'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white bg-opacity-90 px-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Image src="/images/logo.png" alt="Logo" width={90} height={90} />

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-6 items-center text-sm sm:text-base text-black">
          <li className="text-[#c79c61] font-semibold">Home</li>
          <li>Products</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

        {/* Search with icon */}
        <div className="hidden sm:flex items-center relative">
          <FaSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Find the product"
            className="pl-10 border-b border-gray-400 outline-none bg-transparent text-sm px-2"
          />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-black text-2xl ml-4"
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <ul className="md:hidden mt-3 space-y-2 text-center bg-white bg-opacity-95 py-4 shadow-lg">
          <li className="text-[#c79c61] font-semibold">Home</li>
          <li>Products</li>
          <li>About</li>
          <li>Contact</li>
          <li>
            <div className="relative mt-2 w-3/4 mx-auto">
              <FaSearch className="absolute left-3 top-1/2 pb-5 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Find the product"
                className="pl-10 w-full border-b border-gray-400 outline-none bg-transparent text-sm px-2"
              />
            </div>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
