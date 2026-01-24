import { storeData } from "@/data/store";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-lg mb-4">{storeData.brandName}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              متجر سعودي متخصص في توفير أفضل المنتجات العصرية بجودة عالية وسعر منافس.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الأسئلة الشائعة</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">السياسات</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a></li>
              <li><a href="#" className="hover:text-white transition-colors">سياسة الاسترجاع</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2024 {storeData.brandName}. جميع الحقوق محفوظة.</p>
          <div className="flex gap-2 opacity-50">
             {/* Payment badges placeholder */}
             <div className="w-8 h-5 bg-white rounded-sm"></div>
             <div className="w-8 h-5 bg-white rounded-sm"></div>
             <div className="w-8 h-5 bg-white rounded-sm"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
