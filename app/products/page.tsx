'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { LucideSparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import CATEGORIZED_PRODUCTS from '@/data/products';

export default function AllProductsPage() {
  // On transforme l'objet de catégories en une liste plate de tous les produits
  const allProducts = Object.entries(CATEGORIZED_PRODUCTS).flatMap(([category, products]) =>
    products.map(p => ({ ...p, categoryName: category }))
  );

  return (
    <div className="bg-[#FAF7F7] min-h-screen pb-24">
      {/* HEADER DE LA BOUTIQUE */}
      <section className="pt-32 pb-20 px-8 text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] tracking-[0.8em] uppercase text-rose-300 block mb-6"
        >
          L'Herbier de Confidence
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-serif italic text-stone-900"
        >
          Toutes nos <br /> <span className="text-rose-200">Créations</span>
        </motion.h1>
      </section>

      {/* GRILLE DE PRODUITS */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {allProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <Link href={`/products/${encodeURIComponent(product.categoryName)}/${product.id}`}>
                {/* Image avec effet de zoom et blend mode */}
                <div className="relative aspect-[4/5] bg-white overflow-hidden mb-6 rounded-sm shadow-sm group-hover:shadow-xl transition-all duration-700">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                  />
                  <div className="absolute inset-0 bg-rose-50/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Infos Produit */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] tracking-[0.3em] uppercase text-rose-300 font-bold">
                      {product.categoryName}
                    </span>
                    <span className="text-[10px] text-stone-300 font-light italic">
                      {product.subCategory}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-serif text-stone-800 group-hover:text-rose-400 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex justify-between items-center pt-2">
                    <p className="text-sm font-light text-stone-500">{product.price} F CFA</p>
                    <div className="flex items-center gap-2 text-[9px] tracking-widest uppercase font-bold text-stone-900 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                      Découvrir <ArrowRight size={10} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BANDEAU DE RÉASSURANCE */}
      <section className="mt-40 max-w-5xl mx-auto px-8 border-t border-rose-100 pt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Pur", icon: "🌱" },
            { label: "Cruelty Free", icon: "🐰" },
            { label: "Local", icon: "🌍" },
            { label: "Artisanal", icon: "✨" }
          ].map((item, i) => (
            <div key={i} className="space-y-3">
              <div className="text-2xl">{item.icon}</div>
              <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-stone-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}