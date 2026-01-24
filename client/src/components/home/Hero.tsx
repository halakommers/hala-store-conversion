import { Button } from "@/components/ui/button";
import { storeData } from "@/data/store";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20 text-center">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium mb-6">
          آراء عملائنا
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
          {storeData.hero.title}
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          {storeData.hero.subtitle}
        </p>
        <Button size="lg" className="h-14 px-8 text-lg rounded-full">
          {storeData.hero.cta}
        </Button>
      </div>
    </section>
  );
}

export function Banner() {
  return (
    <div className="w-full h-[300px] md:h-[500px] overflow-hidden bg-gray-100">
      <img 
        src={storeData.hero.image} 
        alt="Banner" 
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
      />
    </div>
  );
}
