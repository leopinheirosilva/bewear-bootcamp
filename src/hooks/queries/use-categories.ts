import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/actions/get-categories";

export const getUseCategoriesQueryKey = () => ["categories"] as const;

export const useCategories = (params?: {
  initialData?: Awaited<ReturnType<typeof getCategories>>;
}) => {
  return useQuery({
    queryKey: getUseCategoriesQueryKey(),
    queryFn: () => getCategories(),
    initialData: params?.initialData,
  });
};
