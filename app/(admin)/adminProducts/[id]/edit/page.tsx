"use client";
export const dynamic = 'force-dynamic';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Sparkles, Wand2, History } from 'lucide-react';
import Link from 'next/link';
import { 
  databases, storage, 
  DATABASE_ID, COLLECTION_PRODUCTS_ID, BUCKET_IMAGES_ID, ID 
} from '@/lib/appwrite';
import ProductForm from '@/components/admin/productForm'; 

export default function EditProductPage() {
  const { id } = useParams(); 
  const router = useRouter();
  
  const [product, setProduct] = useState<any>(null);
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await databases.getDocument(
          DATABASE_ID, 
          COLLECTION_PRODUCTS_ID, 
          id as string
        );
        setProduct(data);
      } catch (error) {
        console.error("Erreur fetch:", error);
        router.push('/adminProducts');
      } finally {
        setLoadingFetch(false);
      }
    };
    if (id) fetchProduct();
  }, [id, router]);

  const handleUpdate = async (formData: any, newFiles: File[], keptImageIds: string[]) => {
    if (newFiles.length === 0 && keptImageIds.length === 0) {
      alert("La beauté commence par le visuel : ajoutez au moins une photo !");
      return;
    }

    setIsUpdating(true);
    try {
      let newlyUploadedIds: string[] = [];
      if (newFiles.length > 0) {
        const uploadPromises = newFiles.map(file => 
          storage.createFile(BUCKET_IMAGES_ID, ID.unique(), file)
        );
        const uploads = await Promise.all(uploadPromises);
        newlyUploadedIds = uploads.map(up => up.$id);
      }

      const finalImageIds = [...keptImageIds, ...newlyUploadedIds];

      const charArray = formData.characteristiquesInput
        ? formData.characteristiquesInput.split(',').map((c: string) => c.trim()).filter((c: string) => c !== "")
        : [];

      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_PRODUCTS_ID,
        id as string,
        {
          name: formData.name,
          price: Number(formData.price),
          description: formData.description,
          longDescription: formData.longDescription,
          category: formData.category,
          subCategory: formData.subCategory,
          stock: Number(formData.stock),
          images: finalImageIds, 
          characteristiques: charArray,
          ecoScore: Number(formData.ecoScore),
        }
      );

      router.push('/adminProducts');
      router.refresh();
    } catch (error: any) {
      console.error("Update Error:", error);
      alert("Erreur lors de la mise à jour : " + error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loadingFetch) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6 bg-confidence-beige">
        <div className="relative">
          <Loader2 className="animate-spin text-confidence-gold" size={48} strokeWidth={1} />
          <div className="absolute inset-0 scale-150 blur-2xl bg-confidence-gold/20 -z-10" />
        </div>
        <p className="font-serif italic text-confidence-black/60 text-lg">Préparation du studio...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 px-6 pt-10 font-sans animate-slow-fade">
      
      {/* HEADER RAFFINÉ */}
      <div className="flex flex-col gap-6">
        <Link 
          href="/adminProducts" 
          className="flex items-center gap-3 text-confidence-black/40 hover:text-confidence-black transition-all font-bold uppercase text-[9px] tracking-[0.3em] group w-fit"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Annuler et quitter
        </Link>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-confidence-terracotta">
            <History size={16} strokeWidth={1.5} />
            <span className="text-[10px] tracking-[0.5em] uppercase font-black">Mise à jour</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif italic text-confidence-black">
            Perfectionner <span className="text-confidence-gold">.</span>
          </h1>
          <p className="text-confidence-black/50 font-light italic text-sm">
            Vous modifiez actuellement : <span className="text-confidence-black font-bold border-b border-confidence-gold/30">{product?.name}</span>
          </p>
        </div>
      </div>

      {/* FORMULAIRE DANS UNE CARTE "CONFIDENCE" */}
      <div className="bg-white rounded-[3rem] shadow-luxe border border-confidence-gold/10 overflow-hidden">
        <div className="p-8 md:p-14">
          <ProductForm 
            initialData={product} 
            onSubmit={handleUpdate} 
            loading={isUpdating} 
            buttonText="Sauvegarder les changements" 
          />
        </div>
      </div>

      {/* OVERLAY DE CHARGEMENT PREMIUM */}
      {isUpdating && (
        <div className="fixed inset-0 bg-confidence-beige/80 backdrop-blur-xl z-[100] flex flex-col items-center justify-center">
          <div className="bg-white p-12 rounded-[4rem] shadow-luxe flex flex-col items-center gap-6 border border-confidence-gold/10">
            <div className="relative">
              <Loader2 className="animate-spin text-confidence-gold" size={40} />
              <div className="absolute inset-0 bg-confidence-gold/20 blur-xl animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="font-serif italic text-2xl text-confidence-black">Sublimation en cours</h2>
              <p className="text-[9px] tracking-[0.3em] uppercase font-bold text-confidence-black/40">
                Vos modifications deviennent réalité
              </p>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}