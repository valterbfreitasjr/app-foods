import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

const MyOrderPage = async () => {
  const session = getServerSession(authOptions);

  if (!session) return;

  const orders = await db.order.findMany();
  return <h1> My Order Page!</h1>;
};

export default MyOrderPage;
