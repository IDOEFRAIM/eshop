'use client'
import React from 'react';
import { 
  ShoppingBag, 
  Layers, 
  LogOut, 
  ExternalLink 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AdminNavbarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const AdminNavbar = ({ activeTab, setActiveTab }: AdminNavbarProps) => {
  const router = useRouter();

  const menuItems = [
    { id: 'adminProducts', label: 'Mes Produits', icon: <ShoppingBag size={18} /> },
    { id: 'categories', label: 'Catégories', icon: <Layers size={18} /> },
  ];

 

  return (
    <div className="flex flex-col h-screen w-72 bg-brand-bg border-r border-brand-primary/10 p-8 fixed left-0 top-0 z-[50]">
      
      {/* 1. LOGO */}
      <div className="mb-14 px-2">
        <h1 className="text-xl font-serif italic tracking-tighter text-brand-text">
          Amira <span className="text-brand-primary">Studio</span>
        </h1>
        <div className="flex items-center gap-2 mt-2">
            <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--brand-primary-rgb),0.5)]" />
            <p className="text-[9px] text-brand-muted tracking-[0.4em] uppercase font-black">
              Fait par TANKA IDO
            </p>
        </div>
      </div>

      {/* 2. NAVIGATION */}
      <nav className="flex-1 space-y-3 relative">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              aria-selected={isActive}
              className={`relative w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-500 group outline-none ${
                isActive 
                  ? 'text-brand-primary' 
                  : 'text-brand-text/60 hover:text-brand-text'
              }`}
            >
              {/* Fond d'onglet actif */}
              {isActive && (
                <motion.div 
                  layoutId="activeTabBackground"
                  className="absolute inset-0 bg-brand-surface border border-brand-primary/10 shadow-sm rounded-xl z-0"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              
              {/* Indicateur vertical */}
              {isActive && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute left-0 w-1 h-5 bg-brand-primary rounded-r-full z-10"
                />
              )}
              
              <span className={`relative z-10 transition-all duration-500 ${
                isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:text-brand-primary'
              }`}>
                {item.icon}
              </span>
              
              <span className="relative z-10 text-[10px] uppercase tracking-[0.25em] font-black">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* 3. FOOTER */}
      <div className="pt-8 border-t border-brand-primary/5 space-y-3">
        <Link 
          href="/" 
          className="group flex items-center gap-4 px-5 py-3 text-[10px] uppercase tracking-widest text-brand-muted hover:text-brand-primary transition-all font-black"
        >
          <div className="p-2 bg-brand-surface rounded-lg group-hover:bg-brand-primary group-hover:text-white transition-colors">
            <ExternalLink size={14} />
          </div>
          Page d'accueil du site
        </Link>

    
      </div>

      {/* Texture de grain */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none -z-10" />
    </div>
  );
};

export default AdminNavbar;