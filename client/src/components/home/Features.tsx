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
    <section className="trust-strip" aria-label="مزايا التسوق">
      <div className="site-container">
        <div className="trust-strip-grid">
          {storeData.features.map((feature, idx) => {
            const Icon = iconMap[feature.icon] || Truck;
            return (
              <div key={idx} className="trust-strip-item">
                <div className="trust-strip-icon">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
