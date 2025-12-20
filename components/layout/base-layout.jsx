import React, { useState, useEffect } from 'react';

/**
 * COMPOSANTS UI LOCAUX (Pour la prévisualisation)
 */
const Heading = ({ children, level = 2, className = '' }) => {
  const Tag = `h${level}`;
  const styles = {
    1: "text-4xl md:text-7xl font-serif tracking-tight leading-[1.1] text-neutral-900",
    2: "text-2xl md:text-4xl font-serif tracking-tight text-neutral-800",
    3: "text-lg md:text-xl font-serif text-neutral-800 uppercase tracking-wide",
  };
  return <Tag className={`${styles[level]} ${className}`}>{children}</Tag>;
};

const Text = ({ children, className = '', variant = 'body' }) => {
  const styles = {
    body: "text-sm md:text-base text-neutral-600 leading-relaxed font-sans",
    caption: "text-[10px] md:text-xs uppercase tracking-[0.3em] text-neutral-400 font-medium",
  };
  return <p className={`${styles[variant]} ${className}`}>{children}</p>;
};

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-10 py-4 text-[10px] uppercase tracking-[0.25em] transition-all duration-700 ease-in-out font-semibold relative overflow-hidden group";
  const variants = {
    primary: "bg-black text-white hover:bg-neutral-900 border border-black",
    secondary: "bg-transparent text-black border border-black hover:bg-black hover:text-white",
  };
  return <button className={`${baseStyles} ${variants[variant] || ""} ${className}`} {...props}>{children}</button>;
};

/**
 * COMPOSANT CART (Side-Drawer)
 */
export const CartDrawer = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full w-full md:w-[450px] bg-white z-[70] shadow-2xl transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full p-8 md:p-12">
          <div className="flex justify-between items-center mb-12">
            <Heading level={3}>Votre Panier</Heading>
            <button onClick={onClose} className="text-[10px] uppercase tracking-widest hover:opacity-50">Fermer</button>
          </div>

          {/* Liste des produits (Vide pour la démo) */}
          <div className="flex-grow flex flex-col items-center justify-center space-y-4">
            <Text className="italic text-neutral-400">Votre panier est actuellement vide.</Text>
            <Button variant="secondary" onClick={onClose}>Continuer vos achats</Button>
          </div>

          {/* Footer du panier */}
          <div className="border-t border-neutral-100 pt-8 space-y-6">
            <div className="flex justify-between items-center">
              <Text variant="caption">Sous-total</Text>
              <Text className="font-bold">0,00 €</Text>
            </div>
            <Button className="w-full">Procéder au paiement</Button>
            <Text variant="caption" className="text-center block text-[8px]">
              Expédition calculée à l'étape suivante.
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * COMPOSANTS DE STRUCTURE
 */

export const Navbar = ({ onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-6 flex justify-between items-center ${
      isScrolled ? 'bg-white/80 backdrop-blur-md py-4 border-b border-neutral-100' : 'bg-transparent'
    }`}>
      <div className="text-[14px] font-serif tracking-[0.3em] uppercase cursor-pointer text-black">
        Confidence
      </div>
      
      <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.2em] text-black">
        <a href="#" className="hover:opacity-50 transition-opacity">Collections</a>
        <a href="#" className="hover:opacity-50 transition-opacity">À Propos</a>
        <a href="#" className="hover:opacity-50 transition-opacity">Contact</a>
      </div>

      <div className="flex gap-6 text-[10px] uppercase tracking-[0.2em] text-black">
        <button onClick={onOpenCart} className="hover:opacity-50 transition-opacity font-bold">Panier (0)</button>
      </div>
    </nav>
  );
};

export const Footer = () => (
  <footer className="bg-neutral-50 pt-24 pb-12 px-6 md:px-12 border-t border-neutral-100">
    <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
      <Heading level={2} className="mb-8 opacity-20 font-serif">Confidence</Heading>
      
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-12 mb-20 text-left">
        <div className="space-y-4">
          <Text variant="caption">Navigation</Text>
          <ul className="space-y-2 text-sm font-sans">
            <li><a href="#" className="hover:underline">Lèvres</a></li>
            <li><a href="#" className="hover:underline">Teint</a></li>
            <li><a href="#" className="hover:underline">Accessoires</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <Text variant="caption">Aide</Text>
          <ul className="space-y-2 text-sm font-sans">
            <li><a href="#" className="hover:underline">Livraison</a></li>
            <li><a href="#" className="hover:underline">Retours</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
          </ul>
        </div>
        <div className="space-y-4 text-right hidden md:block">
          <Text variant="caption">Newsletter</Text>
          <div className="border-b border-neutral-300 py-2">
            <input type="text" placeholder="Votre email" className="bg-transparent text-sm focus:outline-none w-full font-sans" />
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-neutral-200 w-full flex flex-col md:flex-row justify-between items-center gap-6">
        <Text variant="caption" className="text-black font-bold">
          Créé au Burkina Faso. Pensé pour le monde.
        </Text>
        <Text variant="caption" className="text-[8px]">
          &copy; 2024 Confidence Beauty. Tous droits réservés.
        </Text>
      </div>
    </div>
  </footer>
);

/**
 * APERÇU POUR L'ENVIRONNEMENT DE TEST
 */
const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      <main className="h-[80vh] flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <Text variant="caption" className="mb-4">Démonstration du Panier</Text>
          <Heading level={1}>Expérience Fluide</Heading>
          <Button variant="secondary" className="mt-8" onClick={() => setIsCartOpen(true)}>
            Ouvrir le Panier
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;