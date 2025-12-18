import { motion } from "framer-motion";
import { ArrowRight, Wrench, Cpu, Camera, Battery } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroDrone from "@/assets/hero-drone.jpg";

const features = [
  { icon: Wrench, label: "13 หมวดหมู่" },
  { icon: Cpu, label: "50+ ตัวเลือก" },
  { icon: Camera, label: "กล้อง 8K" },
  { icon: Battery, label: "55 นาที" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Animated Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10"
            >
              <span className="text-sm text-primary font-medium">
                🛠️ Build Your Own Drone
              </span>
            </motion.div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              สร้างโดรน
              <br />
              <span className="gradient-text">ในแบบของคุณ</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              ปรับแต่งโดรนทุกชิ้นส่วนด้วยตัวเอง เลือกเฟรม มอเตอร์ กล้อง Gimbal GPS 
              และอุปกรณ์เสริมอีกมากมาย ให้ตรงกับการใช้งานของคุณ
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/customize/skytech-custom">
                <Button variant="hero" size="xl">
                  เริ่มสร้างโดรน
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Quick Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-border justify-center lg:justify-start"
            >
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50"
                >
                  <feature.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Drone Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />
              
              {/* Drone Image */}
              <motion.img
                src={heroDrone}
                alt="SKYTECH Custom Drone"
                className="relative z-10 w-full max-w-2xl mx-auto"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Floating Labels */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute top-1/4 left-0 glass px-3 py-2 rounded-lg"
              >
                <span className="text-xs font-medium">เฟรมคาร์บอน</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute top-1/3 right-0 glass px-3 py-2 rounded-lg"
              >
                <span className="text-xs font-medium">กล้อง 8K</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-1/4 left-1/4 glass px-3 py-2 rounded-lg"
              >
                <span className="text-xs font-medium">GPS + GLONASS</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-2.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
