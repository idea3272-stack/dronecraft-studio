import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Pencil, Trash2, Save, X, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { useCustomizationCategories, useCustomizationOptions, CustomizationOption } from "@/hooks/useCustomizationOptions";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface OptionForm {
  id: string;
  name: string;
  price: number;
  description: string;
  is_default: boolean;
}

export default function AdminPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, isLoading: roleLoading } = useUserRole();
  const { data: categories, isLoading: catLoading } = useCustomizationCategories();
  const { data: options, isLoading: optLoading } = useCustomizationOptions();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingOption, setEditingOption] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<OptionForm>({ id: "", name: "", price: 0, description: "", is_default: false });
  const [saving, setSaving] = useState(false);

  if (roleLoading || catLoading || optLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12 text-center">
          <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="font-display text-2xl font-bold mb-2">ไม่มีสิทธิ์เข้าถึง</h1>
          <p className="text-muted-foreground mb-6">คุณต้องเป็น Admin เพื่อเข้าถึงหน้านี้</p>
          <Button onClick={() => navigate("/")}>กลับหน้าแรก</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryOptions = options?.filter((o) => o.category_id === selectedCategory) || [];

  const startAdd = () => {
    const maxOrder = categoryOptions.reduce((max, o) => Math.max(max, o.sort_order), 0);
    setForm({ id: "", name: "", price: 0, description: "", is_default: false });
    setIsAdding(true);
    setEditingOption(null);
  };

  const startEdit = (opt: CustomizationOption) => {
    setForm({ id: opt.id, name: opt.name, price: opt.price, description: opt.description || "", is_default: opt.is_default });
    setEditingOption(opt.id);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingOption(null);
    setIsAdding(false);
  };

  const handleSave = async () => {
    if (!form.name || !selectedCategory) return;
    setSaving(true);
    try {
      if (isAdding) {
        const maxOrder = categoryOptions.reduce((max, o) => Math.max(max, o.sort_order), 0);
        const newId = `${selectedCategory}-${Date.now()}`;
        const { error } = await supabase.from("customization_options").insert({
          id: newId,
          category_id: selectedCategory,
          name: form.name,
          price: form.price,
          description: form.description,
          sort_order: maxOrder + 1,
          is_default: form.is_default,
        });
        if (error) throw error;
        toast({ title: "เพิ่มสำเร็จ!", description: `เพิ่ม "${form.name}" แล้ว` });
      } else if (editingOption) {
        const { error } = await supabase.from("customization_options").update({
          name: form.name,
          price: form.price,
          description: form.description,
          is_default: form.is_default,
        }).eq("id", editingOption);
        if (error) throw error;
        toast({ title: "อัปเดตสำเร็จ!", description: `อัปเดต "${form.name}" แล้ว` });
      }
      queryClient.invalidateQueries({ queryKey: ["customization-options"] });
      cancelEdit();
    } catch (err: any) {
      toast({ title: "เกิดข้อผิดพลาด", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (opt: CustomizationOption) => {
    if (!confirm(`ต้องการลบ "${opt.name}" ใช่หรือไม่?`)) return;
    try {
      const { error } = await supabase.from("customization_options").delete().eq("id", opt.id);
      if (error) throw error;
      toast({ title: "ลบสำเร็จ!", description: `ลบ "${opt.name}" แล้ว` });
      queryClient.invalidateQueries({ queryKey: ["customization-options"] });
    } catch (err: any) {
      toast({ title: "เกิดข้อผิดพลาด", description: err.message, variant: "destructive" });
    }
  };

  const formatPrice = (price: number) => new Intl.NumberFormat("th-TH").format(price);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          กลับ
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="font-display text-3xl font-bold">Admin Panel</h1>
          </div>
          <p className="text-muted-foreground">จัดการอุปกรณ์ปรับแต่งโดรน - เพิ่ม แก้ไข หรือลบ options ในแต่ละหมวด</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Categories sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="font-display font-bold mb-3 text-sm text-muted-foreground uppercase">หมวดหมู่</h3>
            {categories?.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); cancelEdit(); }}
                className={`w-full p-3 rounded-xl text-left flex items-center gap-3 transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary/10 border border-primary text-primary"
                    : "glass hover:bg-secondary/50"
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="font-medium text-sm">{cat.label}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {options?.filter((o) => o.category_id === cat.id).length || 0}
                </span>
              </button>
            ))}
          </div>

          {/* Options panel */}
          <div className="lg:col-span-3">
            {!selectedCategory ? (
              <div className="glass rounded-2xl p-12 text-center">
                <p className="text-muted-foreground">เลือกหมวดหมู่ทางซ้ายเพื่อจัดการ options</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold">
                    {categories?.find((c) => c.id === selectedCategory)?.icon}{" "}
                    {categories?.find((c) => c.id === selectedCategory)?.label}
                  </h2>
                  <Button onClick={startAdd} size="sm" disabled={isAdding}>
                    <Plus className="h-4 w-4 mr-1" />
                    เพิ่ม Option
                  </Button>
                </div>

                {/* Add form */}
                {isAdding && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-4 border-2 border-primary/30">
                    <h4 className="font-bold mb-3">เพิ่ม Option ใหม่</h4>
                    <OptionFormFields form={form} setForm={setForm} />
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" onClick={handleSave} disabled={saving || !form.name}>
                        {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
                        บันทึก
                      </Button>
                      <Button size="sm" variant="ghost" onClick={cancelEdit}>
                        <X className="h-4 w-4 mr-1" />
                        ยกเลิก
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Options list */}
                {categoryOptions.map((opt) => (
                  <motion.div key={opt.id} layout className="glass rounded-xl p-4">
                    {editingOption === opt.id ? (
                      <>
                        <OptionFormFields form={form} setForm={setForm} />
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" onClick={handleSave} disabled={saving || !form.name}>
                            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
                            บันทึก
                          </Button>
                          <Button size="sm" variant="ghost" onClick={cancelEdit}>
                            <X className="h-4 w-4 mr-1" />
                            ยกเลิก
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{opt.name}</span>
                            {opt.is_default && (
                              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">Default</span>
                            )}
                          </div>
                          {opt.description && <p className="text-sm text-muted-foreground mt-1">{opt.description}</p>}
                          <p className="text-sm text-primary font-medium mt-1">
                            {opt.price > 0 ? `+฿${formatPrice(opt.price)}` : "รวมในราคา"}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => startEdit(opt)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => handleDelete(opt)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}

                {categoryOptions.length === 0 && !isAdding && (
                  <div className="glass rounded-xl p-8 text-center text-muted-foreground">
                    ยังไม่มี option ในหมวดนี้
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function OptionFormFields({ form, setForm }: { form: OptionForm; setForm: (f: OptionForm) => void }) {
  return (
    <div className="grid gap-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">ชื่อ</label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="ชื่อ option" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">ราคาเพิ่ม (฿)</label>
          <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">คำอธิบาย</label>
        <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
      </div>
    </div>
  );
}
