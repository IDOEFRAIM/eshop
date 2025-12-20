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
  LucideChevronLeft,
  LucideSparkles
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
    const message = encodeURIComponent(`Bonjour, je souhaite commander le produit "${product?.name}" de la collection ${decodedCategory}.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 page-fade-in">
      
      {/* FIL D'ARIANE / NAVIGATION HAUTE */}
      <div className="mb-16 flex items-center justify-between border-b border-rose-50 pb-6">
        <Link href={`/products`} className="flex items-center gap-4 group">
          <div className="p-2 rounded-full border border-stone-100 group-hover:border-rose-200 transition-colors">
            <LucideArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-stone-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] tracking-[0.3em] uppercase text-stone-300 font-bold">Retour Boutique</span>
            <span className="text-[11px] tracking-[0.1em] text-stone-500 italic">Voir toutes les collections</span>
          </div>
        </Link>
        
        {/* Rappel visuel de la catégorie actuelle */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[9px] tracking-[0.3em] uppercase text-rose-300 font-bold">Collection actuelle</span>
          <span className="text-sm font-serif italic text-stone-900">{decodedCategory}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* GALERIE PHOTO */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/5] bg-white border border-rose-50 overflow-hidden rounded-sm shadow-sm group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={product.images[activeImg]}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </AnimatePresence>
            
            {product.images.length > 1 && (
              <div className="absolute inset-y-0 inset-x-4 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setActiveImg(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="p-3 bg-white/90 backdrop-blur-md rounded-full pointer-events-auto hover:bg-rose-500 hover:text-white transition-all shadow-lg"
                >
                  <LucideChevronLeft size={18} strokeWidth={1.5} />
                </button>
                <button 
                  onClick={() => setActiveImg(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="p-3 bg-white/90 backdrop-blur-md rounded-full pointer-events-auto hover:bg-rose-500 hover:text-white transition-all shadow-lg"
                >
                  <LucideChevronRight size={18} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>

          {/* Miniatures */}
          {product.images.length > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`w-16 aspect-[4/5] rounded-sm transition-all duration-500 overflow-hidden border ${activeImg === idx ? 'border-rose-400 scale-105 shadow-md' : 'border-transparent opacity-40 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CONTENU INFO */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="space-y-12">
            <div className="space-y-6">
              {/* NOM DE LA CATEGORIE - TRÈS CLAIR */}
              <div className="inline-flex items-center gap-2 bg-rose-50/50 px-4 py-1 rounded-full border border-rose-100/50">
                <LucideSparkles size={10} className="text-rose-400" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-rose-400 font-bold">
                  {decodedCategory} • {product.subCategory}
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl font-serif italic text-stone-900 leading-[0.9] tracking-tighter">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-light text-stone-900">{product.price} F CFA</span>
                <span className="text-[10px] tracking-widest text-stone-300 uppercase italic">TVA incluse</span>
              </div>
            </div>

            <p className="text-stone-500 font-light leading-relaxed text-lg italic border-l-2 border-rose-200 pl-8 py-2">
              {product.description}
            </p>

            <button 
              onClick={handleWhatsAppOrder}
              className="w-full bg-stone-900 text-white py-6 text-[11px] tracking-[0.5em] uppercase hover:bg-rose-500 transition-all shadow-2xl flex items-center justify-center gap-4 group rounded-sm transform hover:-translate-y-1"
            >
              Commander maintenant
              <LucideMessageCircle size={16} className="group-hover:scale-125 transition-transform" />
            </button>

            {/* Ingrédients */}
            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-rose-50"></span>
                <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-stone-300 italic">Composition Active</span>
                <span className="h-px flex-1 bg-rose-50"></span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.ingredients.map((ing, i) => (
                  <span key={i} className="text-[10px] text-stone-600 font-medium px-4 py-1.5 bg-stone-50 border border-stone-100 rounded-full italic hover:bg-rose-50 transition-colors cursor-default">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER PRODUIT */}
      <section className="mt-40 pt-20 border-t border-rose-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
          <div className="md:col-span-2 space-y-8">
             <span className="text-[10px] tracking-[0.5em] uppercase text-rose-300 font-bold block">Le Rituel Confidence</span>
             <h2 className="text-4xl font-serif italic text-stone-900 leading-tight">Pourquoi choisir la collection {decodedCategory} ?</h2>
             <p className="text-lg text-stone-500 font-light leading-loose italic max-w-2xl">
               {product.longDescription}
             </p>
          </div>
          
          <div className="bg-[#F9F3F2] p-10 rounded-sm space-y-8">
            <div className="flex items-center gap-4 text-stone-800">
              <LucideTruck size={20} strokeWidth={1} />
              <span className="text-xs tracking-widest uppercase font-bold">Livraison Express</span>
            </div>
            <div className="flex items-center gap-4 text-stone-800">
              <LucideShieldCheck size={20} strokeWidth={1} />
              <span className="text-xs tracking-widest uppercase font-bold">Paiement Sécurisé</span>
            </div>
            <div className="flex items-center gap-4 text-stone-800">
              <LucideLeaf size={20} strokeWidth={1} />
              <span className="text-xs tracking-widest uppercase font-bold">Éco-Responsable</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}