import { Drone, DroneCustomization } from "@/types/drone";
import heroDrone from "@/assets/hero-drone.jpg";

export const baseDrone: Drone = {
  id: "skytech-custom",
  name: "SKYTECH Custom",
  category: "Build Your Own",
  basePrice: 35900,
  image: heroDrone,
  description: "สร้างโดรนในแบบของคุณเอง เลือกอุปกรณ์ทุกชิ้นตามความต้องการ ตั้งแต่เฟรม มอเตอร์ กล้อง ไปจนถึงอุปกรณ์เสริมต่างๆ",
  specs: {
    camera: "ขึ้นอยู่กับการปรับแต่ง",
    battery: "ขึ้นอยู่กับการปรับแต่ง",
    flightTime: "ขึ้นอยู่กับการปรับแต่ง",
    range: "ขึ้นอยู่กับการปรับแต่ง",
    speed: "ขึ้นอยู่กับการปรับแต่ง",
  },
};

export const customizationOptions = {
  frame: [
    { id: "frame-compact", name: "Compact Frame (250mm)", price: 0, description: "เฟรมขนาดเล็ก เหมาะสำหรับการพกพา" },
    { id: "frame-medium", name: "Standard Frame (350mm)", price: 2500, description: "เฟรมขนาดกลาง สมดุลระหว่างความคล่องตัวและความเสถียร" },
    { id: "frame-large", name: "Pro Frame (450mm)", price: 4500, description: "เฟรมขนาดใหญ่ รองรับอุปกรณ์หนักได้ดี" },
    { id: "frame-carbon", name: "Carbon Fiber Frame (450mm)", price: 8900, description: "เฟรมคาร์บอนไฟเบอร์ น้ำหนักเบา แข็งแรงสูงสุด" },
  ],
  motor: [
    { id: "motor-standard", name: "Standard Motors (2300KV)", price: 0, description: "มอเตอร์มาตรฐาน เหมาะสำหรับการใช้งานทั่วไป" },
    { id: "motor-power", name: "High Power Motors (2600KV)", price: 3500, description: "มอเตอร์กำลังสูง ความเร็วและแรงบิดเพิ่มขึ้น" },
    { id: "motor-brushless", name: "Brushless Pro (2800KV)", price: 5900, description: "มอเตอร์ไร้แปรงถ่าน ประสิทธิภาพสูงสุด" },
    { id: "motor-racing", name: "Racing Motors (3000KV)", price: 7500, description: "มอเตอร์สำหรับการแข่งขัน ความเร็วสูงสุด" },
  ],
  camera: [
    { id: "cam-none", name: "ไม่ต้องการกล้อง", price: 0, description: "สำหรับการฝึกบินหรือการใช้งานเฉพาะทาง" },
    { id: "cam-hd", name: "HD Camera (1080p)", price: 4500, description: "กล้อง HD คุณภาพดี สำหรับการใช้งานทั่วไป" },
    { id: "cam-4k", name: "4K Camera", price: 8900, description: "กล้อง 4K 30fps คมชัดระดับมืออาชีพ" },
    { id: "cam-4k-60", name: "4K Pro Camera (60fps)", price: 14900, description: "กล้อง 4K 60fps พร้อม HDR" },
    { id: "cam-6k", name: "6K Cinema Camera", price: 22900, description: "กล้อง 6K สำหรับงานภาพยนตร์" },
    { id: "cam-8k", name: "8K Ultra Camera", price: 35900, description: "กล้อง 8K ระดับสูงสุด พร้อม Log Profile" },
  ],
  gimbal: [
    { id: "gimbal-none", name: "ไม่ต้องการ Gimbal", price: 0, description: "สำหรับโดรนที่ไม่ต้องการกล้อง" },
    { id: "gimbal-2axis", name: "2-Axis Gimbal", price: 3500, description: "กันสั่น 2 แกน สำหรับภาพนิ่ง" },
    { id: "gimbal-3axis", name: "3-Axis Gimbal", price: 6900, description: "กันสั่น 3 แกน สำหรับวิดีโอคุณภาพสูง" },
    { id: "gimbal-pro", name: "Pro Gimbal (3-Axis + Stabilizer)", price: 12900, description: "กันสั่นระดับมืออาชีพ พร้อมระบบ Stabilizer" },
  ],
  battery: [
    { id: "bat-2200", name: "2200mAh LiPo", price: 0, description: "แบตมาตรฐาน บินได้ ~15 นาที" },
    { id: "bat-3300", name: "3300mAh LiPo", price: 1900, description: "แบตขนาดกลาง บินได้ ~22 นาที" },
    { id: "bat-4500", name: "4500mAh LiPo", price: 3500, description: "แบตขนาดใหญ่ บินได้ ~30 นาที" },
    { id: "bat-5500", name: "5500mAh LiPo Pro", price: 5500, description: "แบตความจุสูง บินได้ ~40 นาที" },
    { id: "bat-7000", name: "7000mAh LiPo Ultra", price: 7900, description: "แบตความจุสูงสุด บินได้ ~55 นาที" },
  ],
  propeller: [
    { id: "prop-standard", name: "Standard Props", price: 0, description: "ใบพัดมาตรฐาน ABS" },
    { id: "prop-quiet", name: "Low-Noise Props", price: 890, description: "ใบพัดเสียงเบา ลดเสียงรบกวน 40%" },
    { id: "prop-carbon", name: "Carbon Fiber Props", price: 1900, description: "ใบพัดคาร์บอน แข็งแรง น้ำหนักเบา" },
    { id: "prop-folding", name: "Folding Props", price: 2500, description: "ใบพัดพับได้ สะดวกพกพา" },
    { id: "prop-racing", name: "Racing Props (Tri-blade)", price: 1500, description: "ใบพัด 3 แฉก สำหรับความเร็วสูง" },
  ],
  controller: [
    { id: "ctrl-basic", name: "Basic Controller", price: 0, description: "รีโมทพื้นฐาน ระยะ 500m" },
    { id: "ctrl-standard", name: "Standard Controller + Screen", price: 3900, description: "รีโมทพร้อมหน้าจอ LCD ระยะ 2km" },
    { id: "ctrl-pro", name: "Pro Controller", price: 7900, description: "รีโมทระดับโปร ระยะ 7km พร้อมจอ HD" },
    { id: "ctrl-smart", name: "Smart Controller", price: 12900, description: "รีโมทอัจฉริยะ จอ 5.5 นิ้ว ระยะ 15km" },
  ],
  fpv: [
    { id: "fpv-none", name: "ไม่ต้องการ FPV", price: 0, description: "ใช้หน้าจอรีโมทแทน" },
    { id: "fpv-goggles", name: "FPV Goggles (720p)", price: 4500, description: "แว่น FPV ความละเอียด 720p" },
    { id: "fpv-hd", name: "HD FPV Goggles (1080p)", price: 8900, description: "แว่น FPV ความละเอียด 1080p" },
    { id: "fpv-digital", name: "Digital FPV System", price: 15900, description: "ระบบ FPV ดิจิทัล ความหน่วงต่ำ" },
  ],
  gps: [
    { id: "gps-none", name: "ไม่ต้องการ GPS", price: 0, description: "สำหรับการบินด้วยตนเอง" },
    { id: "gps-basic", name: "Basic GPS", price: 1900, description: "GPS พื้นฐาน Return to Home" },
    { id: "gps-glonass", name: "GPS + GLONASS", price: 3500, description: "ระบบนำทางคู่ แม่นยำสูง" },
    { id: "gps-rtk", name: "RTK GPS", price: 8900, description: "GPS ความแม่นยำระดับเซนติเมตร" },
  ],
  sensor: [
    { id: "sen-none", name: "ไม่มีเซนเซอร์เสริม", price: 0, description: "สำหรับการบินแบบง่าย" },
    { id: "sen-obstacle-front", name: "Front Obstacle Sensor", price: 2500, description: "เซนเซอร์กันชนด้านหน้า" },
    { id: "sen-obstacle-360", name: "360° Obstacle Avoidance", price: 6900, description: "เซนเซอร์กันชนรอบทิศ" },
    { id: "sen-thermal", name: "Thermal Imaging", price: 18900, description: "กล้องถ่ายภาพความร้อน" },
    { id: "sen-lidar", name: "LiDAR Sensor", price: 24900, description: "เซนเซอร์ LiDAR สำหรับการทำแผนที่" },
  ],
  lights: [
    { id: "led-none", name: "ไฟ LED พื้นฐาน", price: 0, description: "ไฟบอกตำแหน่งมาตรฐาน" },
    { id: "led-rgb", name: "RGB LED Strip", price: 890, description: "ไฟ LED สี RGB ปรับได้" },
    { id: "led-bright", name: "High-Power LED", price: 1500, description: "ไฟสว่างสูง สำหรับการบินกลางคืน" },
    { id: "led-strobe", name: "Strobe & Navigation Lights", price: 2500, description: "ไฟกระพริบและไฟนำทาง" },
  ],
  landing: [
    { id: "land-fixed", name: "Fixed Landing Gear", price: 0, description: "ขาตั้งแบบตายตัว" },
    { id: "land-foldable", name: "Foldable Landing Gear", price: 1200, description: "ขาตั้งพับได้" },
    { id: "land-retract", name: "Retractable Landing Gear", price: 3500, description: "ขาตั้งเก็บได้อัตโนมัติ" },
    { id: "land-float", name: "Float Landing Gear", price: 2900, description: "ขาตั้งลอยน้ำ" },
  ],
  case: [
    { id: "case-none", name: "ไม่ต้องการกระเป๋า", price: 0, description: "" },
    { id: "case-soft", name: "Soft Carry Bag", price: 990, description: "กระเป๋าผ้าน้ำหนักเบา" },
    { id: "case-hard", name: "Hard Case", price: 2500, description: "กระเป๋าแข็งกันกระแทก" },
    { id: "case-pro", name: "Pro Carry Case", price: 4500, description: "กระเป๋ามืออาชีพ กันน้ำ พร้อมล้อลาก" },
  ],
};

