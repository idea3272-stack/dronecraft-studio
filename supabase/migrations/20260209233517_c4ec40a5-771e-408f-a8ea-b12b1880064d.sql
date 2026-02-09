
-- 1. Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4. RLS for user_roles - users can see their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 5. Only admins can manage roles
CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 6. Create customization_categories table
CREATE TABLE public.customization_categories (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT '🔧',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.customization_categories ENABLE ROW LEVEL SECURITY;

-- Everyone can read categories
CREATE POLICY "Anyone can view categories"
ON public.customization_categories FOR SELECT
TO authenticated
USING (true);

-- Only admins can manage categories
CREATE POLICY "Admins can manage categories"
ON public.customization_categories FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 7. Create customization_options table
CREATE TABLE public.customization_options (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES public.customization_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  description TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.customization_options ENABLE ROW LEVEL SECURITY;

-- Everyone can read options
CREATE POLICY "Anyone can view options"
ON public.customization_options FOR SELECT
TO authenticated
USING (true);

-- Only admins can manage options
CREATE POLICY "Admins can manage options"
ON public.customization_options FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 8. Seed categories
INSERT INTO public.customization_categories (id, label, icon, sort_order) VALUES
('frame', 'เฟรม', '🛠️', 1),
('motor', 'มอเตอร์', '⚡', 2),
('camera', 'กล้อง', '📷', 3),
('gimbal', 'Gimbal', '🎬', 4),
('battery', 'แบตเตอรี่', '🔋', 5),
('propeller', 'ใบพัด', '🌀', 6),
('controller', 'รีโมทคอนโทรล', '🎮', 7),
('fpv', 'FPV System', '👓', 8),
('gps', 'GPS', '📍', 9),
('sensor', 'เซนเซอร์', '📡', 10),
('lights', 'ไฟ LED', '💡', 11),
('landing', 'ขาตั้ง', '🦿', 12),
('case', 'กระเป๋า', '💼', 13);

-- 9. Seed options
INSERT INTO public.customization_options (id, category_id, name, price, description, sort_order, is_default) VALUES
-- Frame
('frame-compact', 'frame', 'Compact Frame (250mm)', 0, 'เฟรมขนาดเล็ก เหมาะสำหรับการพกพา', 1, true),
('frame-medium', 'frame', 'Standard Frame (350mm)', 2500, 'เฟรมขนาดกลาง สมดุลระหว่างความคล่องตัวและความเสถียร', 2, false),
('frame-large', 'frame', 'Pro Frame (450mm)', 4500, 'เฟรมขนาดใหญ่ รองรับอุปกรณ์หนักได้ดี', 3, false),
('frame-carbon', 'frame', 'Carbon Fiber Frame (450mm)', 8900, 'เฟรมคาร์บอนไฟเบอร์ น้ำหนักเบา แข็งแรงสูงสุด', 4, false),
-- Motor
('motor-standard', 'motor', 'Standard Motors (2300KV)', 0, 'มอเตอร์มาตรฐาน เหมาะสำหรับการใช้งานทั่วไป', 1, true),
('motor-power', 'motor', 'High Power Motors (2600KV)', 3500, 'มอเตอร์กำลังสูง ความเร็วและแรงบิดเพิ่มขึ้น', 2, false),
('motor-brushless', 'motor', 'Brushless Pro (2800KV)', 5900, 'มอเตอร์ไร้แปรงถ่าน ประสิทธิภาพสูงสุด', 3, false),
('motor-racing', 'motor', 'Racing Motors (3000KV)', 7500, 'มอเตอร์สำหรับการแข่งขัน ความเร็วสูงสุด', 4, false),
-- Camera
('cam-none', 'camera', 'ไม่ต้องการกล้อง', 0, 'สำหรับการฝึกบินหรือการใช้งานเฉพาะทาง', 1, true),
('cam-hd', 'camera', 'HD Camera (1080p)', 4500, 'กล้อง HD คุณภาพดี สำหรับการใช้งานทั่วไป', 2, false),
('cam-4k', 'camera', '4K Camera', 8900, 'กล้อง 4K 30fps คมชัดระดับมืออาชีพ', 3, false),
('cam-4k-60', 'camera', '4K Pro Camera (60fps)', 14900, 'กล้อง 4K 60fps พร้อม HDR', 4, false),
('cam-6k', 'camera', '6K Cinema Camera', 22900, 'กล้อง 6K สำหรับงานภาพยนตร์', 5, false),
('cam-8k', 'camera', '8K Ultra Camera', 35900, 'กล้อง 8K ระดับสูงสุด พร้อม Log Profile', 6, false),
-- Gimbal
('gimbal-none', 'gimbal', 'ไม่ต้องการ Gimbal', 0, 'สำหรับโดรนที่ไม่ต้องการกล้อง', 1, true),
('gimbal-2axis', 'gimbal', '2-Axis Gimbal', 3500, 'กันสั่น 2 แกน สำหรับภาพนิ่ง', 2, false),
('gimbal-3axis', 'gimbal', '3-Axis Gimbal', 6900, 'กันสั่น 3 แกน สำหรับวิดีโอคุณภาพสูง', 3, false),
('gimbal-pro', 'gimbal', 'Pro Gimbal (3-Axis + Stabilizer)', 12900, 'กันสั่นระดับมืออาชีพ พร้อมระบบ Stabilizer', 4, false),
-- Battery
('bat-2200', 'battery', '2200mAh LiPo', 0, 'แบตมาตรฐาน บินได้ ~15 นาที', 1, true),
('bat-3300', 'battery', '3300mAh LiPo', 1900, 'แบตขนาดกลาง บินได้ ~22 นาที', 2, false),
('bat-4500', 'battery', '4500mAh LiPo', 3500, 'แบตขนาดใหญ่ บินได้ ~30 นาที', 3, false),
('bat-5500', 'battery', '5500mAh LiPo Pro', 5500, 'แบตความจุสูง บินได้ ~40 นาที', 4, false),
('bat-7000', 'battery', '7000mAh LiPo Ultra', 7900, 'แบตความจุสูงสุด บินได้ ~55 นาที', 5, false),
-- Propeller
('prop-standard', 'propeller', 'Standard Props', 0, 'ใบพัดมาตรฐาน ABS', 1, true),
('prop-quiet', 'propeller', 'Low-Noise Props', 890, 'ใบพัดเสียงเบา ลดเสียงรบกวน 40%', 2, false),
('prop-carbon', 'propeller', 'Carbon Fiber Props', 1900, 'ใบพัดคาร์บอน แข็งแรง น้ำหนักเบา', 3, false),
('prop-folding', 'propeller', 'Folding Props', 2500, 'ใบพัดพับได้ สะดวกพกพา', 4, false),
('prop-racing', 'propeller', 'Racing Props (Tri-blade)', 1500, 'ใบพัด 3 แฉก สำหรับความเร็วสูง', 5, false),
-- Controller
('ctrl-basic', 'controller', 'Basic Controller', 0, 'รีโมทพื้นฐาน ระยะ 500m', 1, true),
('ctrl-standard', 'controller', 'Standard Controller + Screen', 3900, 'รีโมทพร้อมหน้าจอ LCD ระยะ 2km', 2, false),
('ctrl-pro', 'controller', 'Pro Controller', 7900, 'รีโมทระดับโปร ระยะ 7km พร้อมจอ HD', 3, false),
('ctrl-smart', 'controller', 'Smart Controller', 12900, 'รีโมทอัจฉริยะ จอ 5.5 นิ้ว ระยะ 15km', 4, false),
-- FPV
('fpv-none', 'fpv', 'ไม่ต้องการ FPV', 0, 'ใช้หน้าจอรีโมทแทน', 1, true),
('fpv-goggles', 'fpv', 'FPV Goggles (720p)', 4500, 'แว่น FPV ความละเอียด 720p', 2, false),
('fpv-hd', 'fpv', 'HD FPV Goggles (1080p)', 8900, 'แว่น FPV ความละเอียด 1080p', 3, false),
('fpv-digital', 'fpv', 'Digital FPV System', 15900, 'ระบบ FPV ดิจิทัล ความหน่วงต่ำ', 4, false),
-- GPS
('gps-none', 'gps', 'ไม่ต้องการ GPS', 0, 'สำหรับการบินด้วยตนเอง', 1, true),
('gps-basic', 'gps', 'Basic GPS', 1900, 'GPS พื้นฐาน Return to Home', 2, false),
('gps-glonass', 'gps', 'GPS + GLONASS', 3500, 'ระบบนำทางคู่ แม่นยำสูง', 3, false),
('gps-rtk', 'gps', 'RTK GPS', 8900, 'GPS ความแม่นยำระดับเซนติเมตร', 4, false),
-- Sensor
('sen-none', 'sensor', 'ไม่มีเซนเซอร์เสริม', 0, 'สำหรับการบินแบบง่าย', 1, true),
('sen-obstacle-front', 'sensor', 'Front Obstacle Sensor', 2500, 'เซนเซอร์กันชนด้านหน้า', 2, false),
('sen-obstacle-360', 'sensor', '360° Obstacle Avoidance', 6900, 'เซนเซอร์กันชนรอบทิศ', 3, false),
('sen-thermal', 'sensor', 'Thermal Imaging', 18900, 'กล้องถ่ายภาพความร้อน', 4, false),
('sen-lidar', 'sensor', 'LiDAR Sensor', 24900, 'เซนเซอร์ LiDAR สำหรับการทำแผนที่', 5, false),
-- Lights
('led-none', 'lights', 'ไฟ LED พื้นฐาน', 0, 'ไฟบอกตำแหน่งมาตรฐาน', 1, true),
('led-rgb', 'lights', 'RGB LED Strip', 890, 'ไฟ LED สี RGB ปรับได้', 2, false),
('led-bright', 'lights', 'High-Power LED', 1500, 'ไฟสว่างสูง สำหรับการบินกลางคืน', 3, false),
('led-strobe', 'lights', 'Strobe & Navigation Lights', 2500, 'ไฟกระพริบและไฟนำทาง', 4, false),
-- Landing
('land-fixed', 'landing', 'Fixed Landing Gear', 0, 'ขาตั้งแบบตายตัว', 1, true),
('land-foldable', 'landing', 'Foldable Landing Gear', 1200, 'ขาตั้งพับได้', 2, false),
('land-retract', 'landing', 'Retractable Landing Gear', 3500, 'ขาตั้งเก็บได้อัตโนมัติ', 3, false),
('land-float', 'landing', 'Float Landing Gear', 2900, 'ขาตั้งลอยน้ำ', 4, false),
-- Case
('case-none', 'case', 'ไม่ต้องการกระเป๋า', 0, '', 1, true),
('case-soft', 'case', 'Soft Carry Bag', 990, 'กระเป๋าผ้าน้ำหนักเบา', 2, false),
('case-hard', 'case', 'Hard Case', 2500, 'กระเป๋าแข็งกันกระแทก', 3, false),
('case-pro', 'case', 'Pro Carry Case', 4500, 'กระเป๋ามืออาชีพ กันน้ำ พร้อมล้อลาก', 4, false);

-- 10. Auto-assign 'user' role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_role
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_role();
