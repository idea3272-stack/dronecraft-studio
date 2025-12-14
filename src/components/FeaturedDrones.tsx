import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { categoryLabels, categoryIcons, customizationOptions, ExtendedCustomization } from "@/data/drones";

const showcaseCategories: (keyof ExtendedCustomization)[] = [
  "frame",
  "camera",
  "battery",
  "controller",
  "sensor",
  "fpv",
];

export function FeaturedDrones() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            ปรับแต่ง<span className="gradient-text">ทุกชิ้นส่วน</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            เลือกอุปกรณ์ได้ทุกหมวดหมู่ ตั้งแต่เฟรมโดรน มอเตอร์ กล้อง ไปจนถึงอุปกรณ์เสริมต่างๆ
            มากกว่า 50 ตัวเลือกให้คุณปรับแต่ง
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {showcaseCategories.map((category, index) => {
            const options = customizationOptions[category];
            const optionCount = options.length;
            const maxPrice = Math.max(...options.map((o) => o.price));

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 hover:glow-primary transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl group-hover:bg-primary/20 transition-colors">
                    {categoryIcons[category]}
                  </div>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                    {optionCount} ตัวเลือก
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold mb-2">
                  {categoryLabels[category]}
                </h3>

                <div className="space-y-1.5 mb-4">
                  {options.slice(0, 3).map((option) => (
                    <div
                      key={option.id}
                      className="text-sm text-muted-foreground truncate"
                    >
                      • {option.name}
                    </div>
                  ))}
                  {optionCount > 3 && (
                    <div className="text-sm text-primary">
                      + {optionCount - 3} ตัวเลือกอื่นๆ
                    </div>
                  )}
                </div>

                {maxPrice > 0 && (
                  <p className="text-xs text-muted-foreground">
                    ราคาสูงสุด: <span className="text-primary">+฿{new Intl.NumberFormat("th-TH").format(maxPrice)}</span>
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* All Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 mb-12"
        >
          <h3 className="font-display font-bold mb-4 text-center">ทุกหมวดหมู่ที่ปรับแต่งได้</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {(Object.keys(categoryLabels) as (keyof ExtendedCustomization)[]).map((category) => (
              <div
                key={category}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-sm"
              >
                <span>{categoryIcons[category]}</span>
                <span>{categoryLabels[category]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/customize/skytech-custom">
            <Button variant="hero" size="xl">
              เริ่มสร้างโดรนของคุณ
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
