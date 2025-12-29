'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { account } from '@/lib/appwrite';
import { Sparkles, Heart, MapPin, Wind, Globe } from 'lucide-react';
import Link from 'next/link';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setIsVisible(true);
    const fetchUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.log("Mode visiteur.");
      }
    };
    fetchUser();
  }, []);

  return (
    <main className={`min-h-screen bg-confidence-beige text-confidence-black transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* 1. Accueil Personnalisé */}
      {user && (
        <div className="bg-confidence-gold/5 py-4 text-center border-b border-confidence-gold/10">
          <span className="text-[9px] tracking-[0.5em] uppercase text-confidence-gold font-bold animate-pulse">
            Bienvenue dans l'univers Confidence, {user.name}
          </span>
        </div>
      )}

      {/* 2. Hero Section : L'Héritage Azur */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-confidence-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-confidence-black/60 via-transparent to-confidence-black/80 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1493246318656-5bbd4afb293c?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-50 scale-105"
            alt="Nature Majestueuse"
          />
        </div>
        
        <div className="relative z-20 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="block text-[10px] tracking-[1em] uppercase mb-8 text-confidence-gold font-bold">
              Confidence Azur
            </span>
            <h1 className="text-7xl md:text-[11rem] font-serif italic text-white mb-8 leading-none tracking-tighter">
              L'Origine <span className="text-confidence-gold">.</span>
            </h1>
            <div className="w-px h-32 bg-gradient-to-b from-confidence-gold to-transparent mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* 3. Le Manifeste Botanique */}
      <section className="py-40 md:py-56 px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] tracking-[0.5em] uppercase text-confidence-gold font-bold sticky top-32">
              Notre Essence
            </span>
          </div>
          <div className="lg:col-span-8 space-y-16">
            <h2 className="text-4xl md:text-6xl font-serif leading-[1.1] italic text-confidence-black">
              "La beauté n'est pas un artifice, c'est une <span className="text-confidence-gold">résonance</span> entre l'âme et la terre."
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-lg font-light leading-relaxed text-confidence-black/60 italic">
              <p>
                Confidence Azur est née d'un voyage intérieur, une quête pour capturer la force brute de la nature Burkinabè et la sublimer dans des flacons d'exception. Nous croyons en une cosmétique de vérité.
              </p>
              <p>
                Chaque goutte de nos huiles, chaque grain de notre karité raconte l'histoire d'une terre résiliente. Nous ne créons pas de simples soins, nous sculptons la confiance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Matière Grasse : L'Or de la Savane */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-[4rem] shadow-luxe border border-confidence-gold/10">
              <img 
                src="https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=1887&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale sepia-[.2] hover:grayscale-0 transition-all duration-[2s]"
                alt="Karité Pur"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 bg-confidence-black text-white p-12 rounded-[3rem] hidden md:block shadow-2xl">
               <Sparkles className="text-confidence-gold mb-4" size={32} strokeWidth={1} />
               <p className="text-[10px] tracking-[0.5em] uppercase font-bold">Secret de Formulation</p>
               <p className="font-serif italic text-xl mt-2 text-confidence-gold">Pureté Absolue</p>
            </div>
          </motion.div>

          <div className="space-y-12">
            <h3 className="text-5xl md:text-6xl font-serif italic text-confidence-black">Le Karité <br/> Haute Couture</h3>
            <p className="text-confidence-black/60 font-light leading-relaxed text-xl italic">
              Notre beurre est une matière vivante. Extrait à froid au cœur du Burkina Faso, il est le fruit d'une communion entre le soleil et le savoir-faire ancestral. Non transformé, il offre à la peau une renaissance immédiate.
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
              {[
                { label: 'Terroir Burkinabè', icon: <MapPin size={14}/> },
                { label: 'Souffle Sauvage', icon: <Wind size={14}/> },
                { label: 'Éthique Royale', icon: <Globe size={14}/> },
                { label: 'Artisanat Diamant', icon: <Sparkles size={14}/> }
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-4 border-l border-confidence-gold/20 pl-6 group">
                  <span className="text-confidence-gold group-hover:scale-110 transition-transform w-fit">{item.icon}</span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-confidence-black font-bold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Engagement : L'Impact Azur */}
      <section className="py-48 px-8 text-center bg-confidence-beige relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 bg-gradient-to-b from-confidence-gold/40 to-transparent" />
        
        <div className="max-w-4xl mx-auto space-y-12 pt-24 relative z-10">
          <div className="inline-flex items-center gap-4 text-confidence-gold mb-4">
             <div className="h-px w-12 bg-confidence-gold/30" />
             <span className="text-[10px] tracking-[0.6em] uppercase font-black">Noblesse & Engagement</span>
             <div className="h-px w-12 bg-confidence-gold/30" />
          </div>
          
          <h3 className="text-5xl md:text-7xl font-serif italic leading-[1] text-confidence-black">
            L'excellence comme <br/> héritage social.
          </h3>
          
          <p className="text-confidence-black/50 font-light leading-relaxed text-2xl italic max-w-2xl mx-auto">
            Chaque geste Confidence contribue à l'éducation et à l'indépendance financière des femmes de nos communautés partenaires. Nous bâtissons un empire de dignité.
          </p>
          
          <div className="pt-12">
            <Link href="/products" className="inline-block px-16 py-7 bg-confidence-black text-white text-[10px] tracking-[0.5em] uppercase hover:bg-confidence-terracotta transition-all shadow-luxe rounded-full font-bold group">
              Explorez la Collection
              <Sparkles size={12} className="inline ml-4 text-confidence-gold group-hover:rotate-12 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Décoration de fond subtile */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-confidence-gold/5 rounded-full blur-3xl" />
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-confidence-terracotta/5 rounded-full blur-3xl" />
      </section>

    </main>
  );
};

export default AboutPage;