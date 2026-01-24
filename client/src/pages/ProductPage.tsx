import { useState } from "react";
import { useRoute } from "wouter";
import { storeData, Product } from "@/data/store";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FAQ } from "@/components/home/FAQ";
import { Reviews } from "@/components/home/Reviews";
import { ProductGrid } from "@/components/home/ProductGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { Star, ShieldCheck, Truck, Clock, Check } from "lucide-react";

export default function ProductPage() {
  const [match, params] = useRoute("/p/:slug");
  const slug = params?.slug;
  const product = storeData.products.find(p => p.slug === slug) || storeData.products[0]; // Fallback to first if not found (or handle 404)

  const [selectedBundle, setSelectedBundle] = useState("1");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phone: ""
  });

  // Calculate pricing based on bundle
  const getPrice = () => {
    const base = product.price;
    if (selectedBundle === "2") return { total: (base * 2 * 0.8).toFixed(2), save: "20%" };
    if (selectedBundle === "3") return { total: (base * 3 * 0.7).toFixed(2), save: "30%" };
    return { total: base.toFixed(2), save: "0%" };
  };

  const pricing = getPrice();

  const handleOrder = () => {
    const link = generateWhatsAppLink({
      productName: product.name,
      price: Number(pricing.total),
      quantity: Number(selectedBundle),
      bundle: selectedBundle === "1" ? "قطعة واحدة" : `${selectedBundle} قطع`,
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerPhone: formData.phone,
      customerAddress: `${formData.city} - ${formData.address}`
    });
    window.open(link, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <TopBar />
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8 text-sm text-gray-500">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{product.category}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Right Column: Images (RTL: actually visually Right if dir=rtl, so first in DOM) */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold shadow-md">
                {product.discountLabel}
              </span>
            </div>
            {/* Thumbnails if multiple images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:border-black transition-colors">
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Left Column: Details & Form */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 text-yellow-500 mb-2">
                 <div className="flex text-yellow-400">
                   {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= Math.round(product.ratingAvg) ? 'fill-current' : ''}`} />)}
                 </div>
                 <span className="text-gray-400 text-sm">({product.reviewsCount} مراجعة)</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{product.name}</h1>
              
              <div className="flex items-end gap-3 mb-6">
                <span className="text-3xl font-bold text-red-500">{product.price} {storeData.currency}</span>
                <span className="text-xl text-gray-400 line-through mb-1">{product.compareAt} {storeData.currency}</span>
              </div>

              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm font-medium animate-pulse">
                <Clock className="w-4 h-4" />
                عرض محدود: ينتهي قريباً!
              </div>
            </div>

            {/* Bundles */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-black rounded-full block"></span>
                اختر العرض المناسب:
              </h3>
              
              <RadioGroup value={selectedBundle} onValueChange={setSelectedBundle} className="space-y-3">
                
                {/* Option 1 */}
                <div className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedBundle === "1" ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"}`}
                     onClick={() => setSelectedBundle("1")}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="1" id="b1" />
                      <Label htmlFor="b1" className="cursor-pointer font-bold text-lg">اشتري 1</Label>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-lg">{product.price} {storeData.currency}</span>
                    </div>
                  </div>
                </div>

                {/* Option 2 */}
                <div className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedBundle === "2" ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"}`}
                     onClick={() => setSelectedBundle("2")}>
                  <span className="absolute -top-3 left-4 bg-black text-white text-xs px-2 py-1 rounded">الأكثر مبيعاً</span>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="2" id="b2" />
                      <div>
                        <Label htmlFor="b2" className="cursor-pointer font-bold text-lg block">اشتري 2</Label>
                        <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">توفير 20%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-lg">{(product.price * 2 * 0.8).toFixed(2)} {storeData.currency}</span>
                      <span className="block text-xs text-gray-400 line-through">{(product.price * 2).toFixed(2)} {storeData.currency}</span>
                    </div>
                  </div>
                </div>

                {/* Option 3 */}
                <div className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedBundle === "3" ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"}`}
                     onClick={() => setSelectedBundle("3")}>
                   <span className="absolute -top-3 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded">أفضل عرض</span>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="3" id="b3" />
                       <div>
                        <Label htmlFor="b3" className="cursor-pointer font-bold text-lg block">اشتري 3</Label>
                        <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">توفير 30%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-lg">{(product.price * 3 * 0.7).toFixed(2)} {storeData.currency}</span>
                      <span className="block text-xs text-gray-400 line-through">{(product.price * 3).toFixed(2)} {storeData.currency}</span>
                    </div>
                  </div>
                </div>

              </RadioGroup>
            </div>

            {/* Form */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
               <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-black rounded-full block"></span>
                لإجراء طلب، يرجى إدخال معلوماتك هنا:
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>الاسم الأول</Label>
                    <Input 
                      placeholder="الاسم الأول" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                   <div className="space-y-2">
                    <Label>العائلة</Label>
                    <Input 
                      placeholder="اسم العائلة" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>رقم الهاتف</Label>
                  <div className="relative">
                    <Input 
                      className="pl-20 text-left dir-ltr" 
                      placeholder="50xxxxxxx" 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    <div className="absolute left-3 top-2.5 flex items-center gap-1 opacity-50 text-sm">
                       <span>+966</span>
                       <span className="w-5 h-3 bg-green-700 rounded-sm overflow-hidden relative border border-gray-200">
                         {/* Saudi Flag simplified */}
                         <div className="absolute inset-0 bg-green-700 flex items-center justify-center text-[6px] text-white">SA</div>
                       </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>المدينة</Label>
                  <Input 
                    placeholder="الرياض، جدة..." 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>عنوان التوصيل</Label>
                  <Input 
                    placeholder="الحي، الشارع..." 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>

              <div className="mt-8 pt-4 border-t">
                <Button 
                  size="lg" 
                  className="w-full h-14 text-lg font-bold bg-black hover:bg-gray-800 text-white rounded-xl shadow-lg shadow-black/10"
                  onClick={handleOrder}
                >
                  اطلب الآن - الدفع عند الاستلام
                </Button>
                
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
                   <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-green-500" /> ضمان 30 يوماً</span>
                   <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-red-500" /> شحن مجاني</span>
                   <span className="flex items-center gap-1"><Check className="w-4 h-4 text-blue-500" /> الدفع عند الاستلام</span>
                </div>
              </div>
            </div>

            {/* Description & Policies */}
             <div className="prose max-w-none text-gray-600 leading-relaxed">
               <h3 className="font-bold text-black text-xl mb-4">الوصف</h3>
               <p>{product.description}</p>
               
               <h4 className="font-bold text-black mt-6 mb-2">المميزات:</h4>
               <ul className="list-disc list-inside space-y-1">
                 {product.features.map((f, i) => <li key={i}>{f}</li>)}
               </ul>
             </div>

             <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="shipping">
                  <AccordionTrigger>الشحن والتوصيل</AccordionTrigger>
                  <AccordionContent>
                    شحن مجاني للطلبات فوق {storeData.freeShippingThreshold} {storeData.currency}. التوصيل خلال 2-5 أيام عمل.
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="return">
                  <AccordionTrigger>سياسة الاسترجاع</AccordionTrigger>
                  <AccordionContent>
                    يمكنك استرجاع المنتج خلال 30 يوم من تاريخ الشراء بشرط أن يكون في حالته الأصلية.
                  </AccordionContent>
                </AccordionItem>
             </Accordion>

          </div>
        </div>

        <div className="mt-20">
          <Reviews />
        </div>
        
        <div className="mt-20">
           <FAQ />
        </div>
      </main>

      <Footer />
    </div>
  );
}
