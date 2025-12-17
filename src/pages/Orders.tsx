import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Package, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Order {
  id: string;
  items: Array<{
    drone: { name: string; image: string };
    quantity: number;
    totalPrice: number;
  }>;
  total_price: number;
  status: string;
  payment_method: string;
  created_at: string;
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setOrders(data as unknown as Order[]);
      }
      setIsLoading(false);
    };

    fetchOrders();
  }, [user, navigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH").format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Package className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "ชำระเงินแล้ว";
      case "pending":
        return "รอชำระเงิน";
      case "shipped":
        return "กำลังจัดส่ง";
      case "delivered":
        return "จัดส่งแล้ว";
      default:
        return status;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "credit_card":
        return "บัตรเครดิต/เดบิต";
      case "promptpay":
        return "พร้อมเพย์";
      case "bank_transfer":
        return "โอนเงินผ่านธนาคาร";
      default:
        return method;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          กลับ
        </Button>

        <h1 className="font-display text-3xl font-bold mb-8">ประวัติคำสั่งซื้อ</h1>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground">กำลังโหลด...</p>
          </div>
        ) : orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-display text-xl font-bold mb-2">ยังไม่มีคำสั่งซื้อ</h2>
            <p className="text-muted-foreground mb-6">เริ่มสร้างโดรนในแบบของคุณได้เลย</p>
            <Button variant="hero" onClick={() => navigate("/customize/skytech-custom")}>
              สร้างโดรนของคุณ
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">หมายเลขคำสั่งซื้อ</p>
                    <p className="font-mono font-medium">{order.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="text-sm font-medium">{getStatusText(order.status)}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-4">
                  <div className="space-y-3">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-3">
                        <img
                          src={item.drone.image}
                          alt={item.drone.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.drone.name}</p>
                          <p className="text-sm text-muted-foreground">จำนวน: {item.quantity}</p>
                          <p className="text-sm text-primary font-medium">฿{formatPrice(item.totalPrice)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">วันที่สั่งซื้อ: </span>
                    <span>{formatDate(order.created_at)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ชำระผ่าน: </span>
                    <span>{getPaymentMethodText(order.payment_method)}</span>
                  </div>
                  <div className="ml-auto">
                    <span className="text-muted-foreground">ยอดรวม: </span>
                    <span className="font-display font-bold text-primary">฿{formatPrice(order.total_price)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
