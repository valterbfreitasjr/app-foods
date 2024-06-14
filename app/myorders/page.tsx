import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { redirect } from "next/navigation";
import Header from "../_components/header";

const MyOrderPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({});

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h2 className="font-semibold">Meus pedidos</h2>

        <div>
          {orders.map((order) => (
            <p key={order.id}>{order.id}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrderPage;
