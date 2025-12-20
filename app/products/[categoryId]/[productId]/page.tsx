'use client'
import React, { useState, use, useEffect, useMemo } from 'react';
import { 
  LucideArrowLeft, 
  LucideHeart, 
  LucideShieldCheck, 
  LucideTruck, 
  LucideLeaf,
  LucideMessageCircle,
  LucideChevronRight,
  LucideChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CATEGORIZED_PRODUCTS from '@/data/products';
import Link from 'next/link';

export default function ProductPage({ 
  params 
}: { 
  params: Promise<{ categoryId: string; productId: string }> 
}) {
  const { categoryId, productId } = use(params);
  const decodedCategory = decodeURIComponent(categoryId);
  
  const [activeImg, setActiveImg] = useState(0);

  const product = useMemo(() => {
    const categoryArray = CATEGORIZED_PRODUCTS[decodedCategory as keyof typeof CATEGORIZED_PRODUCTS] || [];
    return categoryArray.find(p => p.id === productId);
  }, [decodedCategory, productId]);

  const handleWhatsAppOrder = () => {
    const phoneNumber = "212600000000"; 
    const message = encodeURIComponent(`Bonjour, je souhaite commander le produit "${product?.name}" (${product?.price} F CFA) de la collection ${decodedCategory}.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (!product) return null;

  return (
    // Suppression du pt-32 ici car le Layout s'en occupe déjà
    <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 page-fade-in">
      
      {/* Fil d'ariane / Retour discret */}
      <div className="mb-12">
        <Link href={`/products`} className="inline-flex items-center gap-2 group">
          <LucideArrowLeft size={16} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform text-stone-400" />
          <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-stone-400">Retour {decodedCategory}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* GALERIE */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/5] bg-white border border-rose-50 overflow-hidden rounded-sm group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={product.images[activeImg]}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </AnimatePresence>
            
            {product.images.length > 1 && (
              <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
                <button 
                  onClick={() => setActiveImg(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="p-2 bg-white/80 backdrop-blur-sm rounded-full pointer-events-auto hover:bg-rose-50 transition-colors shadow-sm"
                >
                  <LucideChevronLeft size={18} strokeWidth={1} />
                </button>
                <button 
                  onClick={() => setActiveImg(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="p-2 bg-white/80 backdrop-blur-sm rounded-full pointer-events-auto hover:bg-rose-50 transition-colors shadow-sm"
                >
                  <LucideChevronRight size={18} strokeWidth={1} />
                </button>
              </div>
            )}
          </div>

          {/* Miniatures horizontales centrées */}
          {product.images.length > 1 && (
            <div className="flex justify-center gap-3 mt-6">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`w-16 aspect-[4/5] rounded-sm border-b-2 transition-all ${activeImg === idx ? 'border-rose-300 opacity-100' : 'border-transparent opacity-30 hover:opacity-60'}`}
                >
                  <img src={img} className="w-full h-full object-cover mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFOS */}
        <div className="lg:col-span-5 flex flex-col pt-4">
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-rose-300 font-bold">
                {product.subCategory}
                <LucideLeaf size={12} className="text-stone-300" />
              </div>
              <h1 className="text-5xl md:text-6xl font-serif italic text-stone-900 leading-tight">
                {product.name}
              </h1>
              <div className="text-2xl font-light text-stone-400 italic tracking-tighter">
                {product.price} F CFA
              </div>
            </div>

            <p className="text-stone-500 font-light leading-relaxed text-base italic border-l border-rose-100 pl-6">
              {product.description}
            </p>

            <button 
              onClick={handleWhatsAppOrder}
              className="w-full bg-stone-900 text-white py-6 text-[10px] tracking-[0.5em] uppercase hover:bg-rose-400 transition-all shadow-xl flex items-center justify-center gap-4 group rounded-sm"
            >
              Commander via WhatsApp
              <LucideMessageCircle size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Ingrédients épurés */}
            <div className="pt-8">
              <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-stone-300 block mb-4 italic">Composition</span>
              <div className="flex flex-wrap gap-4">
                {product.ingredients.map((ing, i) => (
                  <span key={i} className="text-[11px] text-stone-500 font-light px-3 py-1 bg-white border border-stone-50 rounded-full shadow-sm italic">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION LONGUE DESCRIPTION */}
      <section className="mt-32 pt-32 border-t border-rose-50 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-serif italic text-stone-900 mb-8">L'expérience Confidence</h2>
        <p className="text-stone-500 font-light leading-loose italic">
          {product.longDescription}
        </p>
        <div className="flex justify-center gap-12 mt-12 opacity-40 grayscale">
          <LucideTruck size={24} strokeWidth={1} />
          <LucideShieldCheck size={24} strokeWidth={1} />
          <LucideLeaf size={24} strokeWidth={1} />
        </div>
      </section>
    </div>
  );
}