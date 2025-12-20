import React, { useState, useRef } from 'react';

/**
 * COMPOSANTS UI INTERNES (Consolidés pour la prévisualisation dans le Canvas)
 * Dans un projet réel, ces composants sont importés de ../ui/index
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

const Badge = ({ children, className = '' }) => (
  <span className={`text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 border border-neutral-100 text-neutral-400 font-bold inline-block bg-white/80 backdrop-blur-sm ${className}`}>
    {children}
  </span>
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-10 py-4 text-[10px] uppercase tracking-[0.25em] transition-all duration-700 ease-in-out font-semibold relative overflow-hidden group";
  const variants = {
    ghost: "bg-transparent text-black p-0 hover:opacity-50 tracking-[0.15em]"
  };
  return <button className={`${baseStyles} ${variants[variant] || ""} ${className}`} {...props}>{children}</button>;
};

/**
 * COMPOSANTS PRODUIT
 */
export const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="group cursor-pointer w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden mb-6">
        <img
          src={product.mainImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            isHovered && product.hoverVideo ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {product.hoverVideo && (
          <video
            ref={videoRef}
            src={product.hoverVideo}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        {product.isNew && (
          <div className="absolute top-4 left-4">
            <Badge>Nouveau</Badge>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <Heading level={3} className="text-sm md:text-base">{product.name}</Heading>
          <Text variant="body" className="font-medium">{product.price}€</Text>
        </div>
        <Text variant="caption" className="text-neutral-400">{product.category}</Text>
      </div>
      <div className="mt-4 overflow-hidden h-0 group-hover:h-12 transition-all duration-500 ease-in-out hidden md:block">
        <Button variant="ghost" className="w-full border-b border-black py-2">
          Ajout Rapide
        </Button>
      </div>
    </div>
  );
};

export const ProductGallery = ({ images }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      <div className="flex md:flex-col gap-4 overflow-x-auto md:w-20">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`flex-shrink-0 w-16 md:w-full aspect-[4/5] bg-neutral-50 transition-all ${
              activeTab === idx ? 'border border-black' : 'opacity-60'
            }`}
          >
            <img src={img} alt={`Vue ${idx}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      <div className="flex-grow aspect-[4/5] bg-neutral-50 font-sans">
        <img 
          src={images[activeTab]} 
          alt="Vue principale" 
          className="w-full h-full object-cover" 
        />
      </div>
    </div>
  );
};

/**
 * APERÇU POUR LE CANVAS
 */
export default function App() {
  const mockProduct = {
    id: "1",
    name: "Rose de Sable - Gloss",
    price: 24,
    category: "Lèvres / Teintée",
    mainImage: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&q=80&w=800",
    hoverVideo: "https://v.ftcdn.net/05/17/74/43/700_F_517744383_m4pY6oK5p3B9Xo6S8PqA1z2BvX6M9V3N_ST.mp4",
    isNew: true
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 flex flex-col items-center">
      <Heading level={2} className="mb-12">Catalogue</Heading>
      <div className="max-w-sm w-full">
        <ProductCard product={mockProduct} />
      </div>
    </div>
  );
}