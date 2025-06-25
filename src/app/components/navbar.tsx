'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="w-full bg-white bg-opacity-90 px-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Image src="/images/logo.png" alt="Logo" width={90} height={90} />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-6 items-center text-sm sm:text-base text-black">
          {navItems.map(({ label, path }) => (
            <li key={path}>
              <Link
                href={path}
                className={`transition hover:text-[#1521a1] ${
                  pathname === path ? 'text-[#1521a1] font-semibold' : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {/* Search toggle */}
          <div className="hidden sm:flex items-center relative">
            <FaSearch
              onClick={() => setShowSearch((prev) => !prev)}
              className="cursor-pointer text-gray-600 hover:text-black transition"
            />
            {showSearch && (
              <input
                type="text"
                placeholder="Find the product"
                className="ml-2 border-b border-gray-400 outline-none bg-transparent text-sm px-2"
              />
            )}
          </div>

          {/* Cart Icon */}
          <div className="group relative cursor-pointer hidden sm:block">
            <FaShoppingCart className="text-gray-700 hover:text-black transition" />
            <span className="absolute left-1/2 -translate-x-1/2 mt-1 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition">
              Cart
            </span>
          </div>

          {/* Login Icon */}
          <div className="group relative cursor-pointer hidden sm:block">
            <FaUser className="text-gray-700 hover:text-black transition" />
            <span className="absolute left-1/2 -translate-x-1/2 mt-1 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition">
              Login
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden text-black text-2xl ml-2"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <ul className="md:hidden mt-3 space-y-3 text-center bg-white bg-opacity-95 py-4 shadow-lg">
          {navItems.map(({ label, path }) => (
            <li key={path}>
              <Link
                href={path}
                className={`block transition hover:text-[#c79c61] ${
                  pathname === path ? 'text-[#c79c61] font-semibold' : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="flex justify-center gap-6 mt-4 text-lg">
            <FaUser title="Login" />
            <FaShoppingCart title="Cart" />
          </li>
          <li>
            <div className="relative mt-4 w-3/4 mx-auto">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
