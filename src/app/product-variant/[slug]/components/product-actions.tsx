"use client";

import { Loader2, MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCartSheet } from "@/contexts/cart-sheet-context";
import { useAddCartProduct } from "@/hooks/mutations/use-add-cart-product";

import AddToCartButton from "./add-to-cart-button";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const { openCart } = useCartSheet();
  const { mutate: addToCart, isPending } = useAddCartProduct();

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleBuyNow = () => {
    addToCart(
      {
        productVariantId,
        quantity,
      },
      {
        onSuccess: () => {
          openCart();
        },
        onError: () => {
          toast.error(
            "Erro ao adicionar produto ao carrinho. Tente novamente.",
          );
        },
      },
    );
  };

  return (
    <>
      <div className="px-5">
        <div className="space-y-4">
          <h3 className="font-medium">Quantidade</h3>
          <div className="flex w-25 items-center justify-between rounded-lg border">
            <Button size="icon" variant="ghost" onClick={handleDecrement}>
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button size="icon" variant="ghost" onClick={handleIncrement}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 px-5">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
        <Button
          className="rounded-full"
          size="lg"
          onClick={handleBuyNow}
          disabled={isPending}
        >
          {isPending && <Loader2 className="animate-spin" />}
          Comprar agora
        </Button>
      </div>
    </>
  );
};

export default ProductActions;
