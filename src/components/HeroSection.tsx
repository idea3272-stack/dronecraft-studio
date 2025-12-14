import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroDrone from "@/assets/hero-drone.jpg";

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
                🚀 โดรนรุ่นใหม่ล่าสุด 2024
              </span>
            </motion.div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              ยกระดับการบิน
              <br />
              <span className="gradient-text">สู่ความเป็นมืออาชีพ</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              สัมผัสประสบการณ์การบินโดรนที่เหนือระดับ ด้วยเทคโนโลยีล้ำสมัย 
              กล้องคุณภาพสูง และระบบควบคุมที่แม่นยำ
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/products">
                <Button variant="hero" size="xl">
                  เลือกซื้อโดรน
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="glass" size="xl">
                <Play className="mr-2 h-5 w-5" />
                ดูวิดีโอ
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border"
            >
              {[
                { value: "50+", label: "รุ่นโดรน" },
                { value: "10K+", label: "ลูกค้า" },
                { value: "24/7", label: "ซัพพอร์ต" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-display text-2xl md:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
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
                alt="Featured Drone"
                className="relative z-10 w-full max-w-2xl mx-auto animate-float"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
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
