import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Drone } from "@/types/drone";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, Compass } from "lucide-react";

interface DroneCardProps {
  drone: Drone;
  index?: number;
}

export function DroneCard({ drone, index = 0 }: DroneCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH").format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative rounded-2xl overflow-hidden glass transition-all duration-300 hover:glow-primary">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary/50">
          <img
            src={drone.image}
            alt={drone.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {drone.isNew && (
              <Badge className="bg-primary text-primary-foreground">ใหม่</Badge>
            )}
            {drone.isBestSeller && (
              <Badge className="bg-accent text-accent-foreground">ขายดี</Badge>
            )}
          </div>

          {/* Category */}
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="glass">
              {drone.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl font-bold mb-2">{drone.name}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {drone.description}
          </p>

          {/* Quick Specs */}
          <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 text-primary" />
              {drone.specs.speed}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-primary" />
              {drone.specs.flightTime}
            </div>
            <div className="flex items-center gap-1">
              <Compass className="h-3.5 w-3.5 text-primary" />
              {drone.specs.range}
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <span className="text-xs text-muted-foreground">เริ่มต้น</span>
              <p className="font-display text-xl font-bold text-primary">
                ฿{formatPrice(drone.basePrice)}
              </p>
            </div>
            <Link to={`/customize/${drone.id}`}>
              <Button variant="default" size="sm">
                ปรับแต่ง
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
