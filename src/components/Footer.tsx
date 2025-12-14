import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="font-display text-2xl font-bold gradient-text">
              SKYTECH
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              ผู้นำด้านโดรนและอุปกรณ์การบินในประเทศไทย มุ่งมั่นนำเสนอเทคโนโลยีล้ำสมัยเพื่อประสบการณ์ที่ดีที่สุด
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold mb-4">สินค้า</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-primary transition-colors">โดรนทั้งหมด</Link></li>
              <li><Link to="/products?category=racing" className="hover:text-primary transition-colors">โดรนเรซซิ่ง</Link></li>
              <li><Link to="/products?category=professional" className="hover:text-primary transition-colors">โดรนมืออาชีพ</Link></li>
              <li><Link to="/products?category=compact" className="hover:text-primary transition-colors">โดรนพกพา</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">บริการ</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">ศูนย์ซ่อมบำรุง</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">ฝึกอบรม</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">เช่าโดรน</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">ประกันโดรน</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">ติดต่อเรา</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>123 ถนนสุขุมวิท กรุงเทพฯ 10110</li>
              <li>โทร: 02-123-4567</li>
              <li>อีเมล: info@skytech.co.th</li>
              <li>เปิดให้บริการ: จ-ศ 9:00-18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 SKYTECH. สงวนลิขสิทธิ์ทั้งหมด</p>
        </div>
      </div>
    </footer>
  );
}
