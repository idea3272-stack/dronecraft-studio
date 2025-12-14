import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, Drone, DroneCustomization } from "@/types/drone";

interface CartContextType {
  items: CartItem[];
  addToCart: (drone: Drone, customization: DroneCustomization) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const calculateItemPrice = (drone: Drone, customization: DroneCustomization) => {
    return (
      drone.basePrice +
      customization.camera.price +
      customization.battery.price +
      customization.propeller.price +
      customization.sensor.price
    );
  };

  const addToCart = (drone: Drone, customization: DroneCustomization) => {
    const totalPrice = calculateItemPrice(drone, customization);
    setItems((prev) => [
      ...prev,
      { drone, customization, quantity: 1, totalPrice },
    ]);
  };

  const removeFromCart = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity, totalPrice: calculateItemPrice(item.drone, item.customization) * quantity }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
