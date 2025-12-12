'use client'

import { useState, useEffect } from 'react'
import {
  Camera,
  Sparkles,
  Smile,
  Droplets,
  ChevronRight,
  Fingerprint,
  Scan,
  Unlock,
  Box,
  Shirt
} from 'lucide-react'

import AmiraHome from '@/components/home'

const Page = () => {
  const [phase, setPhase] = useState<'boot' | 'auth' | 'scanning' | 'success' | 'app'>('boot')
  const [scanProgress, setScanProgress] = useState(0)

  // Navigation interne
  const [currentView, setCurrentView] = useState('hub')
  const [activeCategory, setActiveCategory] = useState('Pour Vous')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)

  // États UI
  const [viewMode, setViewMode] = useState('grid')
  const [ecoFilter, setEcoFilter] = useState(85)
  const [rotation, setRotation] = useState(0)
  const [explodedView, setExplodedView] = useState(false)
  const [incognitoMode, setIncognitoMode] = useState(false)

  // Try-On (VTO)
  const [isVtoActive, setIsVtoActive] = useState(false)

  const startAuth = () => setPhase('scanning')

  // IA Profil
  const [aiBoldness, setAiBoldness] = useState(75)
  const [aiSkinMatch, setAiSkinMatch] = useState(90)
  const [activeStyleZones, setActiveStyleZones] = useState(['Glamour', 'Avant-Garde'])

  // --- SEQUENCES DE DEMARRAGE ---
  useEffect(() => {
    if (phase === 'boot') {
      const timer = setTimeout(() => setPhase('auth'), 2500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setPhase('success')
            return 100
          }
          return prev + 2
        })
      }, 30)
      return () => clearInterval(interval)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'success') {
      const timer = setTimeout(() => setPhase('app'), 1500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  // --- RENDU GLOBAL ---
  if (phase === 'app') {
    return (
      <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden selection:bg-pink-500 selection:text-white">
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,_#310028_0%,_#000000_80%)] pointer-events-none" />

        {/* Header */}
        <header className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-white/5">
          <div
            className="font-bold text-lg tracking-widest flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentView('hub')}
          >
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" /> AMIRA
          </div>
        </header>

        {/* Contenu */}
        <main className="relative z-10 pt-24 px-4 pb-24 max-w-xl mx-auto">
          <AmiraHome />
        </main>
      </div>
    )
  }

  // --- INTRO SCREEN ---
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3b0764_0%,_#000000_100%)] opacity-50" />
      <div className="absolute w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div
          className={`transition-all duration-1000 ${
            phase === 'boot' ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          } mb-8`}
        >
          <div className="text-5xl font-bold tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse">
            AMIRA
          </div>
          <p className="text-xs text-gray-500 tracking-[0.5em] mt-2 text-center uppercase">
            Future Fashion & Beauty
          </p>
        </div>

        {/* Auth */}
        {phase === 'auth' && (
          <button
            onClick={startAuth}
            className="group relative px-8 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md hover:bg-pink-500/10 hover:border-pink-500/50 transition-all duration-500 w-64"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Fingerprint className="text-pink-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Bienvenue dans mon univers</div>
                  <div className="text-sm font-bold">Voir mes produits</div>
                </div>
              </div>
              <ChevronRight className="text-gray-600 group-hover:text-white transition-colors" />
            </div>
          </button>
        )}

        {/* Scanning */}
        {phase === 'scanning' && (
          <div className="w-64 h-64 relative">
            <div className="absolute inset-0 border border-pink-500/30 rounded-full animate-spin" />
            <div className="absolute inset-4 border border-purple-500/30 rounded-full animate-spin" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Scan size={48} className="text-pink-500 animate-pulse mb-2" />
              <span className="text-xs font-mono text-pink-400">{scanProgress}%</span>
            </div>
          </div>
        )}

        {/* Success */}
        {phase === 'success' && (
          <div className="animate-bounce">
            <Unlock size={48} className="text-green-400" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Page