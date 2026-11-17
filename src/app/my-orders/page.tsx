import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getOrdersByUserId } from "@/data/orders/page";
import { auth } from "@/lib/auth";

import Orders from "./components/orders";

const MyOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/login");
  }
  const orders = await getOrdersByUserId(session.user.id);

  return (
    <>
      <div className="px-5">
        {orders && orders.length > 0 ? (
          <Orders
            orders={orders.map((order) => ({
              id: order.id,
              totalPriceInCents: order.totalPriceInCents,
              status: order.status,
              createdAt: order.createdAt,
              items: order.items.map((item) => ({
                id: item.id,
                imageUrl: item.productVariant.imageUrl,
                productName: item.productVariant.product.name,
                productVariantName: item.productVariant.name,
                priceInCents: item.productVariant.priceInCents,
                quantity: item.quantity,
              })),
            }))}
          />
        ) : (
          <div className="mt-10 px-5">
            <h2 className="text-center">Você não possui pedidos</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrdersPage;
