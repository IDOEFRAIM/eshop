'use client'
import React, { useState, useEffect } from 'react';
import { 
  Menu,
  ShoppingBag,
  Instagram,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItem = [
    {
        'name':'accueil',
        'link':''
    },
        {
        'name':'produits',
        'link':'products'
    },
        {
        'name':'A propos de moi',
        'link':'about'
    },
  ]
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center transition-all duration-700 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-md py-4 border-b border-rose-50' 
        : 'bg-transparent'
    }`}>
      {/* Côté Gauche : Menu */}
      <div className="flex items-center gap-8">
        <Menu 
          size={20} 
          className="cursor-pointer hover:scale-110 transition-transform text-stone-800 hover:text-rose-400" 
          onClick={() => setIsOpen(true)}
        />
        <span className="hidden md:block text-[9px] tracking-[0.5em] uppercase font-medium text-stone-400">
          Menu
        </span>
      </div>
      
      {/* Centre : Logo */}
      <Link href="/" className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-2xl font-serif italic lowercase tracking-tighter text-stone-900">
          Amira shop
        </h1>
      </Link>
      
      {/* Côté Droit : Panier */}
      <div className="flex items-center gap-8">
        <span className="hidden md:block text-[9px] tracking-[0.5em] uppercase font-medium text-stone-400">
          Panier
        </span>
        <div className="relative group cursor-pointer">
          <ShoppingBag size={18} className="text-stone-800 group-hover:text-rose-400 transition-colors" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-300 rounded-full" />
        </div>
      </div>

      {/* Overlay Menu Fullscreen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 bg-[#F9F3F2] z-[110] p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] tracking-widest uppercase text-rose-300">Navigation</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white rounded-full transition-colors"
              >
                <X className="text-stone-900" size={24} />
              </button>
            </div>

            <ul className="space-y-6 text-6xl md:text-8xl font-serif italic text-stone-900">
              {
              navItem.map((item, idx) => (
                <motion.li 
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="hover:translate-x-6 transition-transform cursor-pointer hover:text-rose-400"
                >
                  <Link href={`/${item.link}`} onClick={() => setIsOpen(false)}>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="flex justify-between items-end border-t border-rose-100 pt-8 text-[10px] tracking-widest uppercase text-stone-400">
              <div className="hidden md:block">Paris — Grasse</div>
              <div className="flex gap-8">
                <a href="#" className="flex items-center gap-2 hover:text-rose-400 transition-colors">
                  <Instagram size={14} />
                  <span>Ammira shop</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;