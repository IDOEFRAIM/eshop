export const dynamic = 'force-dynamic';
import { 
  databases, storage, 
  DATABASE_ID, COLLECTION_PRODUCTS_ID, BUCKET_IMAGES_ID 
} from '@/lib/appwrite';
import { ArrowLeft, Edit, Leaf, ShieldCheck, Truck, Sparkles, Eye } from 'lucide-react';
import Link from 'next/link';

async function getProduct(id: string) {
  try {
    const product = await databases.getDocument(DATABASE_ID, COLLECTION_PRODUCTS_ID, id);
    return product;
  } catch (error) {
    console.error("Erreur récupération produit:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  return { title: product ? `Aperçu : ${product.name} | Confidence Admin` : 'Produit introuvable' };
}

export default async function AdminProductPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6 bg-confidence-beige">
        <div className="p-8 bg-white rounded-full shadow-luxe border border-confidence-gold/10">
            <Eye size={40} className="text-confidence-gold/30" strokeWidth={1} />
        </div>
        <h1 className="text-2xl font-serif italic text-confidence-black">Ce trésor semble avoir disparu...</h1>
        <Link href="/adminProducts" className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase bg-confidence-black text-white px-8 py-4 rounded-full hover:bg-confidence-terracotta transition-all">
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const getImageUrl = (fileId: string) => storage.getFileView(BUCKET_IMAGES_ID, fileId).toString();

  return (
    <div className="min-h-screen bg-confidence-beige pb-32 font-sans">
      
      {/* BARRE D'OUTILS ADMIN : Effet Verre & Gold */}
      <div className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl border-b border-confidence-gold/10">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <Link href="/adminProducts" className="flex items-center gap-3 text-confidence-black/40 hover:text-confidence-black transition-all font-bold uppercase text-[9px] tracking-[0.3em] group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Inventaire
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-confidence-gold">
                <Sparkles size={14} />
                <span className="text-[9px] text-black font-bold uppercase tracking-[0.3em]">Tu es en train de voir les infos d'un produit</span>
            </div>
            <Link 
              href={`/adminProducts/${id}/edit`}
              className="flex items-center gap-3 bg-confidence-black text-white px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] hover:bg-confidence-gold transition-all shadow-luxe"
            >
              <Edit size={14} />
              MODIFIER LA FICHE
            </Link>
          </div>
          <Link
          className='text-sky-600'
          href={`/adminProducts/${product.$id}/edit`}
          >
          Mettre a jour le produits
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-20 animate-slow-fade">
        
        {/* GALERIE : Style Lookbook avec Zoom subtil */}
        <div className="space-y-8">
          {product.images && product.images.length > 0 ? (
            product.images.map((imgId: string) => (
              <div key={imgId} className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white border border-confidence-gold/5 shadow-luxe">
                <img 
                  src={getImageUrl(imgId)} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
            ))
          ) : (
            <div className="aspect-[4/5] bg-white rounded-[2.5rem] border border-dashed border-confidence-gold/20 flex items-center justify-center text-confidence-gold/40 italic text-sm">
              Visuel en attente
            </div>
          )}
        </div>

        {/* CONTENU : Luxe Minimaliste */}
        <div className="lg:sticky lg:top-32 h-fit space-y-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <span className="px-5 py-2 bg-white text-confidence-gold text-[9px] font-bold uppercase rounded-full tracking-[0.2em] border border-confidence-gold/20 shadow-sm">
                {product.category || 'Collection Exclusive'}
              </span>
              <span className={`text-[9px] font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full border ${product.stock > 0 ? 'bg-white text-emerald-600 border-emerald-100' : 'bg-white text-confidence-terracotta border-confidence-terracotta/20'}`}>
                Stock : {product.stock}
              </span>
            </div>
            
            <h1 className="text-6xl text-sky-400 md:text-8xl font-serif italic text-confidence-black leading-[0.9] tracking-tight">
              {product.name}
            </h1>
            
            <p className="text-4xl font-light text-confidence-terracotta">
              {Number(product.price).toLocaleString('fr-FR')} <span className="text-xs font-sans font-bold uppercase tracking-widest text-confidence-black/30 ml-2">F CFA</span>
            </p>
          </div>

          {/* RÉSUMÉ & TAGS */}
          <div className="space-y-8">
            <p className="text-confidence-black/60 text-2xl leading-relaxed font-serif italic border-l-2 border-confidence-gold/30 pl-8">
              {product.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
              {product.characteristiques?.map((char: string, i: number) => (
                <div key={i} className="px-6 py-3 bg-white text-confidence-black text-[10px] font-bold uppercase tracking-widest rounded-xl border border-confidence-gold/10 shadow-sm hover:border-confidence-gold/30 transition-colors">
                  {char}
                </div>
              ))}
            </div>
          </div>

          {/* ECO-SCORE DESIGN : Confidence Or */}
          <div className="p-10 bg-white rounded-[3rem] border border-confidence-gold/10 flex items-center gap-8 shadow-luxe relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-confidence-beige rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
            <div className="w-20 h-20 bg-confidence-beige rounded-3xl flex items-center justify-center text-confidence-gold relative z-10">
              <Leaf size={36} strokeWidth={1.5} />
            </div>
            <div className="relative z-10">
              <p className="text-confidence-black font-serif italic text-xl">Note Éthique</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold text-confidence-gold">{product.ecoScore}</span>
                <span className="text-confidence-black/30 text-sm font-bold uppercase tracking-widest">/ 100</span>
              </div>
            </div>
          </div>

          {/* CONSEILS : Zone Flottante */}
          {product.longDescription && (
            <div className="pt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px flex-grow bg-confidence-gold/20" />
                <h3 className="font-bold text-confidence-gold uppercase text-[10px] tracking-[0.4em]">Le Secret d'Amira</h3>
                <div className="h-px flex-grow bg-confidence-gold/20" />
              </div>
              <div className="text-confidence-black/70 text-lg leading-relaxed italic bg-white p-10 rounded-[3rem] font-light shadow-luxe border border-confidence-gold/5">
                {product.longDescription}
              </div>
            </div>
          )}

          {/* REASSURANCE DISCRÈTE */}
          <div className="flex justify-between items-center py-10 border-t border-confidence-gold/10">
             <div className="flex items-center gap-3 text-confidence-black/30">
                <Truck size={18} strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Expédition Premium</span>
             </div>
             <div className="flex items-center gap-3 text-confidence-black/30">
                <ShieldCheck size={18} strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Qualité Certifiée</span>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}