import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import OrderItem from "./_components/ordem-item";

const MyOrderPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h2 className="pb-4 font-semibold">Meus pedidos</h2>

        <div className="space-y-3">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrderPage;
