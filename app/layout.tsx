// PAS de 'use client' ici
import React from 'react';
import "./globals.css";
import Header from "@/components/ui/navbar";
import Providers from "@/providers/QueryProviders"; 

// Désormais, ceci fonctionne parfaitement pour le SEO
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
        
        {/* Providers est un Client Component, mais il peut envelopper des Server Components */}
        <Providers>
          <Header />

          <div className="relative min-h-screen flex flex-col">
            <main className="flex-grow pt-24 md:pt-32">
              {children}
            </main>

            {/* Ton Footer statique reste un Server Component pour une performance optimale */}
            <footer className="bg-white py-24 px-8 border-t border-rose-50">
              {/* ... contenu du footer ... */}
            </footer>
          </div>
        </Providers>

        {/* Le style global reste ici */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --font-serif: 'Playfair Display', serif;
            --font-sans: 'Inter', sans-serif;
          }
          /* ... reste de tes styles ... */
        `}} />
      </body>
    </html>
  );
}