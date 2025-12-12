'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, Search, ShoppingBag, Fingerprint, ArrowRight, Plus, Hexagon, Sparkles } from 'lucide-react';
import { products as productData, ProductData } from '@/lib/products';

type CategoryKey = keyof ProductData;

interface CategoryEntry {
    id: CategoryKey; 
    title: string;
    subtitle: string;
    tag: string;
    image: string;
    accentColor: string;
    textColor: string;
}

const AmiraHome = () => {
    const router = useRouter();
    const [hoveredCategory, setHoveredCategory] = useState<CategoryKey | null>(null);

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const categories: CategoryEntry[] = [
        {
            id: 'levre',
            title: 'LÈVRES',
            subtitle: 'Pigments Quantiques',
            tag: 'V.2.4',
            image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=2000&auto=format&fit=crop",
            accentColor: "from-pink-500/40 via-purple-500/20 to-transparent",
            textColor: "text-pink-400"
        },
        {
            id: 'visage',
            title: 'VISAGE',
            subtitle: 'Teint Adaptatif IA',
            tag: 'SMART-SKIN',
            image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2000&auto=format&fit=crop",
            accentColor: "from-blue-500/40 via-cyan-500/20 to-transparent",
            textColor: "text-blue-400"
        },
        {
            id: 'complet',
            title: 'FULL LOOK',
            subtitle: 'Singularité Esthétique',
            tag: 'COLLECTION 2026',
            image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2000&auto=format&fit=crop",
            accentColor: "from-emerald-500/40 via-teal-500/20 to-transparent",
            textColor: "text-emerald-400"
        }
    ];

    const productSamples: Record<CategoryKey, any[]> = {
        levre: [],
        visage: [],
        complet: []
    };
    
    categories.forEach(cat => {
        const samples = (productData[cat.id] || []).slice(0, 3).map((product: any) => ({
            id: product.id,
            name: product.title,
            price: `${product.price} €`,
            img: product.images[0],
            tag: product.features[0]?.value?.toUpperCase() || 'NO TAG',
            categoryId: cat.id
        }));
        productSamples[cat.id] = samples;
    });

    const mainCategory = categories.find(c => c.id === 'complet')!;
    const sideCategories = categories.filter(c => c.id !== 'complet');

    const handleProductClick = (categoryId: CategoryKey, productId: string, event: React.MouseEvent) => {
        if (event) event.stopPropagation();
        handleNavigation(`/${categoryId}/${productId}`);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-pink-500/50 selection:text-white overflow-x-hidden relative">
            
            {/*FOND AMBIANT (Captivant)  */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[150px] animate-pulse-slow mix-blend-screen" />
                <div className="absolute bottom-0 right-[-10%] w-[700px] h-[700px] bg-pink-600/20 rounded-full blur-[180px] animate-pulse-slow delay-700 mix-blend-screen" />
                <div className="absolute top-[30%] right-[20%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow delay-1000 mix-blend-screen" />
                
                {/* Texture de bruit et grain */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] brightness-100 contrast-150 mix-blend-overlay"></div>
                {/* Vignette subtile pour focus le centre */}
                <div className="absolute inset-0 bg-radial-gradient-to-t from-black via-transparent to-black/80 opacity-80"></div>
            </div>

            {/*HEADER NAV (Fixe, Flou)*/}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-gradient-to-b from-black via-black/80 to-transparent backdrop-blur-md">
                <div className="text-3xl font-black tracking-tighter text-white">
                    <span className="text-pink-400 font-extrabold">A</span>mira
                </div>
                
                <div className="flex gap-4">
                    <button className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:text-pink-400 transition-colors">
                        <Search size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:text-pink-400 transition-colors relative">
                        <ShoppingBag size={18} />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full"></span>
                    </button>
                    <button className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:text-pink-400 transition-colors">
                        <Menu size={18} />
                    </button>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <main className="relative z-10 pt-40 pb-12 px-4 max-w-[90rem] mx-auto">
                <div className="text-center mb-24 space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-900/20 text-pink-300 text-xs tracking-[0.2em] uppercase font-mono shadow-[0_0_15px_rgba(236,72,153,0.2)] animate-fade-in-up">
                        <Fingerprint size={14} className="text-pink-400 animate-pulse" /> 
                        <span className="relative">
                            AMIRA SHOP
                            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-pink-500/50 animate-scanline"></span>
                        </span>
                    </div>
                    
                    <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.85] mix-blend-overlay opacity-90 text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-600 animate-fade-in-up delay-200 select-none">
                        BEAUTÉ <br/> AUGMENTÉE
                    </h1>
                </div>

                <div className="grid grid-cols-12 gap-6 h-auto md:h-[750px] mb-40">
                    <div 
                        className="col-span-12 md:col-span-8 relative group rounded-[3rem] overflow-hidden cursor-pointer transition-all duration-700 hover:shadow-[0_20px_80px_-20px_rgba(16,185,129,0.3)] ring-1 ring-white/10 hover:ring-emerald-500/50 z-10 hover:z-20"
                        onClick={() => handleNavigation(`/${mainCategory.id}`)}
                        onMouseEnter={() => setHoveredCategory(mainCategory.id)}
                        onMouseLeave={() => setHoveredCategory(null)}
                    >
                        <div className="absolute inset-0 z-0 overflow-hidden rounded-[3rem]">
                            <Image src={mainCategory.image} alt={mainCategory.title} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 grayscale-[70%] group-hover:grayscale-0"/>
                            <div className="absolute inset-0 bg-[#050505]/60 transition-opacity duration-700 group-hover:opacity-30"></div>
                            <div className={`absolute inset-0 bg-gradient-to-t ${mainCategory.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-soft-light`}></div>
                            <div className="absolute inset-0 bg-[url('/images/scanlines.png')] opacity-0 group-hover:opacity-10 mix-blend-overlay bg-repeat transition-opacity"></div>
                        </div>
                        
                        <div className="absolute inset-0 p-12 flex flex-col justify-end z-20">
                            <div className="transform transition-all duration-700 group-hover:translate-x-4 group-hover:-translate-y-4">
                                <div className="flex items-center gap-3 mb-4 overflow-hidden">
                                    <span className={`text-xs font-mono tracking-[0.3em] uppercase ${mainCategory.textColor} border-l-2 border-current pl-3`}>{mainCategory.tag}</span>
                                    <span className="text-white/40 text-xs font-mono group-hover:text-white/70 transition-colors">// {mainCategory.subtitle}</span>
                                </div>
                                <h2 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-none relative">
                                    {mainCategory.title}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-4 flex flex-col gap-6 h-full">
                        {sideCategories.map((cat) => (
                            <div 
                                key={cat.id}
                                className={`relative flex-1 group rounded-[3rem] overflow-hidden cursor-pointer transition-all duration-700 ring-1 ring-white/10 z-10 hover:z-20
                                    ${cat.id === 'levre' ? 'hover:shadow-[0_20px_80px_-20px_rgba(236,72,153,0.3)] hover:ring-pink-500/50' : 'hover:shadow-[0_20px_80px_-20px_rgba(59,130,246,0.3)] hover:ring-blue-500/50'}
                                `}
                                onClick={() => handleNavigation(`/${cat.id}`)}
                                onMouseEnter={() => setHoveredCategory(cat.id)}
                                onMouseLeave={() => setHoveredCategory(null)}
                            >
                                <div className="absolute inset-0 z-0 overflow-hidden rounded-[3rem]">
                                   <Image src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 grayscale-[80%] group-hover:grayscale-0"/>
                                   <div className="absolute inset-0 bg-[#050505]/60 transition-opacity duration-700 group-hover:opacity-30"></div>
                                   <div className={`absolute inset-0 bg-gradient-to-t ${cat.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-soft-light`}></div>
                                </div>

                                <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                                     <div className="transform transition-all duration-700 group-hover:translate-x-2 group-hover:-translate-y-2">
                                         <div className={`text-xs font-mono tracking-[0.3em] uppercase mb-3 ${cat.textColor}`}>{cat.tag}</div>
                                         <h3 className="text-4xl font-black text-white tracking-tight">{cat.title}</h3>
                                     </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-40">
                    {categories.map((category) => (
                        <div key={category.id} className="relative">
                            
                            <div className="flex items-end justify-between mb-16 border-b border-white/[0.08] pb-6 relative">
                                <div className="absolute bottom-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-white/30 to-transparent"></div>
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl bg-white/5 ring-1 ring-white/10 ${hoveredCategory === category.id ? 'animate-pulse ' + category.textColor : 'text-white/50'}`}>
                                       <Hexagon size={24} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-mono text-white/40 mb-2 tracking-widest flex items-center">
                                            <Sparkles size={10} className="mr-2 text-white/60"/> Category: {category.tag}
                                        </div>
                                        <h3 className="text-5xl font-black tracking-tight uppercase text-white">
                                           {category.title}
                                        </h3>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleNavigation(`/${category.id}`)}
                                    className={`group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition-all duration-300 ${category.textColor}`}
                                >
                                    <span className="text-xs font-mono font-bold tracking-widest group-hover:text-white transition-colors">ACCÉDER AUX DONNÉES</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                               {
                                 productSamples[category.id]?.map((product: any) => (
                                    <div 
                                        key={product.id} 
                                        className="group relative rounded-[2.5rem] cursor-pointer transition-all duration-500 z-10 hover:z-20"
                                        onClick={(e) => handleProductClick(product.categoryId, product.id, e)}
                                    >
                                        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] border border-white/[0.05] shadow-[inset_0_0_30px_rgba(255,255,255,0.02)] transition-all duration-500 group-hover:bg-white/[0.06] group-hover:border-white/20 group-hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(255,255,255,0.05)] overflow-hidden">
                                            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-1/2 bg-gradient-to-t ${category.accentColor} opacity-0 group-hover:opacity-40 blur-[80px] transition-all duration-700 pointer-events-none`}></div>
                                        </div>

                                        <div className="relative p-6 h-full flex flex-col">
                                            <div className="absolute top-6 left-6 z-30 flex items-center gap-2">
                                                <div className={`px-3 py-1.5 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-[0.2em] text-white/80 group-hover:text-white group-hover:border-${category.textColor.replace('text-', '')}/30 transition-colors`}>
                                                    {product.tag}
                                                </div>
                                            </div>

                                            <div className="relative h-80 mb-6 flex items-center justify-center perspective-1000">
                                               <Image 
                                                    src={product.img} 
                                                    alt={product.name}
                                                    className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-4 group-hover:drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)]" 
                                                />
                                                <div className={`absolute inset-0 bg-gradient-to-tr ${category.accentColor} mix-blend-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none rounded-3xl`}></div>
                                            </div>

                                            {/* Info Bas (HUD Reveal) */}
                                            <div className="mt-auto relative z-30">
                                                {/* Titre */}
                                                <h4 className="font-black text-2xl mb-2 text-white/90 group-hover:text-white transition-colors leading-tight">{product.name}</h4>
                                                
                                                {/* Prix et ID Data */}
                                                <div className="flex justify-between items-end overflow-hidden">
                                                    <div className="flex flex-col gap-1 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Réf. Produit</span>
                                                        <p className="text-xs text-white/60 font-mono tracking-widest">{product.id}</p>
                                                    </div>
                                                    <span className={`font-mono text-2xl font-bold ${category.textColor} transform group-hover:translate-x-2 transition-transform duration-500`}>{product.price}</span>
                                                </div>

                                                <div className="absolute -bottom-2 -right-2 pointer-events-none">
                                                     <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.accentColor.replace('to-transparent', 'to-white/20')} blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                                </div>
                                                <div className="absolute bottom-2 right-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-200 z-40">
                                                    <button 
                                                        className="w-12 h-12 rounded-full bg-[#0A0A0A] border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 hover:border-transparent transition-all duration-300 shadow-lg shadow-black/50"
                                                        onClick={(e) => handleProductClick(product.categoryId, product.id, e)}
                                                    >
                                                        <Plus size={20} strokeWidth={1.5} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                 ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-40 pt-12 pb-20 border-t border-white/[0.08] flex flex-col items-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    <Fingerprint size={32} className="text-white/20 mb-6 animate-pulse-slow"/>
                    <p className="text-white/40 text-xs font-mono tracking-[0.4em] uppercase">© 2026 Amira Systems. Fait par 
                    <Link
                    href='https://portfolio-tanka-jmct.vercel.app/en'
                    className='text-sky-400 text-2xl'>Efraim IDO</Link>
                    </p>
                </div>

            </main>
        </div>
    );
};

export default AmiraHome;