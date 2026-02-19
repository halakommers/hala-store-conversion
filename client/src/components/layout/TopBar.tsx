import { useState, useEffect } from "react";
import { Truck, ShieldCheck, Package } from "lucide-react";

const MESSAGES = [
  { icon: <Truck style={{ width: 14, height: 14 }} />, text: "🚚 شحن مجاني على الطلبات فوق 199 ر.س" },
  { icon: <Package style={{ width: 14, height: 14 }} />, text: "💵 الدفع عند الاستلام – ادفع بمجرد وصول المنتج" },
  { icon: <ShieldCheck style={{ width: 14, height: 14 }} />, text: "🛡️ ضمان 30 يوماً – استرجاع مجاني بدون شروط" },
];

export function TopBar() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 400);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  const msg = MESSAGES[idx];

  return (
    <div style={{
      background: "#111827",
      color: "#fff",
      padding: "8px 16px",
      textAlign: "center",
      fontSize: "0.8rem",
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      overflow: "hidden",
      minHeight: 36,
    }}>
      <span
        style={{
          display: "flex", alignItems: "center", gap: 6,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.3s, transform 0.3s",
        }}
      >
        {msg.icon}
        {msg.text}
      </span>
    </div>
  );
}
