import { storeData } from "@/data/store";
import { Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="mini-footer">
      <div className="mf-top">
        <span className="mf-brand">{storeData.brandName}</span>
        <div className="mf-links">
          <a href="#">سياسة الخصوصية</a>
          <span className="mf-dot" />
          <a href="#">الشروط والأحكام</a>
          <span className="mf-dot" />
          <a href="#">سياسة الإرجاع</a>
        </div>
        <div className="mf-social">
          <a href="#"><Instagram className="mf-icon" /></a>
          <a href="#"><Twitter className="mf-icon" /></a>
        </div>
      </div>
      <div className="mf-bottom">
        <p>© 2024 {storeData.brandName}. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}
