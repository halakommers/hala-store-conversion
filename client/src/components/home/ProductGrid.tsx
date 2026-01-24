import { storeData, Product } from "@/data/store";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(((product.compareAt - product.price) / product.compareAt) * 100);

  return (
    <Link href={`/p/${product.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discount > 0 && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              خصم {discount}%
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 group-hover:text-gray-700 transition-colors">{product.name}</h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-red-500 font-bold text-xl">{product.price} {storeData.currency}</span>
            <span className="text-gray-400 text-sm line-through decoration-red-500/50">{product.compareAt} {storeData.currency}</span>
          </div>
          <Button className="w-full rounded-xl">اشتر الآن</Button>
        </div>
      </div>
    </Link>
  );
}

export function ProductGrid() {
  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">قد تعجبك أيضاً</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {storeData.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
