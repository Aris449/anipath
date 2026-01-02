"use client";
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react';

const link_items = [
  {
    id: 1,
    href: '/',
    icon: '/icons/home_dark.png',
    label: 'Home'
  },
  {
    id: 2,
    href: '/anime',
    icon: '/icons/home_dark.png',

    label: 'Anime'
  },
  // Add more link items as needed
];

const Navbar = () => {
  const [active, setActive] = useState();
  const [isDesktop, setIsDesktop] = useState(false);

  // Track screen size to handle desktop/mobile logic
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1400);
    handleResize(); // check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu automatically on desktop
  useEffect(() => {
    if (isDesktop) setActive(false);
  }, [isDesktop]);

  return (
    <>
 
      {/* Navbar */}
     <div
  className={`
    w-56 h-full bg-bg-dark flex-col gap-2 px-2
    fixed top-0 left-0 z-50
    transition-transform duration-300 ease-in-out

    ${isDesktop
      ? 'translate-x-0'                     // always shown on desktop
      : active
        ? 'translate-x-0'                  // mobile open
        : '-translate-x-full'              // mobile closed
    }
  `}
>
         <button onClick={() => setActive(false)} className="shrink-0 w-56 h-16 px-4">
            <Image src="/icons/list_dark.png" alt="close-icon" width={26} height={26} />
          </button>
        {/* Mobile close button */}
        {!isDesktop && (
          <button onClick={() => setActive(false)} className="shrink-0 w-56 h-16 px-4">
            <Image src="/icons/list_dark.png" alt="close-icon" width={26} height={26} />
          </button>
        )}
        
          

        {link_items.map(item => (
          <Link
            key={item.id}
            href={item.href}
            className="flex gap-4 text-base py-2 px-4 mt-2 hover:bg-(--bg-light) rounded-2xl"
          >
            <Image src={item.icon} alt={`${item.label}-icon`} width={24} height={24} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navbar;