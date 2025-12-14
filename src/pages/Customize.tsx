import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingCart, Check, ChevronDown, ChevronUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { 
  baseDrone, 
  customizationOptions, 
  defaultCustomization, 
  categoryLabels, 
  categoryIcons,
  ExtendedCustomization 
} from "@/data/drones";

type CategoryKey = keyof ExtendedCustomization;

export default function CustomizePage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [customization, setCustomization] = useState<ExtendedCustomization>(defaultCustomization);
  const [expandedCategory, setExpandedCategory] = useState<CategoryKey | null>("frame");

  const calculateTotalPrice = () => {
    return baseDrone.basePrice + Object.values(customization).reduce((sum, item) => sum + item.price, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH").format(price);
  };

  const handleAddToCart = () => {
    addToCart(baseDrone, customization as any);
    toast({
      title: "เพิ่มสินค้าแล้ว!",
      description: "SKYTECH Custom ถูกเพิ่มลงในตะกร้าสินค้า",
    });
  };

  const toggleCategory = (category: CategoryKey) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const categories = Object.keys(customizationOptions) as CategoryKey[];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          กลับ
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10">
            <span className="text-sm text-primary font-medium">🛠️ Build Your Own Drone</span>
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            สร้างโดรน<span className="gradient-text">ในแบบของคุณ</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            เลือกอุปกรณ์ทุกชิ้นด้วยตัวเอง ปรับแต่งให้ตรงกับความต้องการ ตั้งแต่เฟรม มอเตอร์ กล้อง ไปจนถึงอุปกรณ์เสริมต่างๆ
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Drone Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-6">
              <div className="aspect-square rounded-3xl overflow-hidden glass">
                <img
                  src={baseDrone.image}
                  alt={baseDrone.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Selected Summary */}
              <div className="p-4 rounded-2xl glass">
                <h3 className="font-display font-bold mb-3 text-sm">สรุปการเลือก</h3>
                <div className="space-y-1.5 text-xs max-h-48 overflow-y-auto">
                  {categories.map((cat) => (
                    <div key={cat} className="flex justify-between items-center">
                      <span className="text-muted-foreground truncate mr-2">
                        {categoryIcons[cat]} {categoryLabels[cat]}
                      </span>
                      <span className="text-foreground truncate text-right flex-1">
                        {customization[cat].name.split('(')[0].trim()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Customization Options */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-3"
          >
            {categories.map((category, index) => {
              const options = customizationOptions[category];
              const selected = customization[category];
              const isExpanded = expandedCategory === category;

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-2xl overflow-hidden"
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{categoryIcons[category]}</span>
                      <div className="text-left">
                        <h3 className="font-display font-bold">{categoryLabels[category]}</h3>
                        <p className="text-sm text-muted-foreground">{selected.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {selected.price > 0 && (
                        <span className="text-sm text-primary font-medium">
                          +฿{formatPrice(selected.price)}
                        </span>
                      )}
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {/* Options */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-border"
                      >
                        <div className="p-4 space-y-2">
                          {options.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setCustomization({ ...customization, [category]: option })}
                              className={`w-full p-3 rounded-xl border transition-all text-left flex items-start gap-3 ${
                                selected.id === option.id
                                  ? "border-primary bg-primary/10"
                                  : "border-border hover:border-primary/50 bg-card/50"
                              }`}
                            >
                              <div
                                className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                  selected.id === option.id
                                    ? "border-primary bg-primary"
                                    : "border-muted-foreground"
                                }`}
                              >
                                {selected.id === option.id && (
                                  <Check className="h-3 w-3 text-primary-foreground" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-medium text-sm">{option.name}</span>
                                  <span
                                    className={`text-sm flex-shrink-0 ${
                                      option.price > 0 ? "text-primary" : "text-muted-foreground"
                                    }`}
                                  >
                                    {option.price > 0 ? `+฿${formatPrice(option.price)}` : "รวมในราคา"}
                                  </span>
                                </div>
                                {option.description && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {option.description}
                                  </p>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Sticky Price Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 glass border-t border-border z-40"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-sm text-muted-foreground">ราคารวมทั้งหมด</span>
                <p className="font-display text-2xl md:text-3xl font-bold text-primary">
                  ฿{formatPrice(calculateTotalPrice())}
                </p>
              </div>
              <Button variant="hero" size="lg" onClick={handleAddToCart} className="flex-shrink-0">
                <ShoppingCart className="h-5 w-5 mr-2" />
                เพิ่มลงตะกร้า
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Spacer for sticky bar */}
        <div className="h-24" />
      </main>

      <Footer />
    </div>
  );
}
