"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Wand2 } from 'lucide-react';
import Link from 'next/link';
import { 
  databases, storage, ID, 
  DATABASE_ID, COLLECTION_PRODUCTS_ID, BUCKET_IMAGES_ID 
} from '@/lib/appwrite';
import ProductForm from '@/components/admin/productForm';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData: any, images: File[], _keptImageIds: string[]) => {
    if (images.length === 0) {
      alert("✨ Amira, une belle image est le secret d'une vente réussie ! Ajoute au moins une photo.");
      return;
    }

    setLoading(true);

    try {
      // 1. Upload des images
      const uploadedImageIds = [];
      for (const file of images) {
        const upload = await storage.createFile(BUCKET_IMAGES_ID, ID.unique(), file);
        uploadedImageIds.push(upload.$id);
      }

      // 2. Préparation des caractéristiques
      const charArray = formData.characteristiquesInput
        ? formData.characteristiquesInput.split(',').map((c: string) => c.trim()).filter((c: string) => c !== "")
        : [];

      // 3. Création dans la base Confidence Azur
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_PRODUCTS_ID,
        ID.unique(),
        {
          name: formData.name,
          price: Number(formData.price),
          description: formData.description,
          longDescription: formData.longDescription,
          category: formData.category,
          subCategory: formData.subCategory,
          stock: Number(formData.stock),
          images: uploadedImageIds,
          characteristiques: charArray,
          ecoScore: Number(formData.ecoScore)
        }
      );

      router.push('/adminProducts');
      router.refresh();

    } catch (error: any) {
      console.error("Erreur:", error);
      alert("Petit souci technique : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 pt-6 bg-confidence-beige">
      
      {/* HEADER ÉLÉGANT : Style Confidence */}
      <div className="flex flex-col gap-6">
        <Link 
          href="/adminProducts" 
          className="flex items-center gap-3 text-confidence-black/30 hover:text-confidence-black transition-all font-bold uppercase text-[9px] tracking-[0.3em] group w-fit"
        >
          <div className="p-2 rounded-full border border-transparent group-hover:border-confidence-gold/20 transition-all">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          Retour au catalogue
        </Link>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-confidence-gold">
            <Wand2 size={16} strokeWidth={1.5} />
            <span className="text-[10px] tracking-[0.5em] uppercase font-black">Studio Créatif</span>
          </div>
          <h1 className="text-5xl font-serif italic text-confidence-black">
            Nouvelle Pépite <span className="text-confidence-gold/30">.</span>
          </h1>
          <p className="text-confidence-black/40 font-light italic text-sm">
            Remplissez les détails pour donner vie à votre prochain chef-d'œuvre.
          </p>
        </div>
      </div>

      {/* FORMULAIRE DANS UNE CARTE ÉPURÉE */}
      <div className="bg-white rounded-[3rem] border border-confidence-gold/10 p-2 shadow-luxe animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <div className="p-8 md:p-14">
          <ProductForm 
            onSubmit={handleCreate} 
            loading={loading} 
            buttonText="Inscrire au catalogue" 
          />
        </div>
      </div>

      {/* OVERLAY DE CHARGEMENT : Confidence Azur */}
      {loading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-2xl z-[100] flex flex-col items-center justify-center transition-all duration-500">
          <div className="relative">
            {/* Effet de Halo Doré */}
            <div className="absolute inset-0 rounded-full border border-confidence-gold/20 animate-ping scale-150 opacity-20" />
            
            <div className="bg-white p-14 rounded-[5rem] shadow-luxe flex flex-col items-center gap-6 relative border border-confidence-gold/5">
              <div className="relative">
                <Loader2 className="animate-spin text-confidence-gold" size={48} strokeWidth={1} />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-1.5 h-1.5 bg-confidence-terracotta rounded-full animate-pulse" />
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <h2 className="font-serif italic text-2xl text-confidence-black">Sublimation...</h2>
                <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-confidence-black/30 animate-pulse">
                  Inscription au coffre-fort
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}