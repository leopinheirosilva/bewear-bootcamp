import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { db } from "@/db";
import { auth } from "@/lib/auth";

import Addresses from "./components/addresses";

const IdentificationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/");
  }
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: true,
    },
  });
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }

  return (
    <div>
      <Header />
      <div className="space-y-4 px-5">
        <Addresses />
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default IdentificationPage;
