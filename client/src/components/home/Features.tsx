import { Truck, ShieldCheck, Wallet, Headphones } from "lucide-react";
import { storeData } from "@/data/store";

const iconMap: any = {
  Truck,
  ShieldCheck,
  Wallet,
  Headphones
};

export function Features() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 overflow-hidden rounded-2xl">
          {storeData.features.map((feature, idx) => {
            const Icon = iconMap[feature.icon] || Truck;
            return (
              <div key={idx} className="bg-white p-8 flex flex-col items-center text-center hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-black">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
