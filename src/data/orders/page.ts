import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { orderTable } from "@/db/schema";

export const getOrdersByUserId = async (userId: string) => {
  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, userId),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });
  return orders;
};
