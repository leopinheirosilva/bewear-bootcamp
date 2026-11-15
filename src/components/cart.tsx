"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingBasketIcon } from "lucide-react";

import { getCart } from "@/actions/get-cart";
import { Button } from "@/components/ui/button";

import CartItem from "./cart-item";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const Cart = () => {
  const { data: cart, isPending: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-5 pb-5">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            <div className="flex h-full flex-col gap-8">
              {cartIsLoading && <div>Carregando...</div>}
              {cart?.items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  productName={item.productVariant.product.name}
                  productVariantName={item.productVariant.name}
                  productVariantImageUrl={item.productVariant.imageUrl}
                  productVariantPriceInCents={item.productVariant.priceInCents}
                  quantity={item.quantity}
                />
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
