'use client'

import React from 'react';
import { 
  MoveDown, 
  Sparkles,
  ArrowRight,
  Loader2,
  Instagram
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { 
  databases, storage, 
  DATABASE_ID, COLLECTION_PRODUCTS_ID, BUCKET_IMAGES_ID 
} from '@/lib/appwrite';
import { Query } from 'appwrite';
import { dataService, resolveImageUrl, LOCAL_PRODUCTS } from '@/lib/data-service';

// Fonction pour récupérer les produits Signature (limité à 3)
const fetchSignatureProducts = async () => {
  return await dataService.getProducts([Query.limit(3), Query.orderDesc('$createdAt')]);
};

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  
  // 1. Hook TanStack Query
  const { data: signatureProducts, isLoading, isError } = useQuery({
    queryKey: ['signatureProducts'],
    queryFn: fetchSignatureProducts,
    initialData: LOCAL_PRODUCTS.slice(0, 3), // Fallback immédiat
    staleTime: 0, // Toujours essayer de récupérer les données fraîches
    retry: 3, // Réessayer 3 fois en cas d'échec
  });

  // Helper pour les images Appwrite
  const getImageUrl = (imageId: string) => {
    return resolveImageUrl(imageId);
  };

  // Gestion d'erreur silencieuse (ou affichage discret)
  if (isError) {
    console.error("Erreur lors du chargement des produits signature.");
  }

  // Animations Parallaxe existantes
  const yHero = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const xText = useTransform(scrollYProgress, [0, 1], [0, -500]);

  return (
    <div className="relative bg-[#FAF7F7] text-stone-800 selection:bg-rose-100 selection:text-rose-900 overflow-x-hidden font-sans">
      
      {/* --- LAYER 0: FOND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-rose-200/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#F9F3F2] z-10">
        <motion.div style={{ y: yHero, scale: scaleImage }} className="absolute inset-0 z-0">
          <img 
            src='/home.jpeg'
            alt="Amira Shop Hero" 
            className="w-full h-full object-cover opacity-40 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAF7F7]" />
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

            <Link href="/products" className="group relative inline-flex items-center gap-6 overflow-hidden px-16 py-6 border border-rose-200 rounded-full transition-all hover:border-stone-900 duration-500">
              <span className="relative z-10 text-[10px] tracking-[0.4em] uppercase text-stone-600 group-hover:text-white transition-colors duration-500">
                Découvrir la boutique
              </span>
              <div className="absolute inset-0 bg-stone-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-rose-300">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <MoveDown size={18} strokeWidth={1} />
          </motion.div>
        </div>
      </section>

      {/* --- SECTION MANIFESTE --- */}
      <section className="relative py-60 px-8 lg:px-32 bg-white z-10">
        <motion.div 
          style={{ x: xText }}
          className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap text-[20vh] font-serif font-black text-stone-900/[0.02] pointer-events-none select-none uppercase italic"
        >
          Confidence Pureté Éclat Confidence Pureté Éclat
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="flex items-center gap-4">
              <Sparkles size={16} className="text-rose-300" />
              <span className="text-[10px] tracking-[0.6em] uppercase text-rose-300 block font-bold">Philosophie</span>
            </div>
            <h3 className="text-6xl md:text-8xl font-serif leading-[0.9] text-stone-900 tracking-tighter">
              La pureté <br /> comme unique <br /> <span className="italic text-rose-200">confidence.</span>
            </h3>
            <p className="text-stone-400 font-light leading-relaxed max-w-md text-xl italic border-l-4 border-rose-100 pl-8">
              "Nous croyons en une beauté sans artifice, où chaque ingrédient raconte une histoire de terre et de science."
            </p>
          </motion.div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-rose-50 rounded-sm scale-95 group-hover:scale-100 transition-transform duration-700" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-stone-100 shadow-2xl">
                <motion.img 
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 2 }}
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80" 
                  className="w-full h-full object-cover mix-blend-multiply opacity-80"
                />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION SIGNATURE (DYNAMIQUE APPWRITE) --- */}
      <section className="relative py-48 bg-[#FAF7F7] z-10 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-8">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.8em] uppercase text-rose-300 block font-black">La Sélection</span>
              <h2 className="text-5xl md:text-7xl font-serif italic text-stone-900 tracking-tighter">Pièces Iconiques</h2>
            </div>
            <Link href="/products" className="group flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase font-bold text-stone-400 hover:text-stone-900 transition-colors">
              Explorer tout le catalogue
              <div className="w-12 h-px bg-rose-200 group-hover:w-20 group-hover:bg-stone-900 transition-all duration-700" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center py-20 gap-4">
              <Loader2 className="animate-spin text-rose-200" size={30} strokeWidth={1} />
              <span className="text-[9px] tracking-[0.5em] text-stone-400 uppercase">Chargement de l'éclat...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              {signatureProducts?.map((product, idx) => (
                <motion.div 
                  key={product.$id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: idx * 0.2 }}
                  className={`group ${idx === 1 ? 'md:-translate-y-16' : ''}`}
                >
                  <Link href={`/products/${product.$id}`}>
                    <div className="relative aspect-[4/5] overflow-hidden bg-white mb-10 shadow-sm border border-stone-100 group-hover:shadow-2xl transition-all duration-1000">
                      {product.images?.[0] ? (
                        <img 
                          src={getImageUrl(product.images[0])} 
                          alt={product.name}
                          className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-110 transition-transform duration-[2s]"
                        />
                      ) : (
                        <div className="w-full h-full bg-stone-50 animate-pulse" />
                      )}
                      
                      <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/90 backdrop-blur-sm text-stone-900 text-[9px] tracking-[0.4em] uppercase px-8 py-4 border border-stone-100 shadow-xl">
                          Aperçu
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3 px-2 text-center md:text-left">
                      <span className="text-[9px] tracking-[0.3em] uppercase text-rose-300 font-black">
                        {product.category || 'Collection'}
                      </span>
                      <h4 className="text-3xl font-serif italic text-stone-800 leading-none group-hover:text-stone-900 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-base font-light text-stone-400 italic">
                        {Number(product.price).toLocaleString()} F CFA
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}