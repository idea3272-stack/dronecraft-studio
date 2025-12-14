import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { drones, customizationOptions, defaultCustomization } from "@/data/drones";
import { DroneCustomization } from "@/types/drone";

export default function CustomizePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const drone = drones.find((d) => d.id === id);
  const [customization, setCustomization] = useState<DroneCustomization>(defaultCustomization);

  if (!drone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>ไม่พบสินค้า</p>
      </div>
    );
  }

  const totalPrice =
    drone.basePrice +
    customization.camera.price +
    customization.battery.price +
    customization.propeller.price +
    customization.sensor.price;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH").format(price);
  };

  const handleAddToCart = () => {
    addToCart(drone, customization);
    toast({
      title: "เพิ่มสินค้าแล้ว!",
      description: `${drone.name} ถูกเพิ่มลงในตะกร้าสินค้า`,
    });
  };

  const CustomizationSection = ({
    title,
    options,
    selected,
    onSelect,
    field,
  }: {
    title: string;
    options: { id: string; name: string; price: number }[];
    selected: { id: string; name: string; price: number };
    onSelect: (option: { id: string; name: string; price: number }) => void;
    field: keyof DroneCustomization;
  }) => (
    <div className="mb-6">
      <h3 className="font-display font-bold mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option)}
            className={`w-full p-4 rounded-xl border transition-all text-left flex items-center justify-between ${
              selected.id === option.id
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50 bg-card"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected.id === option.id ? "border-primary bg-primary" : "border-muted-foreground"
                }`}
              >
                {selected.id === option.id && <Check className="h-3 w-3 text-primary-foreground" />}
              </div>
              <span className="font-medium">{option.name}</span>
            </div>
            <span className={`text-sm ${option.price > 0 ? "text-primary" : "text-muted-foreground"}`}>
              {option.price > 0 ? `+฿${formatPrice(option.price)}` : "รวมในราคา"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          กลับ
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Image Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="sticky top-24">
              <div className="aspect-square rounded-3xl overflow-hidden glass">
                <img
                  src={drone.image}
                  alt={drone.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Specs */}
              <div className="mt-6 p-6 rounded-2xl glass">
                <h3 className="font-display font-bold mb-4">สเปค</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">กล้อง</span>
                    <p className="font-medium">{drone.specs.camera}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">แบตเตอรี่</span>
                    <p className="font-medium">{drone.specs.battery}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">เวลาบิน</span>
                    <p className="font-medium">{drone.specs.flightTime}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ระยะบิน</span>
                    <p className="font-medium">{drone.specs.range}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ความเร็ว</span>
                    <p className="font-medium">{drone.specs.speed}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Customization Options */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="mb-6">
              <span className="text-sm text-primary font-medium">{drone.category}</span>
              <h1 className="font-display text-3xl md:text-4xl font-bold mt-2">
                {drone.name}
              </h1>
              <p className="text-muted-foreground mt-2">{drone.description}</p>
            </div>

            <div className="p-6 rounded-2xl glass mb-8">
              <CustomizationSection
                title="กล้อง"
                options={customizationOptions.camera}
                selected={customization.camera}
                onSelect={(opt) => setCustomization({ ...customization, camera: opt })}
                field="camera"
              />

              <CustomizationSection
                title="แบตเตอรี่"
                options={customizationOptions.battery}
                selected={customization.battery}
                onSelect={(opt) => setCustomization({ ...customization, battery: opt })}
                field="battery"
              />

              <CustomizationSection
                title="ใบพัด"
                options={customizationOptions.propeller}
                selected={customization.propeller}
                onSelect={(opt) => setCustomization({ ...customization, propeller: opt })}
                field="propeller"
              />

              <CustomizationSection
                title="เซนเซอร์เสริม"
                options={customizationOptions.sensor}
                selected={customization.sensor}
                onSelect={(opt) => setCustomization({ ...customization, sensor: opt })}
                field="sensor"
              />
            </div>

            {/* Price Summary */}
            <div className="p-6 rounded-2xl glass sticky bottom-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">ราคาเริ่มต้น</span>
                <span>฿{formatPrice(drone.basePrice)}</span>
              </div>
              {customization.camera.price > 0 && (
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">{customization.camera.name}</span>
                  <span className="text-primary">+฿{formatPrice(customization.camera.price)}</span>
                </div>
              )}
              {customization.battery.price > 0 && (
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">{customization.battery.name}</span>
                  <span className="text-primary">+฿{formatPrice(customization.battery.price)}</span>
                </div>
              )}
              {customization.propeller.price > 0 && (
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">{customization.propeller.name}</span>
                  <span className="text-primary">+฿{formatPrice(customization.propeller.price)}</span>
                </div>
              )}
              {customization.sensor.price > 0 && (
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">{customization.sensor.name}</span>
                  <span className="text-primary">+฿{formatPrice(customization.sensor.price)}</span>
                </div>
              )}
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-bold text-lg">ราคารวม</span>
                  <span className="font-display font-bold text-2xl text-primary">
                    ฿{formatPrice(totalPrice)}
                  </span>
                </div>
                <Button variant="hero" size="lg" className="w-full" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  เพิ่มลงตะกร้า
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
