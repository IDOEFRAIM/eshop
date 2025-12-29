'use client'

import React, { useState, useEffect } from 'react';
import { 
  LucideArrowLeft, 
  LucideShieldCheck, 
  LucideTruck, 
  LucideLeaf,
  LucideMessageCircle,
  LucideChevronRight,
  LucideChevronLeft,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { storage, BUCKET_IMAGES_ID } from '@/lib/appwrite';

interface ProductClientProps {
  product: any;
}

export default function ProductClient({ product }: ProductClientProps) {
  const [activeImg, setActiveImg] = useState(0);

  // Remonter en haut de page au montage
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getImageUrl = (imageId: string) => {
    if (!imageId) return '/placeholder.jpg';
    return storage.getFileView(BUCKET_IMAGES_ID, imageId).toString();
  };

  const handleWhatsAppOrder = () => {
    const phoneNumber = "+22601118080"; 
    const message = encodeURIComponent(
      `Bonjour Amira Shop, je souhaite commander le produit "${product.name}" (${product.price} F CFA).`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const images = product.images || [];

  return (
    <div className="bg-[#FAF7F7] min-h-screen pb-24 relative selection:bg-rose-50">
      {/* Texture de grain luxe */}
      <div className="fixed inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 relative z-10">
        
        {/* RETOUR */}
        <div className="mb-12">
          <Link href="/products" className="inline-flex items-center gap-3 group">
            <div className="p-2 rounded-full border border-stone-200 group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
              <LucideArrowLeft size={14} />
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase font-black text-stone-400 group-hover:text-stone-900 transition-colors">
              Retour à la collection
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* GALERIE PHOTO */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/5] bg-white border border-stone-100 overflow-hidden rounded-sm shadow-sm">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  src={getImageUrl(images[activeImg])}
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </AnimatePresence>
              
              {images.length > 1 && (
                <div className="absolute inset-y-0 inset-x-4 flex items-center justify-between pointer-events-none">
                  <button 
                    onClick={() => setActiveImg(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="p-3 bg-white/90 backdrop-blur-md rounded-full pointer-events-auto hover:bg-stone-900 hover:text-white transition-all shadow-xl"
                  >
                    <LucideChevronLeft size={20} strokeWidth={1} />
                  </button>
                  <button 
                    onClick={() => setActiveImg(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="p-3 bg-white/90 backdrop-blur-md rounded-full pointer-events-auto hover:bg-stone-900 hover:text-white transition-all shadow-xl"
                  >
                    <LucideChevronRight size={20} strokeWidth={1} />
                  </button>
                </div>
              )}
            </div>

            {/* MINIATURES */}
            {images.length > 1 && (
              <div className="flex justify-center gap-4">
                {images.map((img: string, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`relative w-20 aspect-[4/5] overflow-hidden rounded-sm transition-all duration-500 ${
                      activeImg === idx ? 'ring-2 ring-stone-900 ring-offset-4' : 'opacity-40 hover:opacity-100'
                    }`}
                  >
                    <img src={getImageUrl(img)} className="w-full h-full object-cover mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFOS PRODUIT */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] tracking-[0.5em] uppercase text-rose-300 font-black">
                    {product.category || "Rituel Signature"}
                  </span>
                  <Sparkles size={14} className="text-stone-200" />
                </div>
                
                <h1 className="text-5xl md:text-7xl font-serif italic text-stone-900 leading-[0.9] tracking-tighter">
                  {product.name}
                </h1>
                
                <div className="text-3xl font-serif italic text-stone-400">
                  {Number(product.price).toLocaleString()} F CFA
                </div>
              </div>

              <div className="space-y-8">
                <p className="text-stone-500 font-light leading-relaxed text-xl italic border-l-2 border-rose-100 pl-8">
                  {product.description}
                </p>

                <button 
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-stone-900 text-white py-8 text-[11px] tracking-[0.6em] uppercase hover:bg-rose-400 transition-all shadow-2xl flex items-center justify-center gap-4 group rounded-sm"
                >
                  Commander via WhatsApp
                  <LucideMessageCircle size={18} className="group-hover:rotate-12 transition-transform" />
                </button>
              </div>

              {product.ingredients?.length > 0 && (
                <div className="pt-12 border-t border-stone-200">
                  <span className="text-[9px] tracking-[0.4em] uppercase font-black text-stone-900 block mb-6">Composition active</span>
                  <div className="flex flex-wrap gap-3">
                    {product.ingredients.map((ing: string, i: number) => (
                      <span key={i} className="text-[10px] text-stone-500 font-medium px-4 py-2 bg-white border border-stone-100 rounded-full shadow-sm italic">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION EXPÉRIENCE */}
        {product.longDescription && (
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-40 py-40 border-t border-stone-200 text-center max-w-3xl mx-auto"
          >
            <LucideLeaf size={40} strokeWidth={1} className="mx-auto mb-10 text-rose-200 opacity-50" />
            <h2 className="text-4xl md:text-6xl font-serif italic text-stone-900 mb-12 tracking-tighter">L'expérience Amira</h2>
            <p className="text-stone-500 font-light leading-[2] italic text-lg md:text-xl">
              {product.longDescription}
            </p>
          </motion.section>
        )}
      </div>
    </div>
  );
}