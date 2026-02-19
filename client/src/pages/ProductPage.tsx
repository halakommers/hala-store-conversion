import { useState, useEffect, useRef } from "react";
import { useRoute } from "wouter";
import { storeData } from "@/data/store";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FAQ } from "@/components/home/FAQ";
import { Reviews } from "@/components/home/Reviews";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import {
  Star,
  ShieldCheck,
  Truck,
  Check,
  BadgeCheck,
  Package,
  RotateCcw,
  PhoneCall,
  Flame,
  AlertTriangle,
  Users,
  Lock,
  ChevronDown,
} from "lucide-react";

/* ═══════════════════════════ HOOKS ═══════════════════════════ */
function useCountdown(h = 2, m = 59, s = 22) {
  const [time, setTime] = useState({ h, m, s });
  useEffect(() => {
    const id = setInterval(() => {
      setTime((p) => {
        let { h, m, s } = p;
        s--;
        if (s < 0) { m--; s = 59; }
        if (m < 0) { h--; m = 59; }
        if (h < 0) { h = 0; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(time.h)}:${pad(time.m)}:${pad(time.s)}`;
}

/* ═══════════════════════════ CITIES ═════════════════════════ */
const SAUDI_CITIES = [
  "الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام",
  "الخبر", "الأحساء", "الطائف", "بريدة", "تبوك",
  "أبها", "خميس مشيط", "الجبيل", "ينبع", "حائل",
  "نجران", "جيزان", "القطيف", "الخرج", "المجمعة",
];

/* ═══════════════════ SOCIAL PROOF TICKER ════════════════════ */
const TICKERS = [
  "🛒 محمد من الرياض اشترى للتو",
  "⭐️ سارة من جدة: «التوصيل كان سريع جداً!»",
  "🛒 خالد من الدمام أضاف للسلة الآن",
  "⭐️ نورة من مكة: «الدفع عند الاستلام ممتاز»",
  "🔥 5 أشخاص يشاهدون هذا المنتج الآن",
  "🛒 عبدالله من الخبر اشترى قبل دقيقتين",
];

function SocialTicker() {
  const [idx, setIdx] = useState(0);
  const [vis, setVis] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setVis(false);
      setTimeout(() => { setIdx((i) => (i + 1) % TICKERS.length); setVis(true); }, 350);
    }, 3600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="ticker-wrap">
      <span className={`ticker-text ${vis ? "t-in" : "t-out"}`}>{TICKERS[idx]}</span>
    </div>
  );
}

/* ═══════════════════════ IMAGE GALLERY ═══════════════════════ */
function Gallery({ images, badge }: { images: string[]; badge: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="gallery">
      <div className="gallery-main">
        <img key={active} src={images[active]} alt="" className="gallery-img fade-in" />
        <span className="g-badge">{badge}</span>
        <span className="g-secure"><Lock className="icon-xs" /> تسوق آمن</span>
      </div>
      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.map((s, i) => (
            <div key={i} className={`g-thumb ${active === i ? "active" : ""}`} onClick={() => setActive(i)}>
              <img src={s} alt="" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════ BUNDLE OPTION ══════════════════════ */
const BUNDLES = [
  { v: "1", label: "قطعة واحدة", qty: 1, disc: 0 },
  { v: "2", label: "قطعتان", qty: 2, disc: 0.2, badge: "الأكثر طلباً", bc: "#0070f3" },
  { v: "3", label: "3 قطع", qty: 3, disc: 0.3, badge: "أفضل قيمة", bc: "#dc2626" },
];

function Bundles({
  sel, onSel, base, cur,
}: { sel: string; onSel: (v: string) => void; base: number; cur: string }) {
  return (
    <div className="card">
      <p className="card-title"><Flame className="icon-s orange-icon" /> اختر الكمية</p>
      <div className="bundles">
        {BUNDLES.map((b) => {
          const total = (base * b.qty * (1 - b.disc)).toFixed(2);
          const orig = (base * b.qty).toFixed(2);
          const on = sel === b.v;
          return (
            <div key={b.v} className={`bundle ${on ? "bundle-on" : ""}`} onClick={() => onSel(b.v)}>
              {b.badge && <span className="b-badge" style={{ background: b.bc }}>{b.badge}</span>}
              <div className={`radio ${on ? "radio-on" : ""}`} />
              <div className="b-label">
                <span className="b-name">{b.label}</span>
                {b.disc > 0 && <span className="b-save">وفّر {b.disc * 100}%</span>}
              </div>
              <div className="b-price">
                <span className="b-total">{total} {cur}</span>
                {b.disc > 0 && <span className="b-orig">{orig} {cur}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════ ORDER FORM ════════════════════════ */
function OrderForm({
  fd, set, onSubmit, loading, pricing, cur,
}: {
  fd: Record<string, string>;
  set: (k: string, v: string) => void;
  onSubmit: () => void;
  loading: boolean;
  pricing: { total: string; save: string };
  cur: string;
}) {
  return (
    <div className="card order-card">
      <p className="card-title"><Package className="icon-s blue-icon" /> أدخل بياناتك لإتمام الطلب</p>
      <p className="card-sub">سيتصل بك فريقنا لتأكيد الطلب خلال دقائق</p>

      <div className="fields">
        {/* الاسم – خانة واحدة */}
        <div className="field">
          <label>الاسم</label>
          <Input placeholder="الاسم الكامل" value={fd.name}
            onChange={(e) => set("name", e.target.value)} />
        </div>

        {/* رقم الجوال */}
        <div className="field">
          <label>رقم الجوال</label>
          <div className="phone-wrap">
            <span className="phone-pre">🇸🇦 +966</span>
            <Input className="phone-inp" placeholder="5x xxx xxxx" type="tel"
              value={fd.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
        </div>

        {/* المدينة – dropdown */}
        <div className="field">
          <label>المدينة</label>
          <div className="select-wrap">
            <select className="select-input" value={fd.city}
              onChange={(e) => set("city", e.target.value)}>
              <option value="">اختر مدينتك</option>
              {SAUDI_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="select-arrow" />
          </div>
        </div>

        {/* العنوان الوطني */}
        <div className="field">
          <label>العنوان الوطني</label>
          <Input placeholder="مثال: الحي، الشارع، رقم المبنى" value={fd.address}
            onChange={(e) => set("address", e.target.value)} />
        </div>

        {/* ملاحظات */}
        <div className="field">
          <label>ملاحظات (اختياري)</label>
          <textarea
            className="notes-input"
            placeholder="أي تعليمات إضافية للتوصيل..."
            rows={2}
            value={fd.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </div>
      </div>

      {/* ملخص السعر */}
      <div className="price-summary-row">
        <span className="ps-label">الإجمالي</span>
        <span className="ps-price">{pricing.total} {cur}</span>
        {pricing.save !== "0%" && <span className="ps-save">وفّرت {pricing.save}</span>}
      </div>

      {/* trust micro */}
      <div className="micro-trust">
        <span><ShieldCheck className="icon-xs green-icon" /> ضمان 30 يوماً</span>
        <span><Truck className="icon-xs blue-icon" /> شحن مجاني</span>
        <span><Check className="icon-xs green-icon" /> دفع عند الاستلام</span>
      </div>
    </div>
  );
}

/* ═══════════════════ TRUST BADGES (Noon-style) ══════════════ */
function TrustBadges() {
  const items = [
    { icon: <Package className="icon-m" />, c: "#f97316", t: "الدفع عند الاستلام", s: "ادفع بعد ما تستلم" },
    { icon: <Truck className="icon-m" />, c: "#3b82f6", t: "توصيل سريع", s: "2–5 أيام عمل" },
    { icon: <RotateCcw className="icon-m" />, c: "#7c3aed", t: "إرجاع مجاني", s: "خلال 30 يوماً" },
    { icon: <ShieldCheck className="icon-m" />, c: "#10b981", t: "ضمان الجودة", s: "أصلي أو نرجع المبلغ" },
    { icon: <PhoneCall className="icon-m" />, c: "#0ea5e9", t: "دعم سريع", s: "واتساب أو اتصال" },
    { icon: <Users className="icon-m" />, c: "#f59e0b", t: "+5000 عميل سعودي", s: "تقييم 4.8 / 5" },
  ];
  return (
    <div className="trust-badges-grid">
      {items.map((b, i) => (
        <div key={i} className="trust-badge-card" style={{ animationDelay: `${i * 55}ms` }}>
          <div className="tb-icon" style={{ color: b.c, background: b.c + "18" }}>{b.icon}</div>
          <p className="tb-title">{b.t}</p>
          <p className="tb-sub">{b.s}</p>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════ STICKY CTA ════════════════════════ */
function StickyCTA({ price, cur, onOrder, loading }: {
  price: string; cur: string; onOrder: () => void; loading: boolean;
}) {
  return (
    <div className="sticky-cta">
      <div className="sticky-inner">
        <div className="sticky-info">
          <span className="sticky-price">{price} {cur}</span>
          <span className="sticky-label">الدفع عند الاستلام</span>
        </div>
        <button className={`cta-btn sticky-btn ${loading ? "loading" : ""}`} onClick={onOrder} disabled={loading}>
          {loading ? <span className="spinner" /> : <><Package className="icon-s" /> اطلب الآن</>}
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════ MAIN PAGE ═════════════════════════ */
export default function ProductPage() {
  const [, params] = useRoute("/p/:slug");
  const product = storeData.products.find((p) => p.slug === params?.slug) || storeData.products[0];

  const [sel, setSel] = useState("1");
  const [fd, setFd] = useState({ name: "", phone: "", city: "", address: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const countdown = useCountdown(2, 47, 9);
  const formRef = useRef<HTMLDivElement>(null);

  const getPrice = () => {
    const b = product.price;
    if (sel === "2") return { total: (b * 2 * 0.8).toFixed(2), save: "20%" };
    if (sel === "3") return { total: (b * 3 * 0.7).toFixed(2), save: "30%" };
    return { total: b.toFixed(2), save: "0%" };
  };
  const pricing = getPrice();

  const set = (k: string, v: string) => setFd((p) => ({ ...p, [k]: v }));

  const handleOrder = () => {
    setLoading(true);
    setTimeout(() => {
      const link = generateWhatsAppLink({
        productName: product.name,
        price: Number(pricing.total),
        quantity: Number(sel),
        bundle: sel === "1" ? "قطعة واحدة" : `${sel} قطع`,
        customerName: fd.name,
        customerPhone: fd.phone,
        customerAddress: `${fd.city} – ${fd.address}${fd.notes ? " – ملاحظات: " + fd.notes : ""}`,
      });
      window.open(link, "_blank");
      setLoading(false);
    }, 600);
  };

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div className="page-root">
      <TopBar />
      <Header />

      <main className="page-main">

        {/* ── صورة المنتج ── */}
        <Gallery images={product.images} badge={product.discountLabel} />

        {/* ── اسم + تقييمات ── */}
        <div className="details-block">
          <div className="stars-row">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className={`star ${i <= Math.round(product.ratingAvg) ? "star-on" : "star-off"}`} />
            ))}
            <span className="review-count">({product.reviewsCount} تقييم)</span>
            <span className="verified-badge"><BadgeCheck className="icon-xs" /> مؤكد</span>
          </div>

          <h1 className="product-title">{product.name}</h1>
          <p className="product-desc">{product.shortDescription}</p>

          {/* السعر */}
          <div className="price-block">
            <span className="price-main">{product.price} {storeData.currency}</span>
            <span className="price-was">{product.compareAt} {storeData.currency}</span>
            <span className="price-disc">{product.discountLabel}</span>
          </div>

          {/* عداد تنازلي تحت السعر */}
          <div className="countdown-row">
            <AlertTriangle className="icon-xs red-icon" />
            <span>العرض ينتهي بعد:</span>
            <span className="cd-timer">{countdown}</span>
            <span className="cd-stock">· 7 قطع فقط</span>
          </div>

          {/* سوشيال بروف تيكر */}
          <SocialTicker />
        </div>

        {/* ── Trust Bar أفقي ── */}
        <div className="hbar">
          <div className="hbar-item"><ShieldCheck className="icon-s green-icon" /><span>ضمان 30 يوم</span></div>
          <div className="hbar-sep" />
          <div className="hbar-item"><Truck className="icon-s blue-icon" /><span>شحن مجاني</span></div>
          <div className="hbar-sep" />
          <div className="hbar-item"><Package className="icon-s orange-icon" /><span>COD</span></div>
          <div className="hbar-sep" />
          <div className="hbar-item"><RotateCcw className="icon-s purple-icon" /><span>إرجاع مجاني</span></div>
        </div>

        {/* ── كميات ── */}
        <Bundles sel={sel} onSel={setSel} base={product.price} cur={storeData.currency} />

        {/* ── نموذج الطلب ── */}
        <div ref={formRef}>
          <OrderForm fd={fd} set={set} onSubmit={handleOrder} loading={loading}
            pricing={pricing} cur={storeData.currency} />
        </div>

        {/* ── اكورديون المنتج ── */}
        <Accordion type="single" collapsible defaultValue="desc" className="prod-accordion">
          <AccordionItem value="desc">
            <AccordionTrigger className="acc-trg">وصف المنتج</AccordionTrigger>
            <AccordionContent className="acc-body">
              <p className="mb-3">{product.description}</p>
              <ul className="feat-list">
                {product.features.map((f, i) => (
                  <li key={i}><Check className="icon-s green-icon" />{f}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="ship">
            <AccordionTrigger className="acc-trg">
              <Truck className="icon-s blue-icon" /> الشحن والتوصيل
            </AccordionTrigger>
            <AccordionContent className="acc-body">
              <p>📦 شحن مجاني على الطلبات فوق {storeData.freeShippingThreshold} {storeData.currency}.</p>
              <p>🚚 توصيل خلال <strong>2–5 أيام عمل</strong> لجميع مناطق المملكة.</p>
              <p>📬 رسالة تتبع فور شحن طلبك.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="return">
            <AccordionTrigger className="acc-trg">
              <RotateCcw className="icon-s purple-icon" /> الإرجاع والاسترداد
            </AccordionTrigger>
            <AccordionContent className="acc-body">
              <p>✅ إرجاع مجاني خلال <strong>30 يوماً</strong> من الاستلام.</p>
              <p>💰 استرداد كامل – بدون شروط معقدة.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="pay">
            <AccordionTrigger className="acc-trg">
              <Package className="icon-s orange-icon" /> الدفع عند الاستلام
            </AccordionTrigger>
            <AccordionContent className="acc-body">
              <p>💵 لا تحتاج بطاقة. ادفع بعد ما تشوف المنتج بين يديك.</p>
              <p>🔒 شحن أولاً، دفع عند الاستلام.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* ── لماذا نحن ── */}
        <div className="why-section">
          <h2 className="why-title">لماذا تتسوق معنا؟</h2>
          <p className="why-sub">نفس ضمانات كبرى المتاجر – بلمسة محلية سعودية 🇸🇦</p>
          <TrustBadges />
        </div>

        {/* ── Reviews ── */}
        <Reviews />

        {/* ── FAQ ── */}
        <FAQ />

      </main>

      <Footer />

      {/* Sticky CTA – دائم */}
      <StickyCTA price={pricing.total} cur={storeData.currency} onOrder={scrollToForm} loading={loading} />
    </div>
  );
}
