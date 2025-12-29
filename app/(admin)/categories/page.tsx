"use client";

import React, { useEffect, useState } from 'react';
import { 
  Plus, Trash2, Loader2, Tag, ArrowLeft, LayoutGrid, Sparkles 
} from 'lucide-react';
import Link from 'next/link';
import { 
  databases, 
  DATABASE_ID, 
  COLLECTION_CATEGORIES_ID,
  ID 
} from '@/lib/appwrite';
import { Query } from 'appwrite';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID, 
        COLLECTION_CATEGORIES_ID,
        [Query.orderAsc("name")]
      );
      setCategories(response.documents);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_CATEGORIES_ID,
        ID.unique(),
        { name: newCategory.trim() }
      );
      
      setCategories([...categories, res].sort((a, b) => a.name.localeCompare(b.name)));
      setNewCategory("");
    } catch (error) {
      alert("Erreur lors de l'ajout.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer définitivement cette catégorie ?")) return;
    
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_CATEGORIES_ID, id);
      setCategories(categories.filter(c => c.$id !== id));
    } catch (error) {
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="min-h-screen bg-confidence-beige pb-20 px-6 pt-12">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* EN-TÊTE RAFFINÉ : Style Confidence */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <Link href="/adminProducts" className="inline-flex items-center gap-3 text-confidence-black/30 hover:text-confidence-gold transition-all font-bold uppercase text-[9px] tracking-[0.3em] group">
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> 
              Retour au Studio
            </Link>
            <h1 className="text-5xl font-serif italic text-confidence-black leading-tight">
              Categorie <span className="text-confidence-gold">.</span>
            </h1>
            <p className="text-confidence-black/40 font-light text-sm italic">
              Organisez vos collections botaniques avec clarté.
            </p>
          </div>
          
          <div className="hidden md:flex bg-white p-6 rounded-[2rem] shadow-sm border border-confidence-gold/10">
              <LayoutGrid className="text-confidence-gold" size={28} strokeWidth={1.5} />
          </div>
        </div>

        {/* FORMULAIRE D'AJOUT STYLE "PILL" */}
        <div className="bg-white p-2 rounded-full border border-confidence-gold/10 shadow-xl shadow-confidence-black/5">
            <form onSubmit={handleAddCategory} className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow">
                    <Tag className="absolute left-8 top-1/2 -translate-y-1/2 text-confidence-gold/40" size={18} />
                    <input 
                        type="text" 
                        placeholder="Nom de la nouvelle catégorie (ex: Soins de Nuit)..." 
                        className="w-full pl-16 pr-6 py-5 bg-transparent outline-none text-confidence-black font-medium placeholder:text-confidence-black/20 italic"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                </div>
                <button 
                    disabled={isSubmitting || !newCategory.trim()}
                    className="bg-confidence-black text-black px-12 py-5 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-confidence-terracotta transition-all disabled:opacity-30 flex items-center justify-center gap-3 shadow-lg"
                >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <>
                        <Plus size={16} />
                        Ajouter une categorie
                      </>
                    )}
                </button>
            </form>
        </div>

        {/* GRILLE DES CATÉGORIES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {loading ? (
                <div className="col-span-full py-40 flex flex-col items-center gap-6">
                    <Loader2 className="animate-spin text-confidence-gold" size={32} strokeWidth={1} />
                    <p className="text-confidence-black/30 text-[9px] uppercase tracking-[0.4em] font-bold">Lecture de l'index...</p>
                </div>
            ) : categories.length > 0 ? (
                categories.map((cat) => (
                    <div 
                        key={cat.$id} 
                        className="group bg-white border border-confidence-gold/5 p-7 rounded-[2.5rem] flex items-center justify-between hover:shadow-luxe hover:border-confidence-gold/20 transition-all duration-500"
                    >
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-confidence-beige rounded-2xl flex items-center justify-center text-confidence-gold/40 group-hover:text-confidence-gold transition-colors duration-500">
                                <Sparkles size={18} strokeWidth={1.5} />
                            </div>
                            <span className="font-serif italic text-lg text-confidence-black">{cat.name}</span>
                        </div>
                        
                        <button 
                            onClick={() => handleDelete(cat.$id)}
                            className="p-3 text-confidence-black/10 hover:text-confidence-terracotta hover:bg-confidence-terracotta/5 rounded-xl transition-all"
                            title="Supprimer"
                        >
                            <Trash2 size={18} strokeWidth={1.5} />
                        </button>
                    </div>
                ))
            ) : (
                <div className="col-span-full py-32 bg-white rounded-[3rem] border-2 border-dashed border-confidence-gold/10 flex flex-col items-center text-center px-10">
                    <div className="p-8 bg-confidence-beige rounded-full mb-6 text-confidence-gold/20">
                        <Tag size={40} strokeWidth={1} />
                    </div>
                    <h3 className="text-xl font-serif italic text-confidence-black">L'index est vierge</h3>
                    <p className="text-confidence-black/40 font-light mt-3 text-sm italic max-w-xs">
                        Définissez vos gammes pour offrir une navigation fluide à vos clients.
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}