import { databases, DATABASE_ID, COLLECTION_PRODUCTS_ID, storage, BUCKET_IMAGES_ID } from '@/lib/appwrite';
import { Query } from 'appwrite';
import CATEGORIZED_PRODUCTS from '@/data/products';

// 1. Préparation des données locales (Fallback)
export const LOCAL_PRODUCTS = Object.values(CATEGORIZED_PRODUCTS).flat().map(p => ({
  ...p,
  $id: p.id,
  $createdAt: new Date().toISOString(),
  $updatedAt: new Date().toISOString(),
  category: p.subCategory, // Mapping pour correspondre à Appwrite
  // Les images locales sont des chemins relatifs, on les garde telles quelles
}));

// 2. Fonction Helper pour les URLs d'images
export const resolveImageUrl = (imageIdOrPath: string) => {
  if (!imageIdOrPath) return '/placeholder.jpg';
  
  // Si c'est un chemin local (commence par /)
  if (imageIdOrPath.startsWith('/')) {
    return imageIdOrPath;
  }
  
  // Sinon c'est un ID Appwrite
  try {
    return storage.getFileView(BUCKET_IMAGES_ID, imageIdOrPath).toString();
  } catch (e) {
    return '/placeholder.jpg';
  }
};

// 3. Service de récupération avec Fallback
export const dataService = {
  
  async getProducts(queries: string[] = []) {
    // Timeout réduit à 3 secondes pour une meilleure réactivité
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout Appwrite')), 3000)
    );

    // Vérification basique de la config
    if (!DATABASE_ID || !COLLECTION_PRODUCTS_ID) throw new Error("Config manquante");

    const fetchPromise = databases.listDocuments(
      DATABASE_ID,
      COLLECTION_PRODUCTS_ID,
      queries
    );

    // Course entre le fetch et le timeout
    const response = await Promise.race([fetchPromise, timeout]) as any;
    return response.documents;
  },

  async getProduct(id: string) {
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout Appwrite')), 3000)
    );

    try {
      if (!DATABASE_ID || !COLLECTION_PRODUCTS_ID) throw new Error("Config manquante");

      const fetchPromise = databases.getDocument(
        DATABASE_ID, 
        COLLECTION_PRODUCTS_ID, 
        id
      );

      const product = await Promise.race([fetchPromise, timeout]) as any;
      return product;

    } catch (error) {
      console.warn(`⚠️ Produit ${id} non trouvé sur Appwrite ou timeout. Recherche locale.`);
      
      const localProduct = LOCAL_PRODUCTS.find(p => p.$id === id);
      
      if (!localProduct) {
        throw error; // Si pas trouvé en local non plus, on laisse l'erreur remonter (404)
      }
      
      return localProduct;
    }
  }
};
