import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";
import { authOptions } from "../_lib/auth";

const RestaurantList = async () => {
  const session = await getServerSession(authOptions);
  const restaurants = await db.restaurant.findMany({ take: 10 });
  const userFavorites = await db.userFavoriteRestaurants.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          restaurant={restaurant}
          key={restaurant.id}
          userId={session?.user?.id}
          userFavoritesRestaurants={userFavorites}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
