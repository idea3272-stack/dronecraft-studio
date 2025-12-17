import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { categoryLabels, ExtendedCustomization } from "@/data/drones";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH").format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          กลับ
        </Button>

        <h1 className="font-display text-3xl font-bold mb-8">ตะกร้าสินค้า</h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-display text-xl font-bold mb-2">ตะกร้าของคุณว่างเปล่า</h2>
            <p className="text-muted-foreground mb-6">เริ่มสร้างโดรนในแบบของคุณได้เลย</p>
            <Link to="/customize/skytech-custom">
              <Button variant="hero">สร้างโดรนของคุณ</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-2xl p-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.drone.image}
                      alt={item.drone.name}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-display font-bold">{item.drone.name}</h3>
                          <p className="text-sm text-muted-foreground">Build Your Own Drone</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(index)}
                          className="text-destructive hover:text-destructive flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Customizations - Scrollable */}
                      <div className="mt-2 max-h-24 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-muted-foreground">
                          {(Object.keys(item.customization) as (keyof ExtendedCustomization)[]).map((key) => {
                            const custom = item.customization[key];
                            if (custom.price === 0 && custom.name.includes("ไม่")) return null;
                            return (
                              <p key={key} className="truncate">
                                {categoryLabels[key]}: {custom.name.split('(')[0].trim()}
                              </p>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-display font-bold text-primary">
                          ฿{formatPrice(item.totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="glass rounded-2xl p-6 sticky top-24">
                <h2 className="font-display text-xl font-bold mb-6">สรุปคำสั่งซื้อ</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">สินค้า ({items.length} รายการ)</span>
                    <span>฿{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ค่าจัดส่ง</span>
                    <span className="text-primary">ฟรี</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-display font-bold">ยอดรวมทั้งหมด</span>
                    <span className="font-display font-bold text-xl text-primary">
                      ฿{formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>

                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  onClick={() => navigate("/checkout")}
                >
                  ดำเนินการชำระเงิน
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  รองรับการชำระเงินผ่านบัตรเครดิต/เดบิต และ E-Wallet
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
