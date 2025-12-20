import React from 'react';

// 1. TYPOGRAPHIE : HEADING
export const Heading = ({ children, level = 2, className = '' }) => {
  const Tag = `h${level}`;
  const styles = {
    1: "text-4xl md:text-7xl font-serif tracking-tight leading-[1.1] text-neutral-900",
    2: "text-2xl md:text-4xl font-serif tracking-tight text-neutral-800",
    3: "text-lg md:text-xl font-serif text-neutral-800 uppercase tracking-wide",
  };
  return <Tag className={`${styles[level]} ${className}`}>{children}</Tag>;
};

// 2. TYPOGRAPHIE : TEXTE
export const Text = ({ children, className = '', variant = 'body' }) => {
  const styles = {
    body: "text-sm md:text-base text-neutral-600 leading-relaxed font-sans",
    caption: "text-[10px] md:text-xs uppercase tracking-[0.3em] text-neutral-400 font-medium",
  };
  return <p className={`${styles[variant]} ${className}`}>{children}</p>;
};

// 3. BADGE
export const Badge = ({ children, className = '' }) => (
  <span className={`text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 border border-neutral-100 text-neutral-400 font-bold inline-block bg-white/80 backdrop-blur-sm ${className}`}>
    {children}
  </span>
);

// 4. BOUTON
export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-10 py-4 text-[10px] uppercase tracking-[0.25em] transition-all duration-700 ease-in-out font-semibold relative overflow-hidden group";
  const variants = {
    primary: "bg-black text-white hover:bg-neutral-900 border border-black",
    secondary: "bg-transparent text-black border border-black hover:bg-black hover:text-white",
    ghost: "bg-transparent text-black p-0 hover:opacity-50 tracking-[0.15em]"
  };
  return <button className={`${baseStyles} ${variants[variant] || ""} ${className}`} {...props}>{children}</button>;
};