import { storeData } from "@/data/store";

interface OrderData {
  productName: string;
  price: number;
  quantity: number;
  bundle?: string;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
}

export function generateWhatsAppLink(data: OrderData) {
  const phone = storeData.whatsappNumber;
  let text = `مرحباً، أرغب في طلب منتج:\n`;
  text += `*${data.productName}*\n`;
  
  if (data.bundle) {
    text += `الباقة: ${data.bundle}\n`;
  }
  
  text += `الكمية: ${data.quantity}\n`;
  text += `الإجمالي: ${data.price} ${storeData.currency}\n`;
  
  if (data.customerName) {
    text += `\nبيانات العميل:\n`;
    text += `الاسم: ${data.customerName}\n`;
    text += `الجوال: ${data.customerPhone}\n`;
    text += `العنوان: ${data.customerAddress}\n`;
  }
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
