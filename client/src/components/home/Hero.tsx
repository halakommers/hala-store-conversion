import { Button } from "@/components/ui/button";
import { storeData } from "@/data/store";
import { ArrowLeft, BadgeCheck, Star, Truck } from "lucide-react";

export function Hero() {
  return (
    <section className="hero-shell">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <div className="hero-rating">
            <span className="flex" aria-label="تقييم 4.8 من 5">
              {[1, 2, 3, 4, 5].map((item) => (
                <Star key={item} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </span>
            <span>4.8 من أكثر من 500 عميل</span>
          </div>
          <p className="hero-kicker">مختارات عملية بجودة تستحقها</p>
          <h1>{storeData.hero.title}</h1>
          <p className="hero-subtitle">{storeData.hero.subtitle}</p>
          <div className="hero-actions">
            <Button asChild size="lg" className="primary-action">
              <a href="#products">
                {storeData.hero.cta}
                <ArrowLeft className="h-5 w-5" />
              </a>
            </Button>
            <span className="hero-delivery">
              <Truck className="h-5 w-5" />
              توصيل خلال 2-5 أيام
            </span>
          </div>
          <div className="hero-assurances">
            <span><BadgeCheck className="h-4 w-4" /> دفع عند الاستلام</span>
            <span><BadgeCheck className="h-4 w-4" /> استرجاع خلال 30 يومًا</span>
          </div>
        </div>
        <div className="hero-media">
          <img src={storeData.hero.image} alt="مجموعة مختارة من منتجات متجر هلا" />
          <div className="hero-floating-card">
            <span className="hero-floating-icon"><BadgeCheck className="h-5 w-5" /></span>
            <span><strong>شراء مطمئن</strong> ضمان واسترجاع سهل</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Banner() {
  return null;
}
