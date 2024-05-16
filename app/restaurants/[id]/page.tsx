import { db } from "@/app/_lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: id,
    },
  });

  if (!restaurant) return notFound();

  return <h1>{restaurant.name}</h1>;
};

export default RestaurantPage;
