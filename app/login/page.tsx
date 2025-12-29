'use client'
import React, { useState, useEffect } from "react";
import { account, ID } from "@/lib/appwrite";
import { LogIn, UserPlus, LogOut, Mail, Lock, User, Sparkles, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  const [mounted, setMounted] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
    const checkSession = async () => {
      try {
        const user = await account.get();
        setLoggedInUser(user);
      } catch (err) {
        setLoggedInUser(null);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (e: string, p: string) => {
    if (!e || !p) {
      setError("Veuillez remplir vos identifiants.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await account.createEmailPasswordSession(e, p);
      const user = await account.get();
      setLoggedInUser(user);
    } catch (err: any) {
      setError(err.message || "Échec de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !name) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await account.create(ID.unique(), email, password, name);
      await handleLogin(email, password);
    } catch (err: any) {
      setError(err.message || "Échec de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await account.deleteSession("current");
      setLoggedInUser(null);
    } catch (err) {
      setError("Erreur lors de la déconnexion.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-brand-canvas" />;

  // Interface utilisateur connecté (Espace Client)
  if (loggedInUser) {
    return (
      <div className="min-h-screen bg-brand-canvas flex items-center justify-center p-6">
        <div className="bg-white p-12 rounded-sm shadow-sm max-w-md w-full text-center border border-brand-rose-light/10">
          <div className="w-24 h-24 bg-brand-canvas rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-rose-light/20">
            <User className="w-10 h-10 text-brand-rose" strokeWidth={1} />
          </div>
          <span className="text-[10px] tracking-[0.5em] uppercase text-brand-rose font-bold block mb-2 ml-[0.5em]">Mon Espace</span>
          <h2 className="text-3xl font-serif italic text-brand-stone mb-8">Ravi de vous revoir, <br/>{loggedInUser.name}</h2>
          
          <div className="space-y-4">
            <Link href="/products" className="block w-full py-4 text-[10px] tracking-[0.3em] uppercase font-bold border border-brand-stone text-brand-stone hover:bg-brand-stone hover:text-white transition-all">
                Retourner à la boutique
            </Link>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="flex items-center justify-center gap-3 w-full text-brand-stone-muted hover:text-brand-rose py-4 transition-all font-bold text-[9px] uppercase tracking-widest"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-canvas flex items-center justify-center p-6 text-brand-stone">
      <div className="w-full max-w-[440px] relative">
        
        {/* Bouton Retour Boutique */}
        <Link href="/" className="absolute -top-16 left-0 flex items-center gap-2 text-brand-stone-muted hover:text-brand-stone transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[9px] uppercase tracking-widest font-bold">Retour Boutique</span>
        </Link>

        <div className="bg-white p-10 md:p-14 rounded-sm shadow-xl border border-brand-rose-light/10">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
                <div className="w-12 h-12 border border-brand-rose/30 rounded-full flex items-center justify-center">
                    <Sparkles className="text-brand-rose w-5 h-5" />
                </div>
            </div>
            <h1 className="text-4xl font-serif italic mb-2">Amira Shop</h1>
            <p className="text-[10px] tracking-[0.4em] uppercase text-brand-stone-muted font-bold ml-[0.4em]">Connexion • Inscription</p>
          </div>

          {error && (
            <div className="bg-rose-50 border-l-2 border-brand-rose text-brand-stone p-4 mb-8 text-[11px] font-medium italic">
              {error}
            </div>
          )}

          <div className="space-y-8">
            {/* Champ Email */}
            <div className="relative group border-b border-brand-canvas focus-within:border-brand-rose transition-colors pb-2">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-stone-muted mb-2 block">Votre Email</label>
              <div className="relative flex items-center">
                <Mail className="text-brand-rose-light w-4 h-4 mr-4" />
                <input
                  type="email"
                  placeholder="nom@exemple.com"
                  className="w-full bg-transparent outline-none text-sm font-light italic placeholder:text-brand-canvas-dark text-brand-stone"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Champ Mot de Passe */}
            <div className="relative group border-b border-brand-canvas focus-within:border-brand-rose transition-colors pb-2">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-stone-muted mb-2 block">Mot de Passe</label>
              <div className="relative flex items-center">
                <Lock className="text-brand-rose-light w-4 h-4 mr-4" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none text-sm font-light italic placeholder:text-brand-canvas-dark text-brand-stone"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Champ Nom (Uniquement utile pour l'inscription) */}
            <div className="relative group border-b border-brand-canvas focus-within:border-brand-rose transition-colors pb-2">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-stone-muted mb-2 block">Nom Complet (Pour créer un compte)</label>
              <div className="relative flex items-center">
                <User className="text-brand-rose-light w-4 h-4 mr-4" />
                <input
                  type="text"
                  placeholder="Amira B."
                  className="w-full bg-transparent outline-none text-sm font-light italic placeholder:text-brand-canvas-dark text-brand-stone"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-4">
            <button
              onClick={() => handleLogin(email, password)}
              disabled={loading}
              className="w-full bg-brand-stone text-white py-5 text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-brand-rose transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              Se Connecter
            </button>
            
            <div className="flex items-center py-2">
              <div className="flex-1 h-[1px] bg-brand-rose-light/20"></div>
              <span className="px-4 text-[9px] text-brand-stone-muted font-bold tracking-widest uppercase italic">ou</span>
              <div className="flex-1 h-[1px] bg-brand-rose-light/20"></div>
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-transparent border border-brand-rose-light/30 text-brand-stone py-4 text-[10px] tracking-[0.4em] uppercase font-bold hover:border-brand-rose transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              Créer un Compte
            </button>
          </div>
        </div>

        <p className="text-center mt-10 text-brand-stone-muted text-[9px] uppercase tracking-[0.5em] font-bold opacity-40">
           Maison Amira • Est. 2024
        </p>
      </div>
    </div>
  );
};

export default LoginPage;