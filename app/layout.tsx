import React from 'react';
import "./globals.css";
import Header from "@/components/ui/navbar";

export const metadata = {
  title: 'Confidence | Beauté Pure & Éclat Cristallin',
  description: 'L\'art du soin minimaliste rencontrant l\'élégance du quartz rose. Basé à Paris — Grasse.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@200;300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased text-stone-800 selection:bg-rose-100 selection:text-rose-900 overflow-x-hidden bg-[#FAF7F7]">
        
        {/* Navigation fixe au sommet */}
        <Header />

        {/* Wrapper Principal : 
            - min-h-screen : force le contenu à prendre toute la hauteur
            - pt-24 : crée l'espace nécessaire pour ne pas que le contenu soit caché sous la Navbar
            - flex flex-col : aide à pousser le footer en bas si la page est vide
        */}
        <div className="relative min-h-screen flex flex-col">
          <main className="flex-grow pt-24 md:pt-32">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white py-24 px-8 border-t border-rose-50">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
              <div className="col-span-1 md:col-span-2 space-y-6">
                <span className="text-3xl font-serif italic text-stone-900 block lowercase">confidence</span>
                <p className="text-stone-400 font-light text-sm max-w-xs leading-relaxed">
                  Sublimer la peau par la science botanique, élever l'esprit par le rituel minimaliste. 
                  <br /><span className="text-rose-300">Paris — Grasse.</span>
                </p>
              </div>
              
              <div>
                <h4 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-8 text-stone-900">Maison</h4>
                <ul className="space-y-4 text-xs font-light text-stone-500">
                  <li><a href="#" className="hover:text-rose-400 transition-colors">Notre Manifeste</a></li>
                  <li><a href="#" className="hover:text-rose-400 transition-colors">Laboratoire</a></li>
                  <li><a href="#" className="hover:text-rose-400 transition-colors">Journal confidentiel</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-8 text-stone-900">Aide</h4>
                <ul className="space-y-4 text-xs font-light text-stone-500">
                  <li><a href="#" className="hover:text-rose-400 transition-colors">Livraison & Retours</a></li>
                  <li><a href="#" className="hover:text-rose-400 transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-rose-400 transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>

            <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-rose-50 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] tracking-[0.2em] text-stone-400 uppercase font-medium">
              <p>© 2024 Confidence. Pureté Absolue.</p>
              <div className="flex gap-12">
                <a href="#" className="hover:text-stone-900 transition-colors">Mentions Légales</a>
                <a href="#" className="hover:text-stone-900 transition-colors">Confidentialité</a>
                <a href="#" className="hover:text-stone-900 transition-colors">Instagram</a>
              </div>
            </div>
          </footer>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --font-serif: 'Playfair Display', serif;
            --font-sans: 'Inter', sans-serif;
          }
          body { font-family: var(--font-sans); margin: 0; padding: 0; background-color: #FAF7F7; }
          h1, h2, h3, h4, .font-serif { font-family: var(--font-serif); }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #F9F3F2; }
          ::-webkit-scrollbar-thumb { background: #F2E3E1; border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #E8D1CF; }
          .page-fade-in { animation: fadeIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}} />
      </body>
    </html>
  );
}