export interface ExtendedCustomization {
  frame: typeof customizationOptions.frame[number];
  motor: typeof customizationOptions.motor[number];
  camera: typeof customizationOptions.camera[number];
  gimbal: typeof customizationOptions.gimbal[number];
  battery: typeof customizationOptions.battery[number];
  propeller: typeof customizationOptions.propeller[number];
  controller: typeof customizationOptions.controller[number];
  fpv: typeof customizationOptions.fpv[number];
  gps: typeof customizationOptions.gps[number];
  sensor: typeof customizationOptions.sensor[number];
  lights: typeof customizationOptions.lights[number];
  landing: typeof customizationOptions.landing[number];
  case: typeof customizationOptions.case[number];
}

export const defaultCustomization: ExtendedCustomization = {
  frame: customizationOptions.frame[0],
  motor: customizationOptions.motor[0],
  camera: customizationOptions.camera[0],
  gimbal: customizationOptions.gimbal[0],
  battery: customizationOptions.battery[0],
  propeller: customizationOptions.propeller[0],
  controller: customizationOptions.controller[0],
  fpv: customizationOptions.fpv[0],
  gps: customizationOptions.gps[0],
  sensor: customizationOptions.sensor[0],
  lights: customizationOptions.lights[0],
  landing: customizationOptions.landing[0],
  case: customizationOptions.case[0],
};

export const categoryLabels: Record<keyof ExtendedCustomization, string> = {
  frame: "เฟรม",
  motor: "มอเตอร์",
  camera: "กล้อง",
  gimbal: "Gimbal",
  battery: "แบตเตอรี่",
  propeller: "ใบพัด",
  controller: "รีโมทคอนโทรล",
  fpv: "FPV System",
  gps: "GPS",
  sensor: "เซนเซอร์",
  lights: "ไฟ LED",
  landing: "ขาตั้ง",
  case: "กระเป๋า",
};

export const categoryIcons: Record<keyof ExtendedCustomization, string> = {
  frame: "🛠️",
  motor: "⚡",
  camera: "📷",
  gimbal: "🎬",
  battery: "🔋",
  propeller: "🌀",
  controller: "🎮",
  fpv: "👓",
  gps: "📍",
  sensor: "📡",
  lights: "💡",
  landing: "🦿",
  case: "💼",
};
