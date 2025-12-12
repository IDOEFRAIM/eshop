import { Zap, Layers, Activity, LucideIcon } from "lucide-react";
import React from "react";

<<<<<<< HEAD
// --- INTERFACES TYPESCRIPT ---

// 1. Définir le type pour une caractéristique de produit
export interface ProductFeature {
    label: string;
    value: string;
    // Le type icon est un React.ReactNode car il contient un composant Lucide (JSX)
    icon: React.ReactNode; 
}

// 2. Définir le type pour une nuance de couleur/teinte
=======

export interface ProductFeature {
    label: string;
    value: string;
    icon: React.ReactNode; 
}

>>>>>>> master
export interface ProductShade {
    name: string;
    hex: string;
}

<<<<<<< HEAD
// 3. Définir la structure de base d'un produit
=======
>>>>>>> master
export interface Product {
    id: string;
    category: string;
    title: string;
    price: number;
    description: string;
    rating: number;
    reviews: number;
    features: ProductFeature[];
    shades: ProductShade[];
    images: string[];
}

<<<<<<< HEAD
// 4. Définir la structure globale de l'objet "products" avec des clés spécifiques
=======
>>>>>>> master
export interface ProductData {
    levre: Product[];
    visage: Product[];
    complet: Product[];
}

<<<<<<< HEAD
// --- CATALOGUE DE DONNÉES ---

/**
 * Catalogue de produits de beauté.
 * Les catégories principales (levre, visage, complet) contiennent une liste d'articles.
 */
