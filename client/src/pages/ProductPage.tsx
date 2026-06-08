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
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import {
  Star, ShieldCheck, Truck, Check, BadgeCheck, Package,
  RotateCcw, PhoneCall, Flame, AlertTriangle, Users, Lock, ChevronDown,
  CheckCircle, ArrowLeft, Zap, Gem, HeartHandshake, MapPin,
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

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const RAND_REVIEWS = randInt(350, 499);
const RAND_STOCK = randInt(40, 120);

/* ═══════════════════════════ CITIES ═════════════════════════ */
const SAUDI_CITIES = [
  "الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام",
  "الخبر", "الأحساء", "الطائف", "بريدة", "تبوك",
  "أبها", "خميس مشيط", "الجبيل", "ينبع", "حائل",
  "نجران", "جيزان", "القطيف", "الخرج", "المجمعة",
];

/* ═══════════════════ SOCIAL PROOF TICKER ════════════════════ */
const TICKERS = [
  "محمد من الرياض اشترى هذا المنتج للتو",
  "سارة من جدة: التوصيل كان سريعًا جدًا",
  "خالد من الدمام أضاف المنتج إلى طلبه",
  "نورة من مكة: الدفع عند الاستلام ممتاز",
  "5 أشخاص يشاهدون هذا المنتج الآن",
  "عبدالله من الخبر اشترى قبل دقيقتين",
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
            <button key={i} type="button" aria-label={`عرض صورة المنتج ${i + 1}`} className={`g-thumb ${active === i ? "active" : ""}`} onClick={() => setActive(i)}>
              <img src={s} alt={`${i === 0 ? "الصورة الرئيسية" : "تفاصيل"} للمنتج`} loading="lazy" />
            </button>
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

function Bundles({ sel, onSel, base, cur }: { sel: string; onSel: (v: string) => void; base: number; cur: string }) {
  return (
    <div className="card">
      <div className="bundle-card-head">
        <span className="order-step">1</span>
        <div>
          <p className="card-title"><Flame className="icon-s orange-icon" /> اختر العرض المناسب</p>
          <p className="card-sub">كلما زادت الكمية، زاد التوفير</p>
        </div>
      </div>
      <div className="bundles">
        {BUNDLES.map((b) => {
          const total = (base * b.qty * (1 - b.disc)).toFixed(2);
          const orig = (base * b.qty).toFixed(2);
          const unitPrice = (Number(total) / b.qty).toFixed(2);
          const on = sel === b.v;
          return (
            <button type="button" key={b.v} className={`bundle ${on ? "bundle-on" : ""}`} onClick={() => onSel(b.v)} aria-pressed={on}>
              {b.badge && <span className="b-badge" style={{ background: b.bc }}>{b.badge}</span>}
              <div className={`radio ${on ? "radio-on" : ""}`} />
              <div className="b-label">
                <span className="b-name">{b.label}</span>
                {b.disc > 0 && <span className="b-save">وفّر {b.disc * 100}%</span>}
                <span className="b-unit">{unitPrice} {cur} للقطعة</span>
              </div>
              <div className="b-price">
                <span className="b-price-label">الإجمالي</span>
                <span className="b-total">{total} {cur}</span>
                {b.disc > 0 && <span className="b-orig">{orig} {cur}</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════ ORDER FORM ════════════════════════ */
function OrderForm({
  fd, set, errors, cur, pricing,
}: {
  fd: Record<string, string>;
  set: (k: string, v: string) => void;
  errors: Record<string, boolean>;
  cur: string;
  pricing: { total: string; save: string };
}) {
  return (
    <div className="card order-card">
      <div className="order-card-head">
        <span className="order-step">2</span>
        <div>
          <p className="card-title"><Package className="icon-s blue-icon" /> بيانات التوصيل</p>
          <p className="card-sub">أدخل بياناتك وسنتصل بك لتأكيد الطلب قبل الشحن</p>
        </div>
      </div>

      <div className="fields">
        {/* الاسم */}
        <div className="field">
          <label>الاسم <span className="req">*</span></label>
          <Input
            placeholder="الاسم الكامل"
            value={fd.name}
            onChange={(e) => set("name", e.target.value)}
            className={errors.name ? "inp-error" : ""}
          />
          {errors.name && <span className="err-msg">الاسم مطلوب</span>}
        </div>

        {/* رقم الجوال */}
        <div className="field">
          <label>رقم الجوال <span className="req">*</span></label>
          <div className="phone-wrap">
            <span className="phone-pre">🇸🇦 +966</span>
            <Input
              className={`phone-inp ${errors.phone ? "inp-error" : ""}`}
              placeholder="5x xxx xxxx"
              type="tel"
              value={fd.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </div>
          {errors.phone && <span className="err-msg">أدخل رقم جوال صحيح يبدأ بـ 05</span>}
        </div>

        {/* المدينة */}
        <div className="field">
          <label>المدينة <span className="req">*</span></label>
          <div className={`select-wrap ${errors.city ? "sel-error" : ""}`}>
            <select className="select-input" value={fd.city} onChange={(e) => set("city", e.target.value)}>
              <option value="">اختر مدينتك</option>
              {SAUDI_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="select-arrow" />
          </div>
          {errors.city && <span className="err-msg">اختر مدينتك</span>}
        </div>

        <div className="field">
          <label>عنوان التوصيل بالتفصيل <span className="req">*</span></label>
          <Input
            placeholder="الحي، الشارع، رقم المبنى"
            value={fd.address}
            onChange={(e) => set("address", e.target.value)}
            className={errors.address ? "inp-error" : ""}
          />
          {errors.address && <span className="err-msg">عنوان التوصيل مطلوب</span>}
        </div>

        <div className="field national-address-field">
          <div className="field-label-row">
            <label>العنوان الوطني المختصر</label>
            <span className="optional-label">اختياري</span>
          </div>
          <Input
            placeholder="مثال: RRAA1234"
            value={fd.national}
            onChange={(e) => set("national", e.target.value.toUpperCase())}
            className={errors.national ? "inp-error national-address-input" : "national-address-input"}
            dir="ltr"
            maxLength={8}
            autoCapitalize="characters"
          />
          <span className="field-help">4 أحرف و4 أرقام لتوصيل أدق وأسرع.</span>
          {errors.national && <span className="err-msg">أدخل 4 أحرف ثم 4 أرقام، مثل RRAA1234</span>}
        </div>
      </div>

      {/* ملخص السعر */}
      <div className="price-summary-row">
        <span className="ps-label">الإجمالي</span>
        <span className="ps-price">{pricing.total} {cur}</span>
        {pricing.save !== "0%" && <span className="ps-save">وفّرت {pricing.save}</span>}
      </div>

      <div className="micro-trust">
        <span><ShieldCheck className="icon-xs green-icon" /> ضمان 30 يوماً</span>
        <span><Truck className="icon-xs blue-icon" /> شحن مجاني</span>
        <span><Check className="icon-xs green-icon" /> دفع عند الاستلام</span>
      </div>
    </div>
  );
}

function Benefits({ features }: { features: string[] }) {
  const icons = [Gem, ShieldCheck, Zap, HeartHandshake];
  return (
    <section className="benefits-section" aria-labelledby="benefits-title">
      <div className="conversion-heading">
        <span>لماذا هذا المنتج؟</span>
        <h2 id="benefits-title">تفاصيل صغيرة تصنع فرقًا واضحًا</h2>
        <p>صُمم ليمنحك استخدامًا عمليًا وجودة يمكنك الاعتماد عليها كل يوم.</p>
      </div>
      <div className="benefits-grid">
        {features.map((feature, index) => {
          const Icon = icons[index % icons.length];
          return (
            <article key={feature} className="benefit-card">
              <span><Icon className="icon-m" /></span>
              <h3>{feature}</h3>
              <p>جودة مختارة بعناية لتجربة أفضل وعمر استخدام أطول.</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ═══════════════════ TRUST BADGES ═════════════════════════ */
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

/* ════════════════════ STICKY CTA ════════════════════════ */
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

/* ════════════════ THANK YOU OVERLAY ════════════════════ */
function ThankYouOverlay({ name, onClose }: { name: string; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="ty-overlay" onClick={onClose}>
      <div className="ty-card" onClick={(e) => e.stopPropagation()}>
        {/* أيقونة نجاح */}
        <div className="ty-icon-wrap">
          <div className="ty-ring" />
          <CheckCircle className="ty-check" />
        </div>

        <h2 className="ty-title">شكرًا {name || "لك"}</h2>
        <p className="ty-msg">
          تم استلام طلبك بنجاح!<br />
          فريقنا سيتصل بك <strong>خلال دقائق</strong> لتأكيد الطلب وترتيب التوصيل.
        </p>

        {/* تفاصيل */}
        <div className="ty-steps">
          <div className="ty-step">
            <span className="ty-sn">1</span>
            <span>تأكيد الطلب عبر الاتصال</span>
          </div>
          <div className="ty-step">
            <span className="ty-sn">2</span>
            <span>شحن وتجهيز المنتج</span>
          </div>
          <div className="ty-step">
            <span className="ty-sn">3</span>
            <span>التوصيل لبابك ودفع عند الاستلام</span>
          </div>
        </div>

        <div className="ty-badges">
          <span><ShieldCheck className="icon-xs green-icon" /> ضمان 30 يوم</span>
          <span><Truck className="icon-xs blue-icon" /> شحن مجاني</span>
          <span><Package className="icon-xs orange-icon" /> COD</span>
        </div>

        <button className="ty-close" onClick={onClose}>
          <ArrowLeft className="icon-s" /> العودة للمتجر
        </button>
      </div>
    </div>
  );
}

/* ═══════════════ INLINE CTA BUTTON ════════════════════ */
function InlineCTA({ onClick, loading, label = "اطلب الآن – الدفع عند الاستلام" }: {
  onClick: () => void; loading: boolean; label?: string;
}) {
  return (
    <button
      className={`cta-btn inline-cta ${loading ? "loading" : ""}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading
        ? <span className="spinner" />
        : <><Package className="icon-s" /> {label}</>}
    </button>
  );
}

/* ════════════════════════ MAIN PAGE ═════════════════════════ */
export default function ProductPage() {
  const [, params] = useRoute("/p/:slug");
  const product = storeData.products.find((p) => p.slug === params?.slug) || storeData.products[0];

  const [sel, setSel] = useState("1");
  const [fd, setFd] = useState({ name: "", phone: "", city: "", address: "", national: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const countdown = useCountdown(2, 47, 9);
  const formRef = useRef<HTMLDivElement>(null);

  const getPrice = () => {
    const b = product.price;
    if (sel === "2") return { total: (b * 2 * 0.8).toFixed(2), save: "20%" };
    if (sel === "3") return { total: (b * 3 * 0.7).toFixed(2), save: "30%" };
    return { total: b.toFixed(2), save: "0%" };
  };
  const pricing = getPrice();

  const set = (k: string, v: string) => {
    setFd((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: false }));
  };

  /* validation */
  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    if (!fd.name.trim()) newErrors.name = true;
    if (!fd.phone.trim() || !/^05\d{8}$/.test(fd.phone.replace(/\s/g, ""))) newErrors.phone = true;
    if (!fd.city) newErrors.city = true;
    if (!fd.address.trim()) newErrors.address = true;
    if (fd.national.trim() && !/^[A-Z]{4}\d{4}$/.test(fd.national.trim().toUpperCase())) {
      newErrors.national = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = () => {
    /* إذا ما فالفورم – scroll للفورم */
    const formVisible = formRef.current &&
      formRef.current.getBoundingClientRect().top < window.innerHeight;
    if (!formVisible) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!validate()) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const addrParts = [
        fd.city,
        fd.address,
        fd.national ? `العنوان الوطني: ${fd.national}` : "",
      ].filter(Boolean);
      const link = generateWhatsAppLink({
        productName: product.name,
        price: Number(pricing.total),
        quantity: Number(sel),
        bundle: sel === "1" ? "قطعة واحدة" : `${sel} قطع`,
        customerName: fd.name,
        customerPhone: fd.phone,
        customerAddress: addrParts.join(" – "),
      });
      window.open(link, "_blank");
      setLoading(false);
      setShowThankYou(true);
    }, 700);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="page-root">
      <TopBar />
      <Header />

      {/* ══════════ القسم 1: المنتج ══════════ */}
      <main>
      <section className="product-hero-section">
        <div className="product-hero-grid">
          <div className="product-gallery-column">
            <Gallery images={product.images} badge={product.discountLabel} />
          </div>

          <div className="product-purchase-column">
          <div className="details-block">
            <span className="product-eyebrow">اختيار العملاء هذا الأسبوع</span>
            <div className="stars-row">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={`star ${i <= Math.round(product.ratingAvg) ? "star-on" : "star-off"}`} />
              ))}
              <span className="review-count">4.8 ({RAND_REVIEWS}+ تقييم)</span>
              <span className="verified-badge"><BadgeCheck className="icon-xs" /> مؤكد</span>
            </div>

            <h1 className="product-title">{product.name}</h1>
            <p className="product-desc">{product.shortDescription}</p>

            <div className="hero-quick-benefits" aria-label="أهم مميزات المنتج">
              {product.features.slice(0, 3).map((feature) => (
                <span key={feature}><Check className="icon-xs" /> {feature}</span>
              ))}
            </div>

            <div className="price-block">
              <div className="price-copy">
                <span className="price-caption">سعر العرض</span>
                <span className="price-main">{product.price} {storeData.currency}</span>
              </div>
              <div className="price-saving">
                <span className="price-was">{product.compareAt} {storeData.currency}</span>
                <span className="price-disc">{product.discountLabel}</span>
              </div>
            </div>

            {/* عداد تنازلي */}
            <div className="countdown-row">
              <AlertTriangle className="icon-xs red-icon" />
              <span>العرض ينتهي بعد:</span>
              <span className="cd-timer">{countdown}</span>
              <span className="cd-stock">{RAND_STOCK} قطعة متاحة</span>
            </div>

            <SocialTicker />
          </div>

          {/* ── زر اشتري #1 – بعد التفاصيل مباشرة ── */}
          <div className="inline-cta-wrap">
            <InlineCTA onClick={scrollToForm} loading={false} label="اطلب الآن – الدفع عند الاستلام" />
            <p className="inline-cta-hint">
              <ShieldCheck className="icon-xs green-icon" /> ضمان 30 يوم &nbsp;|&nbsp;
              <Truck className="icon-xs blue-icon" /> شحن مجاني &nbsp;|&nbsp;
              <Package className="icon-xs orange-icon" /> دفع عند الاستلام
            </p>
          </div>

          {/* Trust Bar */}
          <div className="hbar">
            <div className="hbar-item"><ShieldCheck className="icon-s green-icon" /><span>ضمان 30 يوم</span></div>
            <div className="hbar-sep" />
            <div className="hbar-item"><Truck className="icon-s blue-icon" /><span>شحن مجاني</span></div>
            <div className="hbar-sep" />
            <div className="hbar-item"><Package className="icon-s orange-icon" /><span>دفع عند الاستلام</span></div>
            <div className="hbar-sep" />
            <div className="hbar-item"><RotateCcw className="icon-s purple-icon" /><span>إرجاع مجاني</span></div>
          </div>
          </div>
        </div>
      </section>

      {/* ══════════ القسم 2: الطلب ══════════ */}
      <section className="order-section">
        <div className="order-layout">
          <div className="order-offer-copy">
            <span className="order-kicker">اطلبه الآن بخطوات بسيطة</span>
            <h2>أكمل طلبك في أقل من دقيقة</h2>
            <p>اختر العرض المناسب، أدخل بيانات التوصيل، وسنتواصل معك لتأكيد كل التفاصيل قبل الشحن.</p>
            <div className="order-points">
              <span><CheckCircle className="icon-s" /> لا تحتاج إلى بطاقة بنكية</span>
              <span><PhoneCall className="icon-s" /> تأكيد الطلب هاتفيًا</span>
              <span><MapPin className="icon-s" /> توصيل لجميع المناطق</span>
            </div>
          </div>
          <div className="order-form-column">
          <Bundles sel={sel} onSel={setSel} base={product.price} cur={storeData.currency} />

          <div className="order-separator" aria-hidden="true">
            <span className="order-separator-line" />
            <span className="order-separator-status">
              <CheckCircle className="icon-s" />
              تم اختيار العرض، أكمل بيانات التوصيل
            </span>
            <span className="order-separator-line" />
          </div>

          <div ref={formRef}>
            <OrderForm fd={fd} set={set} errors={errors} cur={storeData.currency} pricing={pricing} />
          </div>

          {/* زر الطلب الرئيسي داخل القسم */}
          <button
            className={`cta-btn main-cta ${loading ? "loading" : ""}`}
            onClick={handleOrder}
            disabled={loading}
          >
            {loading
              ? <span className="spinner" />
              : <><Package className="icon-s" /> اطلب الآن – الدفع عند الاستلام</>}
          </button>

          {/* أكورديون */}
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
                <p>📦 شحن مجاني على جميع الطلبات داخل المملكة.</p>
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

          {/* ── زر اشتري #2 – بعد الأكورديون ── */}
          <div className="inline-cta-wrap">
            <InlineCTA onClick={handleOrder} loading={loading} label="اطلب الآن وادفع عند الاستلام" />
            <p className="inline-cta-hint">
              <Lock className="icon-xs" /> بياناتك محمية &nbsp;|&nbsp; <PhoneCall className="icon-xs" /> نتصل بك للتأكيد
            </p>
          </div>
          </div>
        </div>
      </section>

      <div className="conversion-container">
        <Benefits features={product.features} />
        <div className="section-cta">
          <InlineCTA onClick={scrollToForm} loading={false} label="احصل على العرض الآن" />
          <p>استرجاع سهل خلال 30 يومًا</p>
        </div>
      </div>

      {/* ══════════ القسم 3: التقييمات والثقة ══════════ */}
      <section className="proof-section">
        <div className="conversion-container">
          <div className="why-section">
            <h2 className="why-title">لماذا تتسوق معنا؟</h2>
            <p className="why-sub">تجربة شراء محلية واضحة وآمنة من الطلب حتى الاستلام</p>
            <TrustBadges />
          </div>

          <Reviews />
          <FAQ />
        </div>
      </section>
      </main>

      <Footer />

      {/* Sticky CTA – دائم */}
      <StickyCTA price={pricing.total} cur={storeData.currency} onOrder={handleOrder} loading={loading} />

      {/* Thank You Overlay */}
      {showThankYou && (
        <ThankYouOverlay name={fd.name} onClose={() => setShowThankYou(false)} />
      )}
    </div>
  );
}
