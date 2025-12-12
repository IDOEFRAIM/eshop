import React from 'react';
import Link from 'next/link';
import {
  Zap,
  ScanFace,
  Hexagon,
  Star,
  ArrowLeft,
  Sparkles,
  Fingerprint,
  Plus,
  AlertTriangle
} from 'lucide-react';
import { products } from '@/lib/products';

// Type pour les props de la page (Compatible Next.js 14/15)
interface CategoryPageProps {
  params: {
    category: string;
  };
}

// --- CONFIGURATION DU STYLE ---

const categoryMeta: Record<string, { title: string; subtitle: string; tag: string }> = {
  levre: { title: 'LÈVRES', subtitle: 'Pigments Quantiques', tag: 'PROTOCOLE V.2.4' },
  visage: { title: 'VISAGE', subtitle: 'Teint Adaptatif IA', tag: 'SMART-SKIN' },
  complet: { title: 'FULL LOOK', subtitle: 'Singularité Esthétique', tag: 'COLLECTION 2026' }
};

const categoryIcons: Record<string, React.ElementType> = {
  levre: Zap,
  visage: ScanFace,
  complet: Hexagon
};

const categoryThemes: Record<string, { accent: string; text: string; ring: string }> = {
  levre: { 
    accent: "from-pink-500/40 via-purple-500/20 to-transparent", 
    text: "text-pink-400",
    ring: "group-hover:ring-pink-500/50"
  },
  visage: { 
    accent: "from-blue-500/40 via-cyan-500/20 to-transparent", 
    text: "text-blue-400",
    ring: "group-hover:ring-blue-500/50"
  },
  complet: { 
    accent: "from-emerald-500/40 via-teal-500/20 to-transparent", 
    text: "text-emerald-400",
    ring: "group-hover:ring-emerald-500/50"
  }
};

const Rating = ({ value }: { value: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={12}
        fill={i < Math.floor(value) ? '#facc15' : 'none'}
        strokeWidth={1.5}
        className={i < Math.floor(value) ? 'text-yellow-400' : 'text-white/20'}
      />
    ))}
  </div>
);