export const products: ProductData = { // Application du type ProductData à l'objet réel
=======

export const products: ProductData = {
>>>>>>> master
    levre: [
        {
            id: 'lev-001',
            category: 'Lèvres',
            title: "Fat Oil Gloss Hydratant (Victoria Spirit)",
            price: 45,
            description:
                "L'Huile-Gloss qui fait le buzz ! Dites adieu aux lèvres sèches. Ce gloss à la texture non collante enveloppe vos lèvres d'une brillance miroir et d'une hydratation intense qui dure des heures. Sa formule riche nourrit en profondeur tout en donnant un effet pulpeux et juteux irrésistible. Le combo parfait entre soin et finition spectaculaire.",
            rating: 4.8,
            reviews: 128,
            features: [
                { label: "Tenue", value: "12 Heures", icon: <Zap size={14} /> },
                { label: "Texture", value: "Huile-Gel", icon: <Layers size={14} /> },
                { label: "Actif", value: "Bio-Luminescent", icon: <Activity size={14} /> },
            ],
            shades: [
                { name: "Cyber Pink", hex: "#ec4899" },
                { name: "Electric Blue", hex: "#3b82f6" },
                { name: "Plasma Purple", hex: "#a855f7" },
            ],
            images: [
                "/images/gloss_hydratant_rose.jpeg",
                "/images/gloss_hydratant_rose_back.jpeg",
            ],
        },
        {
            id: 'lev-002',
            category: 'Lèvres',
            title: 'Brosse exfoliante pour lèvres',
            price: 39,
            description: "Outil essentiel pour des lèvres lisses. Cette brosse exfoliante douce élimine délicatement les peaux mortes et les gerçures, préparant idéalement vos lèvres à recevoir baume ou rouge à lèvres. Elle stimule également la circulation pour un effet naturellement plus rosé et revitalisé.",
            rating: 4.6,
            reviews: 98,
            features: [
                { label: "Action", value: "Exfoliation douce", icon: <Zap size={14} /> },
                { label: "Texture", value: "Silicone/Fibres douces", icon: <Layers size={14} /> },
                { label: "Avantage", value: "Prépare au maquillage", icon: <Activity size={14} /> },
            ],
            shades: [
                { name: "Pink Nova", hex: "#ff4da6" },
                { name: "Blue Pulse", hex: "#4da6ff" },
                { name: "Violet Beam", hex: "#b84dff" },
            ],
            images: [
                "/images/brosse_exfoliant.jpeg",
                "/images/brosse_exfoliant_showcase.jpeg"
            ],
        },
        {
            id: 'lev-003',
            category: 'Lèvres',
            title: 'Masque de Nuit Réparateur (Baume Intensif)',
            price: 52,
            description: "💤 Réveillez-vous avec des Lèvres de Bébé ! Ce masque de nuit réparateur est la solution ultime contre la sécheresse. Sa formule riche agit pendant votre sommeil pour régénérer intensément la peau des lèvres. Adieu les peaux mortes et les fissures ! Bonjour aux lèvres ultra-douces, lisses et prêtes à accueillir votre rouge à lèvres.",
            rating: 4.9,
            reviews: 210,
            features: [
                { label: "Durée", value: "14 Heures", icon: <Zap size={14} /> },
                { label: "Texture", value: "Huile riche", icon: <Layers size={14} /> },
                { label: "Actif", value: "Quantum Glow", icon: <Activity size={14} /> },
            ],
            shades: [
                { name: "Solar Pink", hex: "#ff6fae" },
                { name: "Lunar Blue", hex: "#6faeff" },
                { name: "Nebula Purple", hex: "#ae6fff" },
            ],
            images: [
                "/images/baume_levre_rose.jpeg",
                "/images/gloss_rose.jpeg"
            ],
        },
        {
            id: 'lev-004',
            category: 'Lèvres',
            title: 'Neon Serum V.2 (Gloss Hydratant)',
            price: 45,
            description:
                "Gloss Hydratant V.2. Dites adieu aux lèvres sèches ! Ce gloss à la texture non collante enveloppe vos lèvres d'une brillance miroir et d'une hydratation intense qui dure des heures. Sa formule riche nourrit en profondeur tout en donnant un effet pulpeux et juteux irrésistible. Le combo parfait entre soin et finition spectaculaire.",
            rating: 4.8,
            reviews: 128,
            features: [
                { label: "Tenue", value: "12 Heures", icon: <Zap size={14} /> },
                { label: "Texture", value: "Huile-Gel", icon: <Layers size={14} /> },
                { label: "Actif", value: "Bio-Luminescent", icon: <Activity size={14} /> },
            ],
            shades: [
                { name: "Cyber Pink", hex: "#ec4899" },
                { name: "Electric Blue", hex: "#3b82f6" },
                { name: "Plasma Purple", hex: "#a855f7" },
            ],
            images: [
                "/images/gloss_hydratant.jpeg",
                "/images/gloss_parfum.jpeg",
            ],
        },
        {
            id: 'lev-005',
            category: 'Lèvres',
            title: 'Gloss Glace Croquée (Ultra-Mignon)',
            price: 45,
            description:
                "🍦 Un Délice Glacé pour une Hydratation Gourmande! Le gloss le plus mignon et le plus hydratant. Sa forme ludique de glace croquée cache une formule ultra-hydratante qui fond sur vos lèvres pour un fini brillant et frais. Il nourrit en profondeur sans coller et apporte une touche d'originalité. Craquez pour ce soin fun et efficace.",
            rating: 4.8,
            reviews: 128,
            features: [
                { label: "Tenue", value: "12 Heures", icon: <Zap size={14} /> },
                { label: "Texture", value: "Huile-Gel", icon: <Layers size={14} /> },
                { label: "Actif", value: "Bio-Luminescent", icon: <Activity size={14} /> },
            ],
            shades: [
                { name: "Cyber Pink", hex: "#ec4899" },
                { name: "Electric Blue", hex: "#3b82f6" },
                { name: "Plasma Purple", hex: "#a855f7" },
            ],
            images: [
                "/images/gloss_glass_croque.jpeg",
            ],
        },
        {
            id: 'lev-006',
            category: 'Lèvres',
            title: 'Gloss Repulpant (Kiss Beauty)',
            price: 45,
            description: "💋 Volume Instantané. Pour des lèvres visiblement plus charnues et audacieuses en quelques secondes ! Ce gloss innovant utilise une légère sensation de picotement pour maximiser le volume naturel de vos lèvres. Non seulement il apporte une brillance éclatante, mais il lisse également les ridules pour une bouche parfaitement définie. Préparez-vous à recevoir des compliments.",
            rating: 4.8,
            reviews: 128,
            features: [
                { label: "Tenue", value: "12 Heures", icon: <Zap size={14} /> },
                { label: "Texture", value: "Huile-Gel", icon: <Layers size={14} /> },
                { label: "Actif", value: "Effet Plumping", icon: <Activity size={14} /> },
            ],
            shades: [
                { name: "Cyber Pink", hex: "#ec4899" },
                { name: "Electric Blue", hex: "#3b82f6" },
                { name: "Plasma Purple", hex: "#a855f7" },
            ],
            images: [
                "/images/gloss_repulpant.jpeg",
            ],
        },
        {
            id: 'lev-007',
            category: 'Lèvres',
            title: 'Crème pour rosir les lèvres',
            price: 45,
            description: "🛡️ Le Bouclier Anti-Froid pour Vos Lèvres. Ne laissez plus le vent et le froid abîmer votre sourire. Cette crème (ou baume) est formulée pour réparer immédiatement et protéger intensément les lèvres gercées ou abîmées. Sa texture riche crée une barrière protectrice durable, apaisant les irritations et restaurant le confort. Lèvres douces et saines garanties.",
            rating: 4.8,
            reviews: 128,
            features: [
                { label: "Effet", value: "Rosissement Naturel", icon: <Zap size={14} /> },
                { label: "Texture", value: "Baume Crème", icon: <Layers size={14} /> },
                { label: "Actif", value: "Réparateur", icon: <Activity size={14} /> },
            ],
            shades: [
                { name: "Cyber Pink", hex: "#ec4899" },
                { name: "Electric Blue", hex: "#3b82f6" },
                { name: "Plasma Purple", hex: "#a855f7" },
            ],
            images: [
                "/images/creme_levre_rosir.jpeg",
            ],
        },
    ],

    visage: [
        {
            id: 'vis-001',
            category: 'Visage',
            title: 'Anti-cernes illuminateur',
            price: 49,
            description:
                "⚡ Le Réveil Express pour Vos Yeux Fatigués. Effacez les traces de fatigue en un instant ! Cet anti-cernes/ces patchs hydrogels sont infusés d'actifs puissants pour dégonfler les poches et éclaircir visiblement les cernes. En 10 minutes, le contour de l'œil est hydraté, lissé, et votre regard retrouve toute sa fraîcheur et sa vitalité. Le secret des matins pressés.",
            rating: 4.9,
            reviews: 189,
            features: [
                { label: "Effet", value: "Glow Progressif", icon: <Zap size={14} /> },
                { label: "Texture", value: "Liquide/Patchs", icon: <Layers size={14} /> },
                { label: "Actif", value: "Thermo-Lumineux", icon: <Activity size={14} /> },
            ],
            shades: [
                { name: "Stellar Gold", hex: "#fcd34d" },
                { name: "Moon Silver", hex: "#e5e7eb" },
                { name: "Rose Comet", hex: "#f9a8d4" },
            ],
            images: [
                "/images/cerne.jpeg",
                "/images/cerne2.jpeg",
            ],
        },
    ],

    complet: [
        {
            id: 'cmp-001',
            category: 'Complet',
            title: 'Masque de visage purifiant',
            price: 68,
            description:
                "🧖‍♀️ 15 Minutes pour une Peau Zéro Défaut. Transformez votre routine avec notre masque de visage ciblé. Il agit rapidement pour purifier, hydrater en profondeur ou illuminer. Réduisez les imperfections, atténuez la fatigue et retrouvez un grain de peau affiné et un teint éclatant de santé. Le coup de boost que votre peau attendait.",
            rating: 4.7,
            reviews: 154,
            features: [
                { label: "Effet", value: "Lissant", icon: <Zap size={14} /> },
                { label: "Texture", value: "Sérum Fluide", icon: <Layers size={14} /> },
                { label: "Actif", value: "Photo-Adaptatif", icon: <Activity size={14} /> },
            ],
            shades: [
                { name: "Opal Glow", hex: "#f3e8ff" },
                { name: "Soft Gold", hex: "#facc15" },
                { name: "Rose Aura", hex: "#f9a8d4" },
            ],
            images: [
                "/images/maskvisageone.jpeg",
                "/images/maskvisageall.jpeg",
            ],
        },
        {
            id: 'cmp-002',
            category: 'Complet',
            title: 'Kit d\'Accessoires Skincare (Bandeau et Pinces)',
            price: 55,
            description:
                "🎀 Le Kit Indispensable de la Reine du Skincare. Maximisez l'efficacité de vos soins avec l'ensemble d'accessoires parfait ! Le bandeau doux maintient vos cheveux loin du visage pendant l'application de masques, et les pinces pratiques vous aident à créer des coiffures d'appoint. Un kit aussi mignon que fonctionnel qui rend votre routine skin care plus agréable et organisée.",
            rating: 4.5,
            reviews: 112,
            features: [
                { label: "Type", value: "Accessoires", icon: <Zap size={14} /> },
                { label: "Utilisation", value: "Skincare", icon: <Layers size={14} /> },
                { label: "Contenu", value: "Bandeau + Pinces", icon: <Activity size={14} /> },
            ],
            shades: [
                { name: "Clear Light", hex: "#ffffff" },
                { name: "Soft Peach", hex: "#fed7aa" },
                { name: "Neutral Glow", hex: "#fef3c7" },
            ],
            images: [
                "/images/kitchouchou1.jpeg",
                "/images/kitchouchou2.jpeg",
                "/images/kitchouchou3.jpeg",
                "/images/kitchouchou4.jpeg",
            ],
        },
        {
            id: 'cmp-003',
            category: 'Complet',
            title: 'Rouleau de jade anti-âge',
            price: 120,
            description:
                "✨ Le Secret d'un Teint Lumineux et Ferme! Offrez-vous un lifting naturel et un moment de détente ultime. Ce Rouleau de Jade authentique stimule la circulation, aide à la pénétration de vos sérums et réduit visiblement les poches et les gonflements. Utilisé froid, il resserre les pores pour une peau apaisée et un éclat immédiat. C'est le geste quotidien indispensable pour une peau zen et revitalisée.",
            rating: 4.8,
            reviews: 240,
            features: [
                { label: "Effet", value: "Lifting Naturel", icon: <Zap size={14} /> },
                { label: "Texture", value: "Pierre de Jade", icon: <Layers size={14} /> },
                { label: "Actif", value: "Dégonflant", icon: <Activity size={14} /> },
            ],
            shades: [
                { name: "UV Pink", hex: "#ff4da6" },
                { name: "UV Blue", hex: "#4da6ff" },
                { name: "UV Violet", hex: "#b84dff" },
            ],
            images: [
                "/images/rouleau_de_jade.jpeg",
                "/images/kit2.jpeg",
                "/images/kit3.jpeg",
            ],
        },
    ],
};