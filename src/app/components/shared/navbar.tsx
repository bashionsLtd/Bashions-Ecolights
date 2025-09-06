// src/app/components/shared/navbar.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '@/redux/store/slices/cartSlice';
import type { RootState } from '@/redux/store/store';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  // Close mobile UI on route change
  useEffect(() => {
    setMenuOpen(false);
    setShowSearch(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-90 px-4 shadow-md z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Image src="/images/logo.png" alt="Logo" width={90} height={90} />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-6 items-center text-sm sm:text-base text-black">
          {navItems.map(({ label, path }) => (
            <li key={path}>
              <Link
                href={path}
                className={`transition hover:text-orange-400 text-lg hover:text-xl ${
                  pathname === path ? 'text-orange-400 font-semibold' : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {/* Search toggle (desktop) */}
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

          {/* Cart (desktop) */}
          <button
            type="button"
            onClick={() => dispatch(toggleCart())}
            className="group relative cursor-pointer hidden sm:block"
            aria-label="Open cart"
          >
            <FaShoppingCart className="text-gray-700 hover:text-black transition" />
            {cartCount > 0 && (
              <span className="absolute -top-4 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
            <span className="absolute left-1/2 -translate-x-1/2 mt-1 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition">
              Cart
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden text-black text-2xl ml-2"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            <span aria-hidden>≡</span>
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
                onClick={() => setMenuOpen(false)}
                className={`block transition hover:text-[#c79c61] ${
                  pathname === path ? 'text-[#c79c61] font-semibold' : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}

          <li className="flex justify-center gap-6 mt-4 text-lg">
            <button
              type="button"
              className="relative"
              onClick={() => {
                dispatch(toggleCart());
                setMenuOpen(false);
              }}
              aria-label="Open cart"
            >
              <FaShoppingCart title="Cart" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </li>

          <li>
            <div className="relative mt-4 w-3/4 mx-auto">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
}
