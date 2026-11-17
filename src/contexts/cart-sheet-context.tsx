"use client";

import { createContext, useContext, useState } from "react";

interface CartSheetContextValue {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartSheetContext = createContext<CartSheetContextValue | null>(null);

export const CartSheetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartSheetContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartSheetContext.Provider>
  );
};

export const useCartSheet = () => {
  const context = useContext(CartSheetContext);
  if (!context) {
    throw new Error("useCartSheet must be used within a CartSheetProvider");
  }
  return context;
};
