import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { storeData } from "@/data/store";

export function FAQ() {
  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h2 className="text-3xl font-bold mb-2">الأسئلة الشائعة</h2>
        <p className="text-gray-500 mb-8">إذا لم تجد إجابة لسؤالك هنا، يمكنك الاتصال بنا</p>
        <Button variant="outline" className="mb-12 rounded-full px-8 border-black text-black hover:bg-black hover:text-white">
          اتصل بنا
        </Button>
        
        <div className="text-right">
          <Accordion type="single" collapsible className="w-full">
            {storeData.faq.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-b-gray-100">
                <AccordionTrigger className="text-lg font-medium hover:no-underline py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 pb-6 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
