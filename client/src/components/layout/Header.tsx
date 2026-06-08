import { Link } from "wouter";
import { Menu, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { storeData } from "@/data/store";

export function Header() {
  return (
    <header className="store-header">
      <div className="site-container header-inner">
        {/* Mobile Menu (Left in RTL, but flex-row-reverse or just default RTL layout makes it Right? 
            Wait, in RTL: Start is Right, End is Left.
            Design says: Menu Left (End), Cart (End), Brand Right (Start).
            So we need Flex with justify-between.
            Start = Brand. End = Menu + Cart.
        */}
        
        {/* Brand (Right side in RTL) */}
        <Link href="/" className="brand-link">
          <span className="brand-mark"><Sparkles className="h-5 w-5" /></span>
          <span>{storeData.brandName}</span>
        </Link>
        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          <Link href="/">الرئيسية</Link>
          <a href="#products">المنتجات</a>
          <a href="#reviews">آراء العملاء</a>
          <a href="#faq">الأسئلة الشائعة</a>
        </nav>

        {/* Actions (Left side in RTL) */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="header-icon" aria-label="سلة التسوق">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="header-icon md:hidden" aria-label="فتح القائمة">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium">الرئيسية</Link>
                <Link href="/contact" className="text-lg font-medium">اتصل بنا</Link>
                <Link href="/policies/terms" className="text-lg font-medium">الشروط والأحكام</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
