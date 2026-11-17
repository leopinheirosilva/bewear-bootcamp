import "server-only";

import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";

export const getProductsWithVariants = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  return products;
};

export const getProductsByCategory = async (categoryId: string) => {
  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, categoryId),
    with: {
      variants: true,
    },
  });
  return products;
};

export const getNewlyCreatedProducts = async () => {
  const products = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  return products;
};

export const getProductVariantBySlug = async (slug: string) => {
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  return productVariant;
};
