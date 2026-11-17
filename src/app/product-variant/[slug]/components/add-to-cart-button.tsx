"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAddCartProduct } from "@/hooks/mutations/use-add-cart-product";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const { mutate, isPending } = useAddCartProduct();

  return (
    <Button
      className="rounded-full"
      size="lg"
      variant="outline"
      disabled={isPending}
      onClick={() => mutate({ productVariantId, quantity })}
    >
      {isPending && <Loader2 className="animate-spin" />}
      Adicionar à sacola
    </Button>
  );
};

export default AddToCartButton;
