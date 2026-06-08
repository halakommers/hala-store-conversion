import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero, Banner } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { ProductGrid } from "@/components/home/ProductGrid";
import { FAQ } from "@/components/home/FAQ";
import { Reviews } from "@/components/home/Reviews";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { storeData } from "@/data/store";

export default function Home() {
  const whatsappLink = `https://wa.me/${storeData.whatsappNumber}`;

  return (
    <div className="store-home min-h-screen flex flex-col font-sans">
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
        aria-label="تواصل معنا عبر واتساب"
        className="whatsapp-button"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <div className="mobile-buy-bar">
        <div>
          <strong>تسوّق بثقة</strong>
          <span>الدفع عند الاستلام</span>
        </div>
        <a href="#products">
          عرض المنتجات
          <ArrowLeft className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
