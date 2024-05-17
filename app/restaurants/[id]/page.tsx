import { db } from "@/app/_lib/prisma";

import { notFound } from "next/navigation";
import RestaurantImage from "../_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";

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

  return (
    <div>
      {/* IMAGE */}
      <RestaurantImage restaurant={restaurant} />

      {/* Title and Price */}
      <div className="flex items-center justify-between px-5 pt-5">
        {/* IMAGE */}
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        <div className="flex items-center rounded-full bg-gray-800 px-2 py-[2px] text-xs">
          <StarIcon size={20} className="fill-yellow-400" />
          <span className="text-xl font-semibold text-white">5.0</span>
        </div>
      </div>

      {/* Most Popular */}

      {/* Japanese Food */}
    </div>
  );
};

// 1.25
export default RestaurantPage;
