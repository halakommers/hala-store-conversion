import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero, Banner } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { ProductGrid } from "@/components/home/ProductGrid";
import { FAQ } from "@/components/home/FAQ";
import { Reviews } from "@/components/home/Reviews";
import { MessageCircle } from "lucide-react";
import { storeData } from "@/data/store";

export default function Home() {
  const whatsappLink = `https://wa.me/${storeData.whatsappNumber}`;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <TopBar />
      <Header />
      
      <main className="flex-1">
        <Hero />
        <Banner />
        <Features />
        <Reviews />
        <ProductGrid />
        <FAQ />
      </main>

      <Footer />
      
      {/* Floating WhatsApp Button */}
      <a 
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-[#22C55E] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </a>
    </div>
  );
}
