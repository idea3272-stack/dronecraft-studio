import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  const team = [
    {
      name: "Nontakon Noinart",
      role: "Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Pannathon Jamsawang",
      role: "Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Phirachat Tuamjui",
      role: "Developer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Tachaphon Kobthongsirichok",
      role: "Developer",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Krittin Thongtem",
      role: "Developer",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              เกี่ยวกับ <span className="text-primary">SkyTech</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              พบกับทีมผู้พัฒนาของเราที่มุ่งมั่นสร้างสรรค์นวัตกรรมเพื่อตอบโจทย์ทุกความต้องการ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-bold text-center mb-12"
          >
            ทีมผู้บริหาร
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary/20">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display font-bold text-sm md:text-base">{member.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-bold text-center mb-12"
          >
            ติดต่อเรา
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-bold mb-2">ที่อยู่</h3>
              <p className="text-sm text-muted-foreground">
                123 ถนนนวัตกรรม<br />
                แขวงห้วยขวาง กรุงเทพฯ 10310
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-bold mb-2">โทรศัพท์</h3>
              <p className="text-sm text-muted-foreground">
                02-xxx-xxxx<br />
                (จันทร์-ศุกร์ 9:00-18:00)
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-bold mb-2">อีเมล</h3>
              <p className="text-sm text-muted-foreground">
                info@skytech.co.th<br />
                support@skytech.co.th
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
