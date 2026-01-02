import { Client, Account, Databases, Storage, ID } from 'appwrite';

// 1. Initialisation du client
export const client = new Client();

// Vérification de sécurité pour l'endpoint et le projet
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!projectId) {
    console.warn("Attention : La variable NEXT_PUBLIC_APPWRITE_PROJECT_ID est manquante !");
}

client
    .setEndpoint(endpoint) 
    .setProject(projectId || 'placeholder-project-id');

// 2. Export des services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// 3. Export des IDs (Correction ici : ajout de process.env)
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
export const COLLECTION_PRODUCTS_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PRODUCTS_ID || '';
export const COLLECTION_CATEGORIES_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CATEGORIES_ID || '';
export const BUCKET_IMAGES_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || '';

// Export de ID pour l'utiliser lors de la création de documents
export { ID };