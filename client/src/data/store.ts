export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAt: number;
  images: string[];
  ratingAvg: number;
  reviewsCount: number;
  discountLabel: string;
  description: string;
  shortDescription: string;
  features: string[];
}

export const storeData = {
  brandName: "متجر هلا",
  whatsappNumber: "966500000000", // Placeholder
  currency: "ر.س",
  freeShippingThreshold: 199,
  
  hero: {
    title: "منتجات مختارة تجعل يومك أسهل",
    subtitle: "جودة موثوقة، أسعار مناسبة، وتجربة شراء بسيطة من الطلب حتى وصول المنتج إلى بابك.",
    cta: "اكتشف المنتجات",
    image: "/images/banner-hero.jpg"
  },

  features: [
    {
      title: "شحن إلى جميع المناطق",
      description: "توصيل سريع داخل المملكة",
      icon: "Truck"
    },
    {
      title: "جودة المواد",
      description: "منتجات مختارة بعناية",
      icon: "ShieldCheck"
    },
    {
      title: "دفع آمن",
      description: "الدفع عند الاستلام متاح",
      icon: "Wallet"
    },
    {
      title: "دعم العملاء",
      description: "من الإثنين إلى السبت",
      icon: "Headphones"
    }
  ],

  products: [
    {
      id: "1",
      slug: "leather-phone-case",
      name: "حافظ جلدي للهاتف",
      category: "اكسسوارات",
      price: 23.00,
      compareAt: 34.00,
      images: [
        "/images/products/phone-case-1.jpg",
        "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&auto=format&fit=crop&q=60"
      ],
      ratingAvg: 4.5,
      reviewsCount: 12,
      discountLabel: "خصم 50%",
      shortDescription: "جراب جلدي فاخر يوفر حماية فائقة ومظهر أنيق لهاتفك.",
      description: "صمم هذا الحافظ الجلدي بعناية فائقة ليوفر لهاتفك الحماية التي يستحقها مع الحفاظ على المظهر الأنيق. مصنوع من جلد طبيعي عالي الجودة يزداد جمالاً مع مرور الوقت.",
      features: ["جلد طبيعي", "حماية من الصدمات", "تصميم نحيف", "ملمس ناعم"]
    },
    {
      id: "2",
      slug: "tech-backpack",
      name: "حقيبة سفر",
      category: "حقائب",
      price: 99.00,
      compareAt: 144.50,
      images: [
        "/images/products/backpack-1.jpg"
      ],
      ratingAvg: 4.8,
      reviewsCount: 24,
      discountLabel: "خصم 30%",
      shortDescription: "حقيبة ظهر متعددة الاستخدامات مثالية للسفر والعمل.",
      description: "حقيبة ظهر واسعة وعملية مصممة لتلبية جميع احتياجاتك أثناء التنقل. تحتوي على جيوب متعددة لتنظيم أغراضك بشكل مثالي.",
      features: ["مقاومة للماء", "جيوب متعددة", "مبطنة للحماية", "خفيفة الوزن"]
    },
    {
      id: "3",
      slug: "tech-pouch",
      name: "حقيبة تكنولوجيا مدمجة",
      category: "اكسسوارات",
      price: 44.50,
      compareAt: 73.00,
      images: [
        "/images/products/pouch-1.jpg"
      ],
      ratingAvg: 4.7,
      reviewsCount: 8,
      discountLabel: "خصم 40%",
      shortDescription: "حقيبة صغيرة لتنظيم الكابلات والشواحن والاكسسوارات.",
      description: "الحل الأمثل لتنظيم جميع ملحقاتك الإلكترونية في مكان واحد. تصميم مدمج وأنيق يسهل حمله في أي حقيبة.",
      features: ["سحاب متين", "تنظيم داخلي", "حجم مدمج", "تصميم عصري"]
    },
    {
      id: "4",
      slug: "mini-bag",
      name: "حقيبة كتف صغيرة خفيفة الوزن",
      category: "حقائب",
      price: 24.00,
      compareAt: 31.00,
      images: [
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=60"
      ],
      ratingAvg: 4.2,
      reviewsCount: 5,
      discountLabel: "خصم 20%",
      shortDescription: "حقيبة كتف عصرية وخفيفة الوزن للاستخدام اليومي.",
      description: "حقيبة كتف عملية وأنيقة، مثالية لحمل أغراضك الأساسية. مصنوعة من مواد عالية الجودة لضمان المتانة.",
      features: ["حزام قابل للتعديل", "خفيفة الوزن", "جيوب آمنة"]
    }
  ],

  faq: [
    {
      question: "ما هي طرق الدفع التي تقبلها؟",
      answer: "نقبل الدفع عند الاستلام داخل المملكة العربية السعودية، بالإضافة إلى البطاقات الائتمانية ومدى."
    },
    {
      question: "ما هي سياسة الإلغاء؟",
      answer: "يمكنك إلغاء طلبك قبل شحنه عن طريق التواصل معنا عبر الواتساب. إذا تم الشحن، يطبق نظام الإرجاع."
    },
    {
      question: "كيف يمكنني إلغاء طلب؟",
      answer: "راسلنا واتساب برقم الجوال واسم المنتج وسنقم بإلغاء الطلب فوراً."
    },
    {
      question: "كم من الوقت تستغرق الشحن؟",
      answer: "عادة ما يستغرق الشحن من 2 إلى 5 أيام عمل داخل المملكة."
    },
    {
      question: "متى سيتم شحن طلبي؟",
      answer: "يتم تجهيز الطلبات خلال 24 ساعة من تأكيد الطلب."
    }
  ],
  
  reviews: [
    {
      name: "سارة ك",
      location: "الكويت، الكويت",
      text: "لم أشعر أبداً بخيبة أمل في مشترياتي. منتجاتهم دائماً من أعلى جودة، والأسعار معقولة جداً. سأستمر في أن أكون عميلاً مخلصاً لسنوات قادمة.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60"
    },
    {
      name: "علي ب",
      location: "الرياض، المملكة العربية السعودية",
      text: "تجاوزت هذه المتجر توقعاتي! جربت العديد من المتاجر ولم يحقق أي منها طموحاتي، المنتجات مثالية، وعملية الطلب بسيطة، والتسليم سريع.",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60"
    },
    {
      name: "هابي د",
      location: "الرباط، المغرب",
      text: "في البداية، كنت متردداً في الطلب، لكنني سعيد جداً بأنني قمت بذلك. عملية الطلب بسيطة، وتم التسليم بسرعة. المنتجات أفضل مما توقعته.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60"
    }
  ]
};
