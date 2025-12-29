"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-canvas flex flex-col items-center justify-center px-6 text-center">
      
      {/* Élément visuel flottant (Effet Glossy) */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative mb-12"
      >
        <div className="absolute inset-0 bg-brand-azure/20 blur-[100px] rounded-full" />
        <div className="relative bg-white p-8 rounded-brand shadow-glossy border border-brand-azure/10">
          <span className="text-8xl md:text-9xl font-serif italic text-brand-night opacity-10 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="text-brand-azure w-12 h-12 animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Texte Principal */}
      <div className="space-y-4 max-w-md">
        <h1 className="text-4xl md:text-5xl font-serif italic text-brand-night">
          Oups, éclat introuvable <span className="text-brand-azure">.</span>
        </h1>
        <p className="text-brand-night/60 font-light text-lg">
          Cette page semble s'être évaporée. Pas d'inquiétude, nos meilleurs gloss vous attendent ailleurs.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-12 flex flex-col sm:flex-row gap-6">
        <Link 
          href="/" 
          className="flex items-center justify-center gap-3 bg-brand-night text-white px-10 py-5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-brand-azure transition-all shadow-xl group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </Link>
        
        <Link 
          href="/products" 
          className="flex items-center justify-center gap-3 bg-white text-brand-night border border-brand-night/10 px-10 py-5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:shadow-card transition-all"
        >
          <ShoppingBag size={16} />
          Voir la boutique
        </Link>
      </div>

      {/* Branding discret */}
      <div className="absolute bottom-12">
        <p className="text-[10px] tracking-[0.8em] uppercase text-brand-night/20 font-black">
          Lipsgloss by AP
        </p>
      </div>
    </div>
  );
}