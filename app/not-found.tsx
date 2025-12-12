import Link from "next/link";

export default function NotFound() {
  return (
    // PAS DE <html lang="..."> NI DE <body> ICI
    // On commence directement par le conteneur principal
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        
        {/* Fond Grille "Erreur" (Rouge subtil) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ff0000_1px,transparent_1px),linear-gradient(to_bottom,#ff0000_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-10">
            
            {/* Code Erreur Géant */}
            <div className="relative">
                <h1 className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-gray-200 dark:text-neutral-800 select-none">
                    404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-red-500/10 text-red-600 dark:text-red-500 border border-red-500/20 px-4 py-2 rounded backdrop-blur-sm animate-pulse font-mono font-bold">
                        ⚠️ SYSTEM_FAILURE
                    </div>
                </div>
            </div>

            {/* Message */}
            <h2 className="text-2xl md:text-3xl font-bold mt-8 uppercase tracking-tight text-slate-900 dark:text-white">
                Page Not Found
            </h2>
            <p className="text-gray-500 mt-4 max-w-md mx-auto leading-relaxed font-mono text-sm">
                The coordinates you are trying to access do not exist in this sector.
            </p>

            {/* Code Terminal Décoratif */}
            <div className="my-8 p-4 bg-gray-50 dark:bg-neutral-900/50 rounded border border-gray-200 dark:border-white/5 text-xs text-left max-w-xs mx-auto font-mono opacity-70">
                <p className="text-gray-400">{`> err_code: 0x0000404`}</p>
                <p className="text-gray-400">{`> status: MISSING_LINK`}</p>
                <p className="text-gray-400">{`> action: RETURN_ROOT`}</p>
                <span className="animate-pulse text-red-500">_</span>
            </div>

            {/* Bouton Retour */}
            <Link 
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg rounded-none"
            >
                <span>Return to Base</span>
            </Link>

        </div>
    </div>
  );
}