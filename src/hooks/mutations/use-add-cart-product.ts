import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { AddProductToCartSchema } from "@/actions/add-cart-product/schema";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getAddCartProductMutationKey = () => ["add-cart-product"] as const;

export const useAddCartProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getAddCartProductMutationKey(),
    mutationFn: (data: AddProductToCartSchema) => addProductToCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
      toast.success("Produto adicionado ao carrinho");
    },
  });
};
