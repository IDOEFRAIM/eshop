// export const dynamic = 'force-dynamic'; // Optimisation : On utilise ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalider toutes les heures (cache serveur)

import { databases, DATABASE_ID, COLLECTION_PRODUCTS_ID } from '@/lib/appwrite';
import ProductClient from '@/components/ui/productClient';
import { notFound } from 'next/navigation';
import { dataService, LOCAL_PRODUCTS } from '@/lib/data-service';

// Génération statique des pages produits au build (pour les performances maximales)
export async function generateStaticParams() {
  try {
    const products = await dataService.getProducts();
    return products.map((product: any) => ({
      id: product.$id,
    }));
  } catch (error) {
    // Si Appwrite échoue au build, on génère quand même les pages statiques locales
    return LOCAL_PRODUCTS.map((product: any) => ({
      id: product.$id,
    }));
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Ici on utilise 'id' car le dossier est [id]
  
  try {
    const product = await dataService.getProduct(id);
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
    // 3. Appel à Appwrite avec l'ID correct (ou fallback)
    const product = await dataService.getProduct(id);

    return <ProductClient product={product} />;

  } catch (error) {
    console.error("Erreur Appwrite détaillée:", error);
    return notFound();
  }
}