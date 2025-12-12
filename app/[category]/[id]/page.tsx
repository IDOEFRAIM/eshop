'use client'

import { useParams } from 'next/navigation'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
    ArrowLeft, Star, Share2, ShoppingBag, Camera, 
    Zap, Check, MessageCircle, AlertTriangle, ChevronRight,
    Activity, Layers, Heart
} from 'lucide-react'


import { products as productData } from '@/lib/products'


const categoryThemes: Record<string, { accentText: string; accentBg: string }> = {
  levre: { 
    accentText: "text-pink-400", 
    accentBg: "bg-pink-900/20 border-pink-500/20" 
  },
  visage: { 
    accentText: "text-blue-400", 
    accentBg: "bg-blue-900/20 border-blue-500/20" 
  },
  complet: { 
    accentText: "text-emerald-400", 
    accentBg: "bg-emerald-900/20 border-emerald-500/20" 
  }
};


const ProductPage = () => {

    const params = useParams();
    const { category: rawCategory, id: productId } = params;
    console.log(productId)

    const category = Array.isArray(rawCategory) ? rawCategory[0] : rawCategory || '';
    const id = Array.isArray(productId) ? productId[0] : productId || '';


    const product = useMemo(() => {
        if (!category || !id) return null;
        
        const categoryKey = category.toLowerCase() as keyof typeof productData;

        if (!(categoryKey in productData)) return null;

        const productList = productData[categoryKey];
        return productList?.find((p) => p.id === id);
    }, [category, id]);

    const theme = categoryThemes[category.toLowerCase() as keyof typeof categoryThemes] || categoryThemes.levre;

    const [activeImage, setActiveImage] = useState(0);
    const [selectedShade, setSelectedShade] = useState(0);

    const goBack = () => window.history.back();

    if (!product) {
        
        const safeCategory = category || '';
        const availableCategoryLink = safeCategory ? `/${safeCategory}` : '/';
        
        let errorMessage = 'Artefact ID manquant.';
        
        if (id && category) {
            errorMessage = `Artefact ID «${id}» est introuvable dans le répertoire «${category}».`;
        } else if (category) {
            errorMessage = `Artefact ID manquant. Veuillez spécifier un ID pour le répertoire «${category}».`;
        } else {
            errorMessage = 'Accès non spécifié. Le chemin d\'accès est incomplet ou invalide.';
        }


        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
                {/* Effet d'erreur subtile */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[150px] animate-pulse-slow z-0" />
                
                <div className="relative z-10">
                    <AlertTriangle size={48} className="text-red-500 mb-6 mx-auto animate-pulse" />
                    <h1 className="text-5xl font-bold mb-6 text-white tracking-tighter">
                        ACCÈS REFUSÉ (404)
                    </h1>

                    <p className="text-gray-400 text-lg max-w-xl mb-10 font-mono">
                        <b className="text-white/80">{errorMessage}</b>
                    </p>

                    <a
                        href="https://wa.me/22601479800"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 transition px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg shadow-green-900/50"
                    >
                        <MessageCircle size={22} />
                        Contacter Support
                    </a>

                    <Link
                        href={availableCategoryLink}
                        className="mt-10 block text-white/60 hover:text-pink-400 transition text-sm font-mono tracking-widest"
                    >
                        <span className="flex items-center justify-center gap-2">
                           <ArrowLeft size={14} /> REVENIR AU CATALOGUE {safeCategory.toUpperCase() || 'PRINCIPAL'}
                        </span>
                    </Link>
                </div>
            </div>
        )
    }


    // --- RENDU DU PRODUIT ---
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500/30 pb-20">

            {/* --- BACKGROUND SUBTIL --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className={`absolute top-0 right-0 w-[600px] h-[600px] ${theme.accentBg.replace('border-', 'bg-').replace('/20', '/10')} rounded-full blur-[150px]`} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            </div>

            {/* --- HEADER NAV (Fixe, Flou) --- */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-gradient-to-b from-black via-black/80 to-transparent backdrop-blur-sm">
                <button
                    onClick={goBack}
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </button>

                <div className="flex gap-4">
                    <button className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:text-pink-400 transition-colors">
                        <Share2 size={18} />
                    </button>

                    <button className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:text-pink-400 transition-colors relative">
                        <ShoppingBag size={18} />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full"></span>
                    </button>
                </div>
            </nav>

            {/* --- BREADCRUMBS FUTURISTE --- */}
            <div className="max-w-7xl mx-auto pt-24 px-4 text-xs font-mono tracking-widest text-white/40 mb-8 z-10 relative">
                <Link href="/" className="hover:text-pink-400 transition">Accueil</Link> 
                <span className="mx-2"><ChevronRight size={10} className="inline"/></span>
                <Link href={`/${category}`} className="hover:text-pink-400 transition">{category.toUpperCase()}</Link>
                <span className="mx-2"><ChevronRight size={10} className="inline"/></span>
                <span className="text-white/60">{id}</span>
            </div>

            {/* --- CONTENU PRINCIPAL --- */}
            <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">

                {/* --- COLONNE GAUCHE : GALERIE --- */}
                <div className="lg:col-span-7 space-y-4">

                    {/* Image principale (Effet 3D/holographique) */}
                    <div className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden border border-white/10 group bg-gray-900/40">
                        <img
                            src={product.images[activeImage]}
                            alt={product.title}
                            className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105 group-hover:drop-shadow-[0_40px_40px_rgba(0,0,0,0.5)]"
                        />
                        {/* Effet lumineux/scanline sur l'image */}
                        <div className={`absolute inset-0 bg-gradient-to-tr ${theme.accentBg.replace('/20', '/10')} mix-blend-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none rounded-[2rem]`}></div>

                        <button className={`absolute bottom-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full flex items-center gap-2 text-sm font-bold hover:bg-white hover:text-black transition-all ${theme.accentText}`}>
                            <Camera size={16} /> ESSAYER (AR)
                        </button>
                         <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:text-red-500 transition-colors">
                            <Heart size={20} />
                        </button>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                                    activeImage === idx ? `border-pink-500 ring-2 ring-pink-500/50 scale-95` : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                            >
                                <img src={img} className="w-full h-full object-cover" alt={` ${img}`} />
                            </button>
                        ))}
                    </div>

                    {/* Section Description Détaillée */}
                    <section className="mt-16 pt-8 border-t border-white/10">
                        <h2 className="text-3xl font-black mb-6 tracking-tight flex items-center gap-3">
                           <Zap size={24} className={theme.accentText}/> Description
                        </h2>
                        <div className="text-gray-400 space-y-4 leading-relaxed">
                            <p>{product.description || product.description}</p>
                            
                            {/* Exemple de Bloc Info 
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 font-mono text-sm">
                                <span className={`${theme.accentText} block mb-1`}>// DATA STREAM: ID-{id}</span>
                                Formulation: {product.formulation} | Volume: {product.volume}
                            </div>*/}
                        </div>
                    </section>
                </div>

                {/* --- COLONNE DROITE : INFO PRODUIT & CTA --- */}
                <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">

                    {/* Catégorie + Rating */}
                    <div className="flex justify-between items-center mb-6">
                        <div className={`text-xs font-mono tracking-widest uppercase px-3 py-1 rounded border ${theme.accentText} ${theme.accentBg}`}>
                            {product.category} // SÉRIE 01
                        </div>

                        <div className="flex items-center gap-1 text-yellow-400 text-sm">
                            <Star size={14} fill="currentColor" />
                            <span className="font-bold">{product.rating}</span>
                            <span className="text-gray-500 ml-1">({product.reviews} avis)</span>
                        </div>
                    </div>

                    {/* Titre */}
                    <h1 className="text-5xl md:text-6xl font-black mb-4 leading-none tracking-tighter">
                        {product.title}
                    </h1>

                    {/* Prix */}
                    <div className="text-4xl font-mono font-bold text-gray-200 mb-8 flex items-baseline gap-2">
                        <span className={theme.accentText}>{product.price} €</span>
                        <span className="text-sm text-gray-500 font-mono line-through font-normal">65 €</span>
                    </div>

                    {/* Description Courte */}
                    <p className="text-gray-400 leading-relaxed mb-8 border-l-2 border-white/10 pl-4">
                        {product.description}
                    </p>

                    {/* Shades (Teintes) */}
                    <div className="mb-8">
                        <span className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-3 block">
                            Teinte sélectionnée: <span className="text-white font-bold">{product.shades[selectedShade]?.name || 'N/A'}</span>
                        </span>

                        <div className="flex flex-wrap gap-4">
                            {product.shades.map((shade, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedShade(idx)}
                                    className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                                        selectedShade === idx
                                            ? 'ring-2 ring-offset-2 ring-offset-black ring-white scale-110'
                                            : 'hover:scale-105 opacity-80 hover:opacity-100'
                                    }`}
                                    style={{ backgroundColor: shade.hex }}
                                >
                                    {selectedShade === idx && <Check size={16} className="text-white drop-shadow-md" />}
                                    
                                    <span className="absolute -bottom-8 text-[10px] w-24 text-center text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        {shade.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bouton d'Action (CTA) */}
                    <button className={`w-full py-4 rounded-full font-black text-lg tracking-widest uppercase transition-all duration-300 ${theme.accentBg.replace('/20', '/50')} bg-white hover:bg-pink-400 hover:text-black shadow-xl shadow-pink-900/50 text-black`}>
                        <div className="flex items-center justify-center gap-3">
                           <Link href='https://wa.me/+22601118080'>
                           <ShoppingBag size={20}/> Acheter
                           </Link>
                        </div>
                    </button>
                    
                    {/* Features (Mise en avant) */}
                    <div className="grid grid-cols-3 gap-3 mt-8 border-t border-white/10 pt-6">
                        {product.features.map((feat, idx) => (
                            <div
                                key={idx}
                                className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col items-center text-center gap-2 hover:bg-white/10 transition-colors"
                            >
                                <div className={`${theme.accentText} mb-1`}>{feat.icon}</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{feat.label}</div>
                                <div className="text-sm font-bold">{feat.value}</div>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-[10px] text-gray-500 font-mono mt-8">
                        RÉFÉRENCE INTERNE: {product.id}
                    </p>
                </div>
            </main>
        </div>
    );
}

export default ProductPage;