'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { LucideSparkles, ArrowRight, Loader2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { 
  databases, storage, 
  DATABASE_ID, COLLECTION_PRODUCTS_ID, BUCKET_IMAGES_ID 
} from '@/lib/appwrite';

// 1. Fonction de récupération des données
const fetchAllProducts = async () => {
  const response = await databases.listDocuments(
    DATABASE_ID, 
    COLLECTION_PRODUCTS_ID
  );
  return response.documents;
};

export default function AllProductsPage() {
  // 2. Hook TanStack Query pour la gestion du cache et du fetching
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  // Helper pour transformer l'ID de l'image en URL Appwrite
  const getImageUrl = (imageId: string) => {
    if (!imageId) return '';
    return storage.getFileView(BUCKET_IMAGES_ID, imageId).toString();
  };

  if (isError) return (
    <div className="h-screen flex items-center justify-center font-serif italic text-stone-500">
      Une erreur est survenue lors de l'appel de la collection.
    </div>
  );

  return (
    <div className="bg-[#FAF7F7] min-h-screen pb-24 font-sans relative">
      {/* Texture de grain subtile pour le côté luxe */}
      <div className="fixed inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

      {/* HEADER DE LA BOUTIQUE */}
      <section className="relative pt-40 pb-20 px-8 text-center z-10">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] tracking-[0.8em] uppercase text-rose-300 block mb-6 font-black"
        >
          L'Herbier de Confidence
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-9xl font-serif italic text-stone-900 tracking-tighter leading-none"
        >
          Toutes nos <br /> <span className="text-rose-200">Créations</span>
        </motion.h1>
      </section>

      {/* GRILLE DE PRODUITS */}
      <section className="relative max-w-7xl mx-auto px-8 z-10">
        {isLoading ? (
          <div className="flex flex-col items-center py-40 gap-4">
            <Loader2 className="animate-spin text-rose-200" size={32} strokeWidth={1} />
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400">Préparation de la galerie...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
            {products?.map((product, idx) => (
              <motion.div
                key={product.$id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.8 }}
                className="group"
              >
                <Link href={`/products/${product.$id}`}>
                  {/* Image avec effet de zoom et blend mode */}
                  <div className="relative aspect-[4/5] bg-white overflow-hidden mb-8 rounded-sm shadow-sm group-hover:shadow-2xl transition-all duration-1000 ease-out border border-stone-100">
                    {product.images?.[0] ? (
                      <img 
                        src={getImageUrl(product.images[0])} 
                        alt={product.name}
                        className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-110 transition-transform duration-[2s] ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-stone-50">
                        <ShoppingBag className="text-stone-200" size={40} strokeWidth={1} />
                      </div>
                    )}
                    
                    {/* Overlay au survol */}
                    <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>

                  {/* Infos Produit */}
                  <div className="space-y-3 px-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] tracking-[0.4em] uppercase text-rose-300 font-black">
                        {product.category || 'Soin Signature'}
                      </span>
                      <LucideSparkles size={12} className="text-rose-100" />
                    </div>
                    
                    <h3 className="text-3xl font-serif italic text-stone-800 group-hover:text-stone-950 transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex justify-between items-end pt-2">
                      <p className="text-lg font-serif italic text-stone-400">
                        {Number(product.price).toLocaleString()} F CFA
                      </p>
                      
                      <div className="flex items-center gap-3 text-[9px] tracking-[0.3em] uppercase font-black text-stone-900 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                        Détails <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* BANDEAU DE RÉASSURANCE */}
      <section className="relative mt-60 max-w-5xl mx-auto px-8 border-t border-stone-200 pt-24 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Formule Pure", icon: "🌿" },
            { label: "Éthique", icon: "✨" },
            { label: "Savoir-faire", icon: "👐" },
            { label: "Artisanal", icon: "🏺" }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className="space-y-4"
            >
              <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
              <p className="text-[10px] tracking-[0.4em] uppercase font-black text-stone-400">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}