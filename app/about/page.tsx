'use client'
import React, { useState, useEffect } from 'react';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className={`min-h-screen bg-[#FDFCFB] text-[#1A1A1A] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Hero Section - L'Origine */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          {/* Simulation d'une image de paysage du Sahel ou de récolte de karité */}
          <div className="w-full h-full bg-[#E5DACE] flex items-center justify-center text-gray-400">
            [Image du paysage sahélien au Burkina Faso au coucher du soleil]
          </div>
        </div>
        
        <div className="relative z-20 text-center px-6">
          <span className="block text-[10px] tracking-[0.5em] uppercase mb-4 text-white opacity-80">Notre Terre</span>
          <h1 className="text-5xl md:text-8xl font-serif italic text-white mb-8">Burkina Faso</h1>
          <div className="w-px h-24 bg-white/50 mx-auto"></div>
        </div>
      </section>

      {/* Le Manifeste */}
      <section className="py-24 md:py-40 px-6 max-w-4xl mx-auto">
        <div className="space-y-12">
          <h2 className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold">Le Manifeste</h2>
          <p className="text-2xl md:text-4xl font-serif leading-relaxed italic">
            "Nous croyons que la véritable beauté réside dans la confiance. Une confiance puisée au cœur d'une terre généreuse, où chaque ingrédient raconte une histoire de résilience et de pureté."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 text-sm font-light leading-relaxed text-gray-600">
            <p>
              Confidence Beauty est née d'un désir de réconcilier le luxe contemporain avec les rituels ancestraux du Burkina Faso. C'est ici, dans la savane, que nous sourçons notre or blanc : un beurre de karité d'une qualité exceptionnelle, récolté à la main par des coopératives de femmes.
            </p>
            <p>
              Chaque produit est un hommage à cette origine. Nous ne créons pas seulement des soins pour la peau ; nous créons des ponts entre les cultures, en respectant la biodiversité et en valorisant le savoir-faire des mains qui nous nourrissent.
            </p>
          </div>
        </div>
      </section>

      {/* Les Ingrédients - Focus Karité */}
      <section className="py-24 bg-[#F7F3F0]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="aspect-[3/4] bg-white shadow-2xl overflow-hidden relative group">
               <div className="absolute inset-0 flex items-center justify-center text-gray-300 italic p-12 text-center">
                 [Image macro de beurre de karité brut et pur]
               </div>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <h3 className="text-3xl font-serif italic">L'Or Blanc du Sahel</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Notre beurre de karité est extrait selon des méthodes traditionnelles qui préservent ses vitamines A, E et F. Non raffiné et biologique, il constitue la base de nos formules pour offrir une hydratation profonde et une protection naturelle inégalée.
            </p>
            <ul className="space-y-4">
              {['Pressé à froid', 'Commerce équitable', '100% Biologique', 'Cruelty Free'].map((item) => (
                <li key={item} className="flex items-center gap-4 text-[10px] tracking-widest uppercase text-gray-500">
                  <span className="w-8 h-px bg-gray-300"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Engagement Social */}
      <section className="py-24 md:py-40 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold">Notre Impact</h2>
          <h3 className="text-4xl font-serif italic">Plus qu'une marque, une communauté.</h3>
          <p className="text-gray-600 font-light leading-relaxed">
            En collaborant directement avec les groupements de productrices au Burkina Faso, nous garantissons un revenu juste et finançons des projets d'éducation et de santé locale. Votre rituel de beauté soutient l'autonomie de centaines de familles.
          </p>
          <button className="mt-8 px-8 py-4 border border-black text-[10px] tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all duration-500">
            Découvrir nos engagements
          </button>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative h-[60vh] flex items-center justify-center bg-black">
        <div className="text-center text-white px-6">
          <h2 className="text-3xl md:text-5xl font-serif italic mb-8">Rejoignez le voyage.</h2>
          <a href="/" className="text-[10px] tracking-[0.5em] uppercase border-b border-white pb-2 hover:opacity-50 transition-opacity">
            Retour à la boutique
          </a>
        </div>
      </section>

    </main>
  );
};

export default AboutPage;