import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DroneCard } from "@/components/DroneCard";
import { drones } from "@/data/drones";

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
            โดรน<span className="gradient-text">ยอดนิยม</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            เลือกโดรนที่เหมาะกับสไตล์ของคุณ ไม่ว่าจะเป็นการถ่ายภาพมืออาชีพ 
            การแข่งขัน หรือการท่องเที่ยว
          </p>
        </motion.div>

        {/* Drone Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {drones.map((drone, index) => (
            <DroneCard key={drone.id} drone={drone} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/products">
            <Button variant="outline" size="lg">
              ดูสินค้าทั้งหมด
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
