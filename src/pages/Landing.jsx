import { Header } from "@components/Landing/Header";
import Hero from "@components/Landing/Hero";
import Features from "@components/Landing/Features";
import Screenshots from "@components/Landing/Screenshots";
import Reviews from "@components/Landing/Reviews";
import Download from "@components/Landing/Download";
import Footer from "@components/Landing/Footer";
import ScrollToTopButton from "@components/Landing/ScrollToTopButton";
import { useTheme } from "@context/ThemeContext";

export default function Landing() {
  const { theme } = useTheme();

  return (
    <div
      className={`relative flex min-h-screen flex-col transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-950 text-white" : "bg-slate-50 text-black"
      }`}
    >
      <Header
        scrollToSection={(id) => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <main className="flex-1 pt-24 md:pt-28">
        <Hero />
        <Features />
        <Screenshots />
        <Reviews />
        <Download />
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
