import { motion } from "framer-motion";
import { Target, Users, Rocket, Award, MapPin, Mail, Phone } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  const stats = [
    { value: "5+", label: "ปีประสบการณ์" },
    { value: "1,000+", label: "ลูกค้าที่ไว้วางใจ" },
    { value: "50+", label: "รุ่นโดรนที่ออกแบบ" },
    { value: "24/7", label: "บริการหลังการขาย" },
  ];

  const values = [
    {
      icon: Target,
      title: "วิสัยทัศน์",
      description: "เป็นผู้นำด้านเทคโนโลยีโดรนที่ตอบโจทย์ทุกความต้องการของลูกค้าในภูมิภาคเอเชียตะวันออกเฉียงใต้",
    },
    {
      icon: Users,
      title: "พันธกิจ",
      description: "มุ่งมั่นพัฒนาและส่งมอบโดรนคุณภาพสูงที่ปรับแต่งได้ตามความต้องการ พร้อมบริการที่เป็นเลิศ",
    },
    {
      icon: Rocket,
      title: "นวัตกรรม",
      description: "ไม่หยุดยั้งในการค้นคว้าและพัฒนาเทคโนโลยีใหม่ๆ เพื่อยกระดับประสบการณ์การใช้งานโดรน",
    },
    {
      icon: Award,
      title: "คุณภาพ",
      description: "ทุกชิ้นส่วนผ่านการทดสอบมาตรฐานสากล รับประกันคุณภาพและความปลอดภัยสูงสุด",
    },
  ];

  const team = [
    {
      name: "สมชาย วิศวกรรม",
      role: "ผู้ก่อตั้ง & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "สมหญิง เทคโนโลยี",
      role: "หัวหน้าฝ่ายวิจัยและพัฒนา",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "วิชัย นวัตกรรม",
      role: "หัวหน้าฝ่ายออกแบบ",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
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
              เราคือผู้เชี่ยวชาญด้านโดรนที่มุ่งมั่นสร้างสรรค์นวัตกรรมเพื่อตอบโจทย์ทุกความต้องการ 
              ด้วยประสบการณ์กว่า 5 ปี และทีมวิศวกรมืออาชีพ เราพร้อมนำเสนอโดรนที่ดีที่สุดสำหรับคุณ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-display text-3xl font-bold mb-6">เรื่องราวของเรา</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  SkyTech ก่อตั้งขึ้นในปี 2019 ด้วยความหลงใหลในเทคโนโลยีการบิน 
                  เราเริ่มต้นจากทีมวิศวกรเพียง 3 คน ที่มีความฝันเดียวกัน - 
                  การสร้างโดรนที่ทุกคนสามารถปรับแต่งได้ตามความต้องการ
                </p>
                <p>
                  ปัจจุบัน เราเติบโตเป็นบริษัทชั้นนำด้านโดรนในประเทศไทย 
                  ด้วยทีมงานกว่า 30 คน และลูกค้ากว่า 1,000 รายที่ไว้วางใจ
                </p>
                <p>
                  แนวคิด "Build Your Own Drone" คือหัวใจหลักของเรา - 
                  เราเชื่อว่าทุกคนควรมีโดรนที่เหมาะกับการใช้งานของตนเอง 
                  ไม่ว่าจะเป็นงานถ่ายภาพ, การสำรวจ, หรือเพื่อความบันเทิง
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden glass">
                <img
                  src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800"
                  alt="Drone in flight"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-bold text-center mb-12"
          >
            ค่านิยมองค์กร
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
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
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary/20">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
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
