import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";

export const getShippingAddressesByUserId = async (userId: string) => {
  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, userId),
  });
  return shippingAddresses;
};
