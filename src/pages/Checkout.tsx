import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Wallet, Building2, CheckCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type PaymentMethod = "credit_card" | "bank_transfer" | "promptpay";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH").format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "กรุณาเข้าสู่ระบบ",
        description: "คุณต้องเข้าสู่ระบบก่อนทำการสั่งซื้อ",
      });
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      toast({
        variant: "destructive",
        title: "ตะกร้าว่างเปล่า",
        description: "กรุณาเพิ่มสินค้าก่อนทำการสั่งซื้อ",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Save order to database
    const orderItems = items.map(item => ({
      drone: { name: item.drone.name, image: item.drone.image },
      customization: item.customization,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
    }));

    const { data, error } = await supabase
      .from("orders")
      .insert([{
        user_id: user.id,
        items: JSON.parse(JSON.stringify(orderItems)),
        total_price: totalPrice,
        status: "paid",
        payment_method: paymentMethod,
        shipping_address: formData.address,
        phone: formData.phone,
      }])
      .select()
      .single();

    setIsProcessing(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถบันทึกคำสั่งซื้อได้ กรุณาลองใหม่อีกครั้ง",
      });
      return;
    }

    setOrderId(data.id);
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center py-16"
          >
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-2">ชำระเงินสำเร็จ!</h1>
            <p className="text-muted-foreground mb-2">ขอบคุณสำหรับคำสั่งซื้อของคุณ</p>
            <p className="text-sm text-muted-foreground mb-8">
              หมายเลขคำสั่งซื้อ: <span className="font-mono text-primary">{orderId?.slice(0, 8).toUpperCase()}</span>
            </p>
            <div className="space-y-3">
              <Button variant="hero" onClick={() => navigate("/orders")} className="w-full">
                ดูประวัติคำสั่งซื้อ
              </Button>
              <Button variant="outline" onClick={() => navigate("/")} className="w-full">
                กลับหน้าแรก
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          กลับ
        </Button>

        <h1 className="font-display text-3xl font-bold mb-8">ชำระเงิน</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Info */}
              <div className="glass rounded-2xl p-6">
                <h2 className="font-display text-lg font-bold mb-4">ข้อมูลการจัดส่ง</h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="ชื่อ นามสกุล"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0xx-xxx-xxxx"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">ที่อยู่จัดส่ง</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="บ้านเลขที่ ถนน ตำบล อำเภอ จังหวัด รหัสไปรษณีย์"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="glass rounded-2xl p-6">
                <h2 className="font-display text-lg font-bold mb-4">วิธีการชำระเงิน</h2>
                <div className="grid gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("credit_card")}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "credit_card"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <CreditCard className="h-6 w-6 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">บัตรเครดิต/เดบิต</p>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, JCB</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("promptpay")}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "promptpay"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Wallet className="h-6 w-6 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">พร้อมเพย์</p>
                      <p className="text-sm text-muted-foreground">สแกน QR Code</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank_transfer")}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "bank_transfer"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Building2 className="h-6 w-6 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">โอนเงินผ่านธนาคาร</p>
                      <p className="text-sm text-muted-foreground">กสิกร, กรุงเทพ, ไทยพาณิชย์</p>
                    </div>
                  </button>
                </div>

                {/* Credit Card Form */}
                {paymentMethod === "credit_card" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 grid gap-4"
                  >
                    <div>
                      <Label htmlFor="cardNumber">หมายเลขบัตร</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required={paymentMethod === "credit_card"}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardExpiry">วันหมดอายุ</Label>
                        <Input
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required={paymentMethod === "credit_card"}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardCvc">CVC</Label>
                        <Input
                          id="cardCvc"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          placeholder="123"
                          required={paymentMethod === "credit_card"}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === "promptpay" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 p-4 bg-muted/50 rounded-xl text-center"
                  >
                    <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">[QR Code จำลอง]</span>
                    </div>
                    <p className="text-sm text-muted-foreground">สแกน QR Code เพื่อชำระเงิน</p>
                  </motion.div>
                )}

                {paymentMethod === "bank_transfer" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 p-4 bg-muted/50 rounded-xl"
                  >
                    <p className="font-medium mb-2">ข้อมูลบัญชี:</p>
                    <p className="text-sm text-muted-foreground">ธนาคารกสิกรไทย</p>
                    <p className="text-sm text-muted-foreground">เลขบัญชี: 123-4-56789-0</p>
                    <p className="text-sm text-muted-foreground">ชื่อบัญชี: บริษัท สกายเทค โดรน จำกัด</p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass rounded-2xl p-6 sticky top-24">
                <h2 className="font-display text-xl font-bold mb-6">สรุปคำสั่งซื้อ</h2>

                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {items.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <img
                        src={item.drone.image}
                        alt={item.drone.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.drone.name}</p>
                        <p className="text-xs text-muted-foreground">จำนวน: {item.quantity}</p>
                        <p className="text-sm text-primary font-medium">฿{formatPrice(item.totalPrice)}</p>
                      </div>
                    </div>
                  ))}
                </div>

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
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isProcessing || items.length === 0}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      กำลังดำเนินการ...
                    </>
                  ) : (
                    "ยืนยันการชำระเงิน"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  ระบบจำลอง - ไม่มีการชำระเงินจริง
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
