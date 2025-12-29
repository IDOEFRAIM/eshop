"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { PlusCircle } from 'lucide-react';
import AdminNavbar from '@/components/ui/adminNavbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // 1. Synchronisation de l'onglet actif avec l'URL réelle
  const [activeTab, setActiveTab] = useState('adminProducts');

  useEffect(() => {
    if (pathname.includes('categories')) setActiveTab('categories');
    else if (pathname.includes('adminProducts')) setActiveTab('adminProducts');
  }, [pathname]);

  // 2. Fonction pour changer de page lors du clic dans la Navbar
  const handleTabChange = (id: string) => {
    setActiveTab(id);
    if (id === 'adminProducts') router.push('/adminProducts');
    if (id === 'categories') router.push('/categories');
  };

  return (
    <div className="flex min-h-screen bg-confidence-beige text-confidence-black font-sans selection:bg-confidence-gold/20">
      
      {/* SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 w-72 bg-white border-r border-confidence-gold/10 flex flex-col z-50">
        {/* PASSAGE DES PROPS OBLIGATOIRES */}
        <AdminNavbar activeTab={activeTab} setActiveTab={handleTabChange} />
      </aside>

      {/* ZONE DE CONTENU */}
      <main className="flex-1 ml-72">
        <header className="h-24 bg-white/60 backdrop-blur-xl border-b border-confidence-gold/10 sticky top-0 z-40 px-12 flex items-center justify-between">
          <nav className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
            <span className="text-confidence-gold/50">Studio</span>
            <span className="text-confidence-gold/20">/</span>
            <span className="text-confidence-black uppercase">
              {activeTab === 'categories' ? 'Categories' : 'Produits'}
            </span>
          </nav>

          <div className="flex items-center gap-6">
             <Link 
               href="/adminProducts/new" 
               className="bg-confidence-black text-black px-8 py-3.5 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-confidence-terracotta transition-all flex items-center gap-3 shadow-lg"
             >
               <PlusCircle size={14} />
               Nouveau
             </Link>
             <div className="w-10 h-10 rounded-full bg-confidence-gold/10 border border-confidence-gold/20 flex items-center justify-center text-confidence-gold font-serif italic font-bold">
               A
             </div>
          </div>
        </header>

        {/* Animation de transition pour le contenu */}
        <div className="p-12">
          {children}
        </div>
      </main>
    </div>
  );
}