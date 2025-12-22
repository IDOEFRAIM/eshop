'use client'

import React, { useRef } from 'react';
import { 
  Plus, 
  Minus, 
  ArrowRight, 
  MoveDown, 
  Globe, 
  Instagram, 
  Wind,
  Sparkles
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import CATEGORIZED_PRODUCTS from '@/data/products'; // Importation de tes données

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  
  // Parallaxe et animations fluides
  const yHero = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  // Extraction de 3 produits "Signature" pour l'accueil
  const signatureProducts = useMemo(() => {
    const all = Object.entries(CATEGORIZED_PRODUCTS).flatMap(([cat, items]) => 
      items.map(p => ({ ...p, category: cat }))
    );
    return all.slice(0, 3); // On prend les 3 premiers pour l'esthétique
  }, []);

  return (
    <div className="bg-[#FAF7F7] text-stone-800 selection:bg-rose-100 selection:text-rose-900 overflow-x-hidden font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#F9F3F2]">
        <motion.div style={{ y: yHero, scale: scaleImage }} className="absolute inset-0 z-0">
          <img 
          src='/home.jpeg'
alt="Nature Confidence" 
            className="w-full h-full object-contain opacity-40 mix-blend-multiply"
          />
        </motion.div>

        <motion.div style={{ opacity: opacityHero }} className="relative z-20 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] tracking-[1.2em] uppercase text-rose-400 block mb-10 font-medium ml-[1.2em]">
              L'Art du Soin Pur
            </span>
            <h1 className="text-[13vw] md:text-[9vw] font-serif leading-[0.8] tracking-tighter text-stone-900 mb-12">
              Éclat <br />
              <span className="italic font-extralight text-rose-300">Cristallin</span>
            </h1>
          </motion.div>
          
          <Link href="/products" className="group relative inline-block overflow-hidden px-16 py-6 border border-rose-200 rounded-full transition-all hover:border-rose-400">
            <span className="relative z-10 text-[10px] tracking-[0.4em] uppercase text-stone-600 group-hover:text-white transition-colors duration-500">
              Découvrir la boutique
            </span>
            <div className="absolute inset-0 bg-stone-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]" />
          </Link>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-rose-300">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <MoveDown size={18} strokeWidth={1} />
          </motion.div>
        </div>
      </section>

      {/* --- SECTION MANIFESTE --- */}
      <section className="py-48 px-8 lg:px-32 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <span className="text-[10px] tracking-[0.6em] uppercase text-rose-200 block font-bold">Philosophie</span>
            <h3 className="text-5xl md:text-7xl font-serif leading-[1.1] text-stone-900">
              La pureté <br /> comme unique <br /> <span className="italic text-rose-200">confidence.</span>
            </h3>
            <p className="text-stone-500 font-light leading-relaxed max-w-md text-lg italic">
              "Nous croyons en une beauté sans artifice, où chaque ingrédient raconte une histoire de terre et de science."
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-rose-50 shadow-2xl">
            <motion.img 
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 2 }}
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80" 
              className="w-full h-full object-cover mix-blend-multiply opacity-80"
            />
          </div>
        </div>
      </section>

      {/* --- SECTION SIGNATURE (DYNAMIQUE) --- */}
      <section className="py-48 bg-[#FAF7F7]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-8">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.8em] uppercase text-rose-300 block">La Sélection</span>
              <h2 className="text-5xl md:text-6xl font-serif italic text-stone-900">Pièces Iconiques</h2>
            </div>
            <Link href="/products" className="group flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase font-bold text-stone-400 hover:text-stone-900 transition-colors">
              Explorer tout le catalogue
              <div className="w-12 h-px bg-rose-200 group-hover:w-20 group-hover:bg-stone-900 transition-all duration-700" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {signatureProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: idx * 0.2 }}
                className={`group ${idx === 1 ? 'md:-translate-y-16' : ''}`}
              >
                <Link href={`/products/${product.category}/${product.id}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-white mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-1000">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-[2s]"
                    />
                    <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur-sm text-stone-900 text-[9px] tracking-[0.4em] uppercase px-8 py-4 border border-stone-100">
                        Découvrir
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3 px-2 text-center md:text-left">
                    <span className="text-[9px] tracking-[0.3em] uppercase text-rose-300 font-bold">{product.category}</span>
                    <h4 className="text-2xl font-serif italic text-stone-800">{product.name}</h4>
                    <p className="text-sm font-light text-stone-400 italic">{product.price} F CFA</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-40 bg-white">
        <div className="max-w-3xl mx-auto px-8">
           <h2 className="text-4xl font-serif mb-20 text-center italic text-stone-900">Questions Confidentielles</h2>
           <div className="space-y-4">
             {[
               { q: "Quels sont vos engagements ?", a: "Nous travaillons avec serieux et respect de la clientele." },
               { q: "Livrez-vous partout ?", a: "Nous expédions nos produits principalement a Ouagadougou" },
               { q: "Comment choisir mon soin ?", a: "Chaque fiche produit détaille le type de peau idéal. Vous pouvez aussi nous contacter sur WhatsApp." }
             ].map((faq, i) => (
               <details key={i} className="group border-b border-rose-50">
                 <summary className="flex justify-between items-center py-10 cursor-pointer list-none outline-none">
                   <span className="text-lg font-serif italic text-stone-700 group-hover:text-rose-400 transition-colors">{faq.q}</span>
                   <Plus size={16} className="group-open:hidden text-rose-200" />
                   <Minus size={16} className="hidden group-open:block text-rose-200" />
                 </summary>
                 <div className="pb-10 text-stone-400 font-light leading-relaxed italic animate-fade-in text-base">
                   {faq.a}
                 </div>
               </details>
             ))}
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-24 bg-[#F9F3F2] border-t border-white px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-16">
          <div className="space-y-6">
            <h4 className="text-5xl font-serif italic text-stone-900 lowercase tracking-tighter">confidence</h4>
            <p className="text-[10px] tracking-[0.5em] uppercase text-rose-300">Beauté consciente & Rituels Purs</p>
          </div>
          
          <div className="flex gap-12 text-stone-400 uppercase text-[10px] tracking-widest font-bold">
            <Link href="/products" className="hover:text-rose-400 transition-colors">Boutique</Link>
            <span className="cursor-pointer hover:text-rose-400 transition-colors">Instagram</span>
            <span className="cursor-pointer hover:text-rose-400 transition-colors">Contact</span>
          </div>

          <div className="pt-16 border-t border-rose-100 w-full flex flex-col md:flex-row justify-between items-center gap-8">
            <span className="text-[8px] tracking-[0.6em] uppercase text-stone-400">© 2025 Confidence — Tous droits réservés</span>
            <div className="flex gap-6 opacity-30">
               <Globe size={14} />
               <Instagram size={14} />
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@300;400;600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        summary::-webkit-details-marker { display: none; }
      `}</style>
    </div>
  );
}

// Fonction utilitaire pour mémoïser le filtrage
import { useMemo } from 'react';