import { motion } from "framer-motion";
import { Camera, Battery, Gauge, Shield, Wifi, Settings } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "กล้องคุณภาพสูง",
    description: "ถ่ายภาพและวิดีโอความละเอียดสูงสุด 8K พร้อม Gimbal 3 แกน",
  },
  {
    icon: Battery,
    title: "แบตเตอรี่ทนทาน",
    description: "บินได้นานสูงสุด 55 นาที พร้อมระบบชาร์จเร็ว",
  },
  {
    icon: Gauge,
    title: "ความเร็วสูง",
    description: "ความเร็วสูงสุด 120 km/h เหมาะสำหรับการแข่งขัน",
  },
  {
    icon: Shield,
    title: "ระบบนำร่องอัจฉริยะ",
    description: "หลีกเลี่ยงสิ่งกีดขวางอัตโนมัติด้วย AI",
  },
  {
    icon: Wifi,
    title: "ระยะบินไกล",
    description: "ระยะส่งสัญญาณไกลสูงสุด 15 กิโลเมตร",
  },
  {
    icon: Settings,
    title: "ปรับแต่งได้",
    description: "เลือกอุปกรณ์เสริมตามความต้องการของคุณ",
  },
];

export function Features() {
  return (
    <section className="py-24 relative bg-card/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            ทำไมต้อง<span className="gradient-text">เลือกเรา</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            เทคโนโลยีล้ำสมัยที่รวมอยู่ในโดรนทุกรุ่นของเรา
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 hover:glow-primary transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