// --- PAGE PRINCIPALE (ASYNC) ---

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params; // Important si vous êtes sur les dernières versions
  
  const rawCategory = resolvedParams?.category ? decodeURIComponent(resolvedParams.category) : '';
  const categoryKey = rawCategory.toLowerCase().trim();

  // On force le typage pour éviter les erreurs TypeScript sur les clés dynamiques
  const productList = products[categoryKey as keyof typeof products];
  
  // Configuration Fallback si la catégorie existe mais n'a pas de thème défini
  const theme = categoryThemes[categoryKey] || categoryThemes['visage'];
  const meta = categoryMeta[categoryKey] || { title: categoryKey?.toUpperCase(), subtitle: 'Data Stream', tag: 'UNKNOWN' };
  const Icon = categoryIcons[categoryKey] || Hexagon;

  // GESTION ERREUR (404) 
  if (!productList) {
    const availableKeys = Object.keys(products).join(', ');
    
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[150px] animate-pulse"></div>
        
        <div className="relative z-10 text-center space-y-6 px-6">
          <div className="inline-flex items-center gap-2 text-red-500 font-mono tracking-widest border border-red-500/30 bg-red-900/10 px-4 py-2 rounded-full">
            <AlertTriangle size={16} /> SYSTEM ERROR
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            404
          </h1>
          <div className="text-white/50 font-mono max-w-lg mx-auto space-y-2">
            <p>La catégorie <span className="text-white font-bold">"{rawCategory}"</span> est introuvable.</p>
            <p className="text-xs text-white/30 border-t border-white/10 pt-2">
              Clés disponibles dans la base : <br/> [{availableKeys}]
            </p>
          </div>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white hover:text-pink-400 transition-colors font-mono tracking-widest border-b border-white/20 hover:border-pink-400 pb-1 mt-8"
          >
            <ArrowLeft size={16} /> REBOOT SYSTEM
          </Link>
        </div>
      </div>
    );
  }

  // --- AFFICHAGE NORMAL ---
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-pink-500/50 selection:text-white overflow-x-hidden relative">
      
      {/* FOND AMBIANT */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br ${theme.accent} rounded-full blur-[150px] opacity-40 mix-blend-screen animate-pulse-slow`} />
        <div className="absolute bottom-0 right-[-10%] w-[700px] h-[700px] bg-white/5 rounded-full blur-[180px] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* HEADER */}
      <div className="relative z-10 pt-32 pb-16 px-6 max-w-[90rem] mx-auto">
        <header className="mb-24 relative">
            <Link href="/" className="inline-flex items-center text-white/40 hover:text-white transition-colors font-mono text-xs tracking-[0.3em] mb-8 group">
                <ArrowLeft size={14} className="mr-3 group-hover:-translate-x-1 transition-transform" />
                {`Page d'accueil`}
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.08] pb-8 relative">
                <div className="absolute bottom-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-white/30 to-transparent"></div>
                
                <div className="space-y-4">
                    <div className={`inline-flex items-center gap-3 px-3 py-1 rounded-lg bg-white/5 ring-1 ring-white/10 w-fit ${theme.text}`}>
                        <Icon size={18} />
                        <span className="text-[10px] font-mono font-bold tracking-widest">{meta.tag}</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.9]">
                        {meta.title}
                    </h1>
                </div>

                <div className="text-right max-w-md">
                    <div className="text-xs font-mono text-white/40 mb-2 flex items-center justify-end gap-2">
                         <Sparkles size={12} className={theme.text}/> STATUS: ONLINE
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">
                        Accès au catalogue complet. Analyse biomimétique activée. 
                        Sélectionnez un artefact pour initialiser le transfert de données.
                    </p>
                </div>
            </div>
        </header>

        {/* GRID PRODUITS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {productList.map((product) => (
                <Link
                    key={product.id}
                    href={`/${categoryKey}/${product.id}`}
                    className={`group relative rounded-[2.5rem] cursor-pointer transition-all duration-700 hover:z-20 block h-[500px]`}
                >
                    {/* Conteneur Capsule */}
                    <div className={`absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] border border-white/[0.05] shadow-[inset_0_0_30px_rgba(255,255,255,0.02)] transition-all duration-500 group-hover:bg-white/[0.06] group-hover:border-white/20 group-hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(255,255,255,0.05)] overflow-hidden ring-0 ${theme.ring}`}>
                        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-3/4 bg-gradient-to-t ${theme.accent} opacity-0 group-hover:opacity-30 blur-[60px] transition-all duration-700 pointer-events-none`}></div>
                    </div>

                    {/* Contenu */}
                    <div className="relative p-6 h-full flex flex-col z-10">
                        <div className="flex justify-between items-start">
                             <div className="px-3 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">
                                {product.id}
                             </div>
                             <Rating value={product.rating} />
                        </div>

                        <div className="flex-1 relative flex items-center justify-center perspective-1000 my-4">
                            <img 
                                src={product.images[0]} 
                                alt={product.title}
                                className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-4 group-hover:rotate-3 group-hover:drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]" 
                            />
                            <div className={`absolute inset-0 bg-gradient-to-tr ${theme.accent} mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none rounded-full blur-xl`}></div>
                        </div>

                        <div className="relative mt-auto">
                            <h2 className="text-xl font-bold text-white/90 group-hover:text-white line-clamp-2 leading-tight mb-4 transition-colors">
                                {product.title}
                            </h2>

                            <div className="flex items-end justify-between border-t border-white/10 pt-4">
                                <div>
                                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1">Prix Unitaire</span>
                                    <span className={`text-2xl font-mono font-bold ${theme.text} group-hover:text-white transition-colors`}>
                                        {product.price} €
                                    </span>
                                </div>
                                <div className="relative">
                                    <div className={`absolute inset-0 bg-gradient-to-r ${theme.accent} blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                    <div className="w-10 h-10 rounded-full bg-[#0A0A0A] border border-white/20 text-white flex items-center justify-center relative z-10 group-hover:bg-white group-hover:text-black transition-all duration-300">
                                        <Plus size={18} strokeWidth={1.5} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </section>

        {/* FOOTER */}
        <div className="mt-32 pt-12 border-t border-white/[0.08] flex flex-col items-center">
            <Fingerprint size={24} className="text-white/20 mb-4 animate-pulse-slow"/>
            <p className="text-white/30 text-[10px] font-mono tracking-[0.4em] uppercase">END OF STREAM</p>
        </div>
      </div>
    </div>
  );
};

// Génération Statique
export async function generateStaticParams() {
  return Object.keys(products).map(category => ({
    category
  }));
}