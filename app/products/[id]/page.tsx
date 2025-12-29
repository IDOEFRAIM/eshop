export const dynamic = 'force-dynamic';
import { databases, DATABASE_ID, COLLECTION_PRODUCTS_ID } from '@/lib/appwrite';
import ProductClient from '@/components/ui/productClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Ici on utilise 'id' car le dossier est [id]
  
  try {
    const product = await databases.getDocument(DATABASE_ID, COLLECTION_PRODUCTS_ID, id);
    return { title: `${product.name} | Confidence` };
  } catch {
    return { title: 'Produit Introuvable' };
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  // 1. On attend la résolution des params
  const { id } = await params; 

  // 2. Sécurité : Si l'ID est absent pour une raison X ou Y
  if (!id) {
    return notFound();
  }

  try {
    // 3. Appel à Appwrite avec l'ID correct
    const product = await databases.getDocument(
      DATABASE_ID, 
      COLLECTION_PRODUCTS_ID, 
      id 
    );

    return <ProductClient product={product} />;

  } catch (error) {
    console.error("Erreur Appwrite détaillée:", error);
    return notFound();
  }
}