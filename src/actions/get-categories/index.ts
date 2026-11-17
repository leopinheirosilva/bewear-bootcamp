"use server";

import { getCategories as getCategoriesFromDb } from "@/data/categories/get";

export const getCategories = async () => {
  return await getCategoriesFromDb();
};
