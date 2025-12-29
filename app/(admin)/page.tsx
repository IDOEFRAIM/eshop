"use client";

import React, { useEffect, useState } from 'react';
import { 
  Plus, Search, Package, Edit, Trash2, Loader2, 
  Sparkles, ExternalLink 
} from 'lucide-react';
import Link from 'next/link';
import { 
  databases, storage, 
  DATABASE_ID, COLLECTION_PRODUCTS_ID, BUCKET_IMAGES_ID 
} from '@/lib/appwrite';
import { Query } from 'appwrite';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID, COLLECTION_PRODUCTS_ID,
        [Query.limit(100), Query.orderDesc("$createdAt")]
      );
      setProducts(response.documents);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imageId: string) => {
    if (!imageId) return "";
    return storage.getFilePreview(BUCKET_IMAGES_ID, imageId, 400, 400).toString();
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24 px-8 pt-16 min-h-screen">
      
      {/* HEADER : Focus sur le bouton Nouveau */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 border-b border-amber-900/5 pb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100">
            <Sparkles size={12} className="text-amber-600" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-amber-700 font-black">Administration</span>
          </div>
          <h1 className="text-6xl font-serif italic text-slate-900 leading-tight">La Collection</h1>
          <p className="text-slate-500 font-light italic">Gérez vos créations avec distinction.</p>
        </div>
        
        {/* LE BOUTON RE-DESIGNÉ */}
        <Link 
          href="/adminProducts/new" 
          className="relative group overflow-hidden bg-slate-900 text-white px-12 py-6 rounded-2xl font-bold flex items-center justify-center gap-4 transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_rgba(180,140,80,0.3)] hover:-translate-y-1 active:scale-95"
        >
          {/* Petit éclat brillant au survol */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform" />
          
          <div className="bg-amber-500 p-1 rounded-lg text-slate-900 group-hover:bg-white transition-colors duration-300">
            <Plus size={20} strokeWidth={3} />
          </div>
          <span className="text-lg text-black uppercase tracking-[0.3em] font-black">Nouvelle Création</span>
        </Link>
      </div>

      {/* BARRE DE RECHERCHE */}
      <div className="relative max-w-2xl mx-auto md:mx-0">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Filtrer la collection..." 
          className="w-full pl-16 pr-8 py-6 bg-white/50 backdrop-blur-sm border border-amber-100 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/5 focus:bg-white focus:border-amber-300 transition-all text-slate-800 shadow-sm"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* LISTE DES PRODUITS */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-6">
          <Loader2 className="animate-spin text-amber-600" size={40} />
          <p className="text-amber-800/40 text-[10px] uppercase tracking-[0.5em] font-bold">Préparation de la galerie...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.$id} 
              className="group bg-white p-6 rounded-[2rem] border border-amber-100/50 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-500 flex flex-col md:flex-row items-center gap-10"
            >
              {/* IMAGE */}
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-slate-50 border border-amber-50 flex-shrink-0">
                {product.images?.[0] ? (
                  <img 
                    src={getImageUrl(product.images[0])} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    alt={product.name} 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200"><Package size={32} /></div>
                )}
              </div>

              {/* INFOS */}
              <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-center md:text-left">
                <div className="space-y-1">
                  <span className="text-[8px] font-black uppercase text-amber-600 tracking-[0.4em]">{product.category}</span>
                  <h3 className="font-serif italic text-2xl text-slate-900 leading-none">{product.name}</h3>
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Valeur</p>
                  <p className="font-serif text-xl text-slate-800">{Number(product.price).toLocaleString()} F CFA</p>
                </div>

                <div className="flex flex-col justify-center items-center md:items-start">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Stock</p>
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black border ${
                    product.stock <= 5 ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  }`}>
                    {product.stock} UNITÉS
                  </span>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">
                <Link href={`/adminProducts/${product.$id}/edit`} className="p-4 bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-2xl transition-all">
                  <Edit size={18} />
                </Link>
                <Link href={`/adminProducts/${product.$id}`} className="p-4 bg-slate-900 text-white rounded-2xl shadow-lg hover:bg-amber-600 transition-all">
                  <ExternalLink size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Animation personnalisée pour l'effet brillant */}
      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}