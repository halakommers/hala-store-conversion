import { Star, CheckCircle } from "lucide-react";

const REVIEWS = [
  {
    name: "أحمد الغامدي",
    city: "الرياض",
    stars: 5,
    text: "والله تجربة ممتازة من أول ما طلبت وحتى استلمت. الشحن وصل بسرعة والمنتج أحسن من اللي توقعته. أنصح الكل يطلب منهم.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "نورة العتيبي",
    city: "جدة",
    stars: 5,
    text: "أخيراً متجر يوصّل بسرعة ومحترم! الغلاف الجلدي جميل جداً والخامة راقية جداً. الدفع عند الاستلام خلاني أتجرأ وأطلب وما ندمت.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "عبدالله القحطاني",
    city: "الدمام",
    stars: 5,
    text: "طلبت لأول مرة وكنت أتردد، بس لما طلبت ما ندمت أبد. المنتج وصل في 3 أيام ومغلّف بشكل احترافي. شكراً جزيلاً!",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "سارة الزهراني",
    city: "مكة المكرمة",
    stars: 5,
    text: "جودة المنتج ممتازة والتغليف أنيق جداً، يستاهل يكون هدية. التوصيل سريع والدفع عند الاستلام نقطة مريحة جداً.",
    avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "خالد الشهري",
    city: "الطائف",
    stars: 4,
    text: "المنتج وصل بحالة ممتازة وبالوقت المحدد. الجودة مطابقة للصور تماماً. سأكرر الطلب بالتأكيد.",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "منى الحربي",
    city: "المدينة المنورة",
    stars: 5,
    text: "من أفضل طلباتي أونلاين! الاهتمام بالتفاصيل واضح من التغليف للمنتج نفسه. خدمة العملاء كانت متجاوبة ومساعدة.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "فيصل الدوسري",
    city: "الأحساء",
    stars: 5,
    text: "بصراحة أفضل تجربة شراء أون لاين. المنتج جاء سريع ومطابق للوصف. الدفع عند الاستلام يعطي ثقة إضافية. ممتاز 👍",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "ريم السبيعي",
    city: "بريدة",
    stars: 5,
    text: "الخامة رقية جداً وأحسن من توقعاتي. طلبت ثانية لأهلي وما خذّلت. أنصح الجميع، متجر موثوق ويستاهل الثقة.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="reviews-section">
      {/* header */}
      <div className="reviews-header">
        <div className="overall-stars">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} style={{ width: 16, height: 16, fill: "#f59e0b", color: "#f59e0b" }} />
          ))}
          <span className="overall-score">4.8 / 5</span>
        </div>
        <h2 className="reviews-title">ماذا يقول عملاؤنا</h2>
        <p className="reviews-sub">تقييمات موثقة من عملائنا داخل المملكة</p>
      </div>

      {/* grid 2 columns */}
      <div className="reviews-grid">
        {REVIEWS.map((r, i) => (
          <div key={i} className="review-card" style={{ animationDelay: `${i * 60}ms` }}>
            {/* stars */}
            <div className="r-stars">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} style={{ width: 12, height: 12, fill: s <= r.stars ? "#f59e0b" : "#e5e7eb", color: s <= r.stars ? "#f59e0b" : "#e5e7eb" }} />
              ))}
            </div>
            {/* text */}
            <p className="r-text">"{r.text}"</p>
            {/* reviewer */}
            <div className="r-author">
              <img src={r.avatar} alt={r.name} className="r-avatar" />
              <div>
                <div className="r-name">
                  {r.name} <CheckCircle style={{ width: 11, height: 11, color: "#3b82f6", display: "inline" }} />
                </div>
                <div className="r-city">{r.city}</div>
              </div>
              <span className="r-verified">موثّق</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
