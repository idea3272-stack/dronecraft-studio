export interface DroneSpec {
  camera: string;
  battery: string;
  flightTime: string;
  range: string;
  speed: string;
}

export interface DroneCustomization {
  camera: { id: string; name: string; price: number };
  battery: { id: string; name: string; price: number };
  propeller: { id: string; name: string; price: number };
  sensor: { id: string; name: string; price: number };
}

export interface Drone {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  image: string;
  description: string;
  specs: DroneSpec;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  drone: Drone;
  customization: DroneCustomization;
  quantity: number;
  totalPrice: number;
}
