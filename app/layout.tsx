import { Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";

// Polices
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

// SEO
export const metadata = {
  title: "Efraim | Full-Stack & AI Engineer",
  description: "Portfolio Engineering & AI. Discipline, Rigueur, Impact.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-white text-slate-900 dark:bg-black dark:text-white antialiased min-h-screen selection:bg-indigo-500 selection:text-white transition-colors duration-300">


          {children}

      </body>
    </html>
  );
}