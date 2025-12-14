import { Drone, DroneCustomization } from "@/types/drone";
import drone1 from "@/assets/drone-1.jpg";
import drone2 from "@/assets/drone-2.jpg";
import drone3 from "@/assets/drone-3.jpg";

export const drones: Drone[] = [
  {
    id: "phantom-x1",
    name: "Phantom X1",
    category: "Racing",
    basePrice: 45900,
    image: drone1,
    description: "โดรนเรซซิ่งระดับโปร ความเร็วสูงสุด 120 km/h พร้อมไฟ LED และกล้อง FPV",
    specs: {
      camera: "4K 60fps",
      battery: "2200mAh LiPo",
      flightTime: "25 นาที",
      range: "5 กม.",
      speed: "120 km/h",
    },
    isNew: true,
  },
  {
    id: "atlas-pro",
    name: "Atlas Pro",
    category: "Professional",
    basePrice: 89900,
    image: drone2,
    description: "โดรนถ่ายภาพยนตร์ระดับมืออาชีพ กล้อง 8K พร้อม Gimbal 3 แกน",
    specs: {
      camera: "8K 30fps / 4K 120fps",
      battery: "5000mAh",
      flightTime: "45 นาที",
      range: "15 กม.",
      speed: "72 km/h",
    },
    isBestSeller: true,
  },
  {
    id: "mini-voyager",
    name: "Mini Voyager",
    category: "Compact",
    basePrice: 29900,
    image: drone3,
    description: "โดรนพกพาขนาดเล็ก พับได้ น้ำหนักเบา เหมาะสำหรับการเดินทาง",
    specs: {
      camera: "4K 30fps",
      battery: "2400mAh",
      flightTime: "30 นาที",
      range: "8 กม.",
      speed: "60 km/h",
    },
    isNew: true,
  },
];

export const customizationOptions = {
  camera: [
    { id: "cam-standard", name: "Standard 4K", price: 0 },
    { id: "cam-pro", name: "Pro 6K HDR", price: 8900 },
    { id: "cam-cinema", name: "Cinema 8K", price: 18900 },
  ],
  battery: [
    { id: "bat-standard", name: "Standard (25 นาที)", price: 0 },
    { id: "bat-extended", name: "Extended (40 นาที)", price: 3900 },
    { id: "bat-ultra", name: "Ultra (55 นาที)", price: 6900 },
  ],
  propeller: [
    { id: "prop-standard", name: "Standard", price: 0 },
    { id: "prop-silent", name: "Silent Blades", price: 1500 },
    { id: "prop-carbon", name: "Carbon Fiber Pro", price: 2900 },
  ],
  sensor: [
    { id: "sen-none", name: "ไม่มีเซนเซอร์เสริม", price: 0 },
    { id: "sen-obstacle", name: "Obstacle Avoidance", price: 4500 },
    { id: "sen-thermal", name: "Thermal Imaging", price: 12900 },
  ],
};

export const defaultCustomization: DroneCustomization = {
  camera: customizationOptions.camera[0],
  battery: customizationOptions.battery[0],
  propeller: customizationOptions.propeller[0],
  sensor: customizationOptions.sensor[0],
};
