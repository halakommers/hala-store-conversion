import { Truck } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-black text-white py-2 px-4 text-center text-sm font-medium flex items-center justify-center gap-2">
      <Truck className="w-4 h-4" />
      <span>شحن مجاني على الطلبات التي تزيد عن 199 ر.س</span>
    </div>
  );
}
