import React, { createContext, useContext, useState, ReactNode } from "react";
import { Drone } from "@/types/drone";
import { ExtendedCustomization } from "@/data/drones";

interface CartItem {
  drone: Drone;
  customization: ExtendedCustomization;
  quantity: number;
  totalPrice: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (drone: Drone, customization: ExtendedCustomization) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const calculateItemPrice = (drone: Drone, customization: ExtendedCustomization) => {
    return (
      drone.basePrice +
      Object.values(customization).reduce((sum, item) => sum + item.price, 0)
    );
  };

  const addToCart = (drone: Drone, customization: ExtendedCustomization) => {
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
