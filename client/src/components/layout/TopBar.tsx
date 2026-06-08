import { useState, useEffect } from "react";
import { Truck, ShieldCheck, Package } from "lucide-react";

const MESSAGES = [
  { icon: <Truck style={{ width: 16, height: 16 }} />, text: "شحن سريع إلى جميع مناطق المملكة" },
  { icon: <Package style={{ width: 16, height: 16 }} />, text: "الدفع عند الاستلام متاح" },
  { icon: <ShieldCheck style={{ width: 16, height: 16 }} />, text: "ضمان استرجاع لمدة 30 يومًا" },
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
    <div className="topbar">
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
