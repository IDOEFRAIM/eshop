export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black transition-colors duration-300">
      
      {/* Petite grille de fond subtile */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        
        {/* Cercle pulsant (Couleur Primary) */}
        <div className="relative h-16 w-16">
           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-20"></span>
           <div className="relative inline-flex rounded-full h-16 w-16 border-2 border-primary/30 border-t-primary animate-spin"></div>
        </div>

        {/* Texte Technique */}
        <div className="text-center">
           <p className="text-xs font-mono font-bold text-slate-900 dark:text-white tracking-[0.3em] uppercase animate-pulse">
             System_Loading
           </p>
           <p className="text-[10px] font-mono text-gray-400 mt-2">
             Fetching data packets...
           </p>
        </div>

        {/* Barre de progression décorative */}
        <div className="w-48 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-primary w-1/2 animate-[shimmer_1s_infinite]"></div>
        </div>

      </div>
    </div>
  );
}