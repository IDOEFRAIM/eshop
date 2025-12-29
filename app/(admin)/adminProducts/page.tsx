"use client";

import React, { useEffect, useState } from 'react';
import { 
  Plus, Search, Package, Edit, Trash2, Loader2, Eye, 
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { 
  databases, storage, 
  DATABASE_ID, COLLECTION_PRODUCTS_ID, BUCKET_IMAGES_ID 
} from '@/lib/appwrite';

export default function AdminProductsDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_PRODUCTS_ID);
      setProducts(response.documents);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string, imageIds: string[]) => {
    if (!confirm("Voulez-vous vraiment supprimer ce trésor du catalogue ?")) return;
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_PRODUCTS_ID, productId);
      if (imageIds?.length > 0) {
        for (const id of imageIds) {
          try { await storage.deleteFile(BUCKET_IMAGES_ID, id); } catch (e) { console.error(e); }
        }
      }
      setProducts(products.filter(p => p.$id !== productId));
    } catch (error) {
      alert("Erreur lors de la suppression");
    }
  };

  const getImageUrl = (imageId: string) => {
    return storage.getFileView(BUCKET_IMAGES_ID, imageId).toString();
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 pt-6 bg-confidence-beige">
      
      {/* HEADER : Style Confidence Azur */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-confidence-gold">
            <Sparkles size={16} />
            <span className="text-[10px] text-black tracking-[0.4em] uppercase font-bold">Catalogue Privé</span>
          </div>
          <h1 className="text-5xl font-serif italic text-confidence-black leading-tight">
            La Collection <span className="text-confidence-gold/30">.</span>
          </h1>
        </div>
        
        <Link 
          href="/adminProducts/new" 
          className="bg-confidence-black text-black px-10 py-4 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-confidence-terracotta transition-all shadow-xl hover:shadow-confidence-terracotta/20 flex items-center justify-center gap-3 group"
        >
          <Plus size={16} />
          Ajouter un produit
        </Link>
      </div>

      {/* RECHERCHE ÉLÉGANTE */}
      <div className="relative group max-w-2xl">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-confidence-black/20 group-focus-within:text-confidence-gold transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Rechercher une référence, une gamme..." 
          className="w-full pl-14 pr-6 py-5 bg-white border border-confidence-gold/10 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-confidence-gold/5 transition-all text-confidence-black font-medium italic placeholder:text-confidence-black/20"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* LISTE DES PRODUITS */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-6">
          <Loader2 className="animate-spin text-confidence-gold" size={32} strokeWidth={1.5} />
          <p className="text-confidence-black/30 text-[9px] uppercase tracking-[0.4em] font-bold">Ouverture du coffre...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="space-y-5">
          {filteredProducts.map((product) => (
            <div 
              key={product.$id} 
              className="bg-white p-5 rounded-[2.5rem] border border-confidence-gold/5 hover:border-confidence-gold/20 transition-all group flex flex-col md:flex-row items-center gap-8 hover:shadow-luxe"
            >
              {/* IMAGE VIGNETTE */}
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-confidence-beige flex-shrink-0 border border-confidence-gold/10 relative">
                {product.images?.[0] ? (
                  <img 
                    src={getImageUrl(product.images[0])} 
                    alt="" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-confidence-black/10"><Package size={24} /></div>
                )}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-confidence-black/40 backdrop-blur-[1px] flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold tracking-tighter uppercase">Sold Out</span>
                  </div>
                )}
              </div>

              {/* INFOS PRODUIT */}
              <div className="flex-grow grid grid-cols-1 md:grid-cols-3 items-center gap-6 w-full py-2">
                <div className="text-center md:text-left">
                  <p className="text-[9px] font-bold text-confidence-gold uppercase tracking-widest mb-1">{product.category}</p>
                  <h3 className="font-serif italic text-xl text-confidence-black">{product.name}</h3>
                </div>

                <div className="text-center">
                  <p className="text-[9px] text-confidence-black/20 uppercase tracking-widest mb-1">Valeur & Stock</p>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-confidence-terracotta">{Number(product.price).toLocaleString()} F CFA</span>
                    <span className={`text-[10px] font-bold ${product.stock > 5 ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {product.stock} unités disponibles
                    </span>
                  </div>
                </div>

                {/* ACTIONS RAFFINÉES */}
                <div className="flex justify-center md:justify-end items-center gap-3">
                  <Link 
                    href={`/adminProducts/${product.$id}`}
                    className="p-3 bg-confidence-beige text-confidence-black/40 hover:text-confidence-black hover:bg-confidence-gold/10 rounded-xl transition-all"
                    title="Voir en boutique"
                  >
                    <Eye size={18} strokeWidth={1.5} />
                  </Link>

                  <Link 
                    href={`/adminProducts/${product.$id}/edit`}
                    className="p-3 bg-confidence-beige text-confidence-black/40 hover:text-white hover:bg-confidence-black rounded-xl transition-all"
                    title="Modifier"
                  >
                    <Edit size={18} strokeWidth={1.5} />
                  </Link>

                  <button 
                    onClick={() => handleDelete(product.$id, product.images)}
                    className="p-3 bg-confidence-beige text-confidence-black/20 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="Supprimer"
                  >
                    <Trash2 size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] border border-dashed border-confidence-gold/20 py-32 flex flex-col items-center justify-center text-center px-10">
          <div className="bg-confidence-beige p-8 rounded-full mb-6">
            <Package size={40} className="text-confidence-gold/20" strokeWidth={1} />
          </div>
          <h3 className="text-2xl font-serif italic text-confidence-black">Votre galerie est vide</h3>
          <p className="text-confidence-black/40 font-light mt-3 text-sm italic">Commencez l'aventure en ajoutant votre première création.</p>
        </div>
      )}
    </div>
  );
}