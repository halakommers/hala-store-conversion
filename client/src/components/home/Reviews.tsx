import { storeData } from "@/data/store";
import { Star, CheckCircle } from "lucide-react";

export function Reviews() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-1 mb-2 text-red-500">
          {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
        </div>
        <h2 className="text-3xl font-bold mb-12">ماذا يقول عملاؤنا</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {storeData.reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
               <p className="text-gray-600 mb-6 leading-relaxed">"{review.text}"</p>
               <div className="flex flex-col items-center mt-auto">
                 <div className="w-12 h-12 rounded-full overflow-hidden mb-2 bg-gray-200">
                   <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                 </div>
                 <h4 className="font-bold flex items-center gap-1">
                   {review.name} <CheckCircle className="w-3 h-3 text-blue-500 fill-blue-500/10" />
                 </h4>
                 <span className="text-xs text-gray-400">{review.location}</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
