"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'; 
import { 
  UploadCloud, X, CheckCircle2, Loader2, 
  Package, Sparkles, Image as ImageIcon, Leaf, ListFilter 
} from 'lucide-react';
import { storage, BUCKET_IMAGES_ID, databases, DATABASE_ID, COLLECTION_CATEGORIES_ID } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { motion } from 'framer-motion';

const inputBase = "w-full px-6 py-4 bg-brand-bg border border-brand-primary/10 rounded-2xl outline-none text-brand-text placeholder:text-brand-muted/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all duration-500 ease-in-out";

export default function ProductForm({ initialData, onSubmit, loading, buttonText }: any) {
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [fetchingCats, setFetchingCats] = useState(true);

  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      longDescription: '',
      category: '',
      price: '',
      stock: 0,
      ecoScore: 90
    }
  });

  const currentEcoScore = watch("ecoScore");
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [existingImageIds, setExistingImageIds] = useState<string[]>([]);

  // 1. CHARGEMENT DES CATÉGORIES ET RESET DES DONNÉES INITIALES
  useEffect(() => {
    const loadCats = async () => {
      try {
        const res = await databases.listDocuments(
          DATABASE_ID, 
          COLLECTION_CATEGORIES_ID,
          [Query.orderAsc("name")]
        );
        setDbCategories(res.documents);
      } catch (error) {
        console.error("Erreur chargement catégories:", error);
      } finally {
        setFetchingCats(false);
      }
    };

    loadCats();

    // Si on est en mode EDIT (initialData présent)
    if (initialData) {
      reset({
        ...initialData,
        // On s'assure que le prix est en string pour l'input number au début si besoin
        price: initialData.price?.toString() 
      });
      if (initialData.images) setExistingImageIds(initialData.images);
    }
  }, [initialData, reset]);

  // --- GESTION IMAGES ---
  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setNewImages(prev => [...prev, ...selectedFiles]);
      const previews = selectedFiles.map(file => URL.createObjectURL(file));
      setNewPreviews(prev => [...prev, ...previews]);
    }
  };

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setNewPreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const getExistingImageUrl = (imageId: string) => {
    return storage.getFileView(BUCKET_IMAGES_ID, imageId).toString();
  };

  const onFormSubmit = (data: any) => {
    const formattedData = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      ecoScore: Number(data.ecoScore)
    };
    onSubmit(formattedData, newImages, existingImageIds);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-20 relative z-10">
      
      <div className="lg:col-span-2 space-y-8">
        <motion.div className="bg-white p-10 rounded-[2rem] border border-brand-primary/5 shadow-xl space-y-8">
          <div className="flex items-center gap-4 border-b border-brand-bg pb-6">
            <div className="p-3 bg-amber-50 rounded-xl"><Sparkles className="text-amber-600" size={22}/></div>
            <div>
                <h3 className="text-slate-900 font-serif italic text-2xl tracking-tighter">
                  {initialData ? "Modifier le Trésor" : "Essence du Produit"}
                </h3>
                <p className="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-black">
                  {initialData ? "Mise à jour de la collection" : "Détails de création"}
                </p>
            </div>
          </div>
          
          <div className="grid gap-8">
            {/* NOM */}
            <div className="group">
              <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-1 mb-3 block">Désignation</label>
              <input {...register("name", { required: true })} type="text" placeholder="Nom du trésor..." className={inputBase} />
            </div>

            {/* SÉLECTEUR DE CATÉGORIE DYNAMIQUE - CRUCIAL POUR LE MODE EDIT */}
            <div className="group">
              <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-1 mb-3 block flex items-center justify-between">
                <span>Categorie</span>
                {fetchingCats && <Loader2 size={12} className="animate-spin text-amber-600" />}
              </label>
              <div className="relative">
                <select 
                  {...register("category", { required: "Veuillez choisir une categorie" })} 
                  className={`${inputBase} appearance-none cursor-pointer pr-12`}
                  // On s'assure que la valeur par défaut est bien gérée par react-hook-form via le register
                >
                  <option value="">-- Sélectionner --</option>
                  {dbCategories.map((cat) => (
                    <option key={cat.$id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ListFilter size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-amber-600 pointer-events-none" />
              </div>
            </div>
            
            {/* DESCRIPTION COURTE */}
            <div className="group">
              <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-1 mb-3 block">Accroche Courte</label>
              <input {...register("description")} type="text" placeholder="Une phrase pour séduire..." className={inputBase} />
            </div>
            
            {/* CARACTÉRISTIQUES */}
            <div className="group">
              <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-1 mb-3 block">Caractéristiques</label>
              <textarea {...register("longDescription")} rows={5} placeholder="Histoire, texture, bienfaits..." className={`${inputBase} resize-none leading-relaxed`} />
            </div>
          </div>
        </motion.div>

        {/* GALERIE IMAGES */}
        <div className="bg-white p-10 rounded-[2rem] border border-brand-primary/5 shadow-xl space-y-8">
            <h3 className="text-slate-900 font-serif italic text-2xl flex items-center gap-3"><ImageIcon size={22} className="text-amber-600" /> Galerie Royale</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Images existantes (Appwrite) */}
                {existingImageIds.map((id) => (
                  <div key={id} className="relative aspect-[4/5] rounded-2xl overflow-hidden group border border-amber-100 shadow-sm">
                    <img src={getExistingImageUrl(id)} className="w-full h-full object-cover" alt="Existant" />
                    <button type="button" onClick={() => setExistingImageIds(prev => prev.filter(i => i !== id))} className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-colors"><X size={14}/></button>
                  </div>
                ))}

                {/* Nouvelles previews (Locales) */}
                {newPreviews.map((url, index) => (
                  <div key={index} className="relative aspect-[4/5] rounded-2xl overflow-hidden group border border-blue-100 shadow-sm">
                    <img src={url} className="w-full h-full object-cover" alt="Preview" />
                    <button type="button" onClick={() => removeNewImage(index)} className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-colors"><X size={14}/></button>
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-blue-500 text-[8px] text-white font-bold rounded-md uppercase">Nouveau</div>
                  </div>
                ))}

                {/* Bouton Upload */}
                <label className="aspect-[4/5] flex flex-col items-center justify-center border-2 border-dashed border-amber-200 hover:border-amber-500 hover:bg-amber-50 rounded-2xl cursor-pointer transition-all group">
                    <UploadCloud size={24} className="text-amber-400 group-hover:text-amber-600 transition-colors" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-amber-500 mt-2">Ajouter</span>
                    <input type="file" multiple className="hidden" onChange={handleNewImageChange} accept="image/*" />
                </label>
            </div>
        </div>
      </div>

      {/* BARRE LATÉRALE */}
      <div className="space-y-8">
        <div className="bg-white p-10 rounded-[2rem] border border-brand-primary/5 shadow-xl space-y-8">
          <h3 className="text-slate-900 font-serif italic text-2xl flex items-center gap-3"><Package size={22} className="text-amber-600"/> Logistique</h3>
          <div className="space-y-8">
            <div>
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest block mb-3">Prix (CFA)</label>
              <input {...register("price", { required: true })} type="number" className="w-full px-8 py-6 bg-slate-50 border border-amber-100 rounded-2xl text-amber-700 font-serif text-3xl outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest block mb-3">Stock</label>
              <input {...register("stock")} type="number" className={inputBase} />
            </div>
          </div>
        </div>

        {/* ECO SCORE */}
        <div className="bg-emerald-50 p-10 rounded-[2rem] border border-emerald-100 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-emerald-700 font-black text-[10px] uppercase tracking-widest flex items-center gap-2"><Leaf size={16}/> Naturalité</h3>
            <span className="text-emerald-900 font-serif text-2xl">{currentEcoScore}%</span>
          </div>
          <input {...register("ecoScore")} type="range" max="100" min="0" className="w-full accent-emerald-600 h-1.5 cursor-pointer appearance-none bg-emerald-200 rounded-full" />
        </div>

        <button 
          disabled={loading || fetchingCats} 
          type="submit" 
          className="w-full bg-slate-900 text-white py-8 rounded-[1.5rem] font-black uppercase tracking-[0.4em] text-[12px] flex items-center justify-center gap-4 hover:bg-amber-600 transition-all shadow-xl disabled:opacity-50 group"
        >
          {loading ? <Loader2 className="animate-spin" size={20}/> : <CheckCircle2 size={20} />}
          {buttonText}
        </button>
      </div>
    </form>
  );
}