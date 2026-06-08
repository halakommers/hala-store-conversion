import { storeData, Product } from "@/data/store";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BadgeCheck, Star } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(((product.compareAt - product.price) / product.compareAt) * 100);

  return (
    <Link href={`/p/${product.slug}`} className="product-card group">
        <div className="product-image-wrap">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            width="640"
            height="640"
            loading="lazy"
            className="product-image"
          />
          {discount > 0 && (
            <span className="discount-badge">
              وفّر {discount}%
            </span>
          )}
        </div>
        <div className="product-content">
          <span className="product-category">{product.category}</span>
          <h3>{product.name}</h3>
          <div className="product-rating">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <strong>{product.ratingAvg}</strong>
            <span>({product.reviewsCount} تقييم)</span>
          </div>
          <div className="product-price-row">
            <span className="product-price">{product.price} {storeData.currency}</span>
            <span className="product-old-price">{product.compareAt} {storeData.currency}</span>
          </div>
          <Button className="product-button">
            اطلب الآن
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="product-cod"><BadgeCheck className="h-4 w-4" /> الدفع عند الاستلام</span>
        </div>
    </Link>
  );
}

export function ProductGrid() {
  return (
    <section id="products" className="products-section">
      <div className="site-container">
        <div className="section-heading">
          <span>الأكثر طلبًا</span>
          <h2>منتجات مختارة لك</h2>
          <p>اختيارات عملية بأسعار واضحة، مع الدفع عند الاستلام في جميع أنحاء المملكة.</p>
        </div>
      <div className="products-grid">
        {storeData.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      </div>
    </section>
  );
}
