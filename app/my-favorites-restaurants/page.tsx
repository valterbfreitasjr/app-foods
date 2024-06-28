import { getServerSession } from "next-auth";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";

const MyFavoritesRestaurants = async () => {
  const session = await getServerSession(authOptions);

  const restaurants = await db.userFavoriteRestaurants.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes recomendados
        </h2>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              restaurant={restaurant.restaurant}
              key={restaurant.restaurantId}
              className="min-w-full max-w-full"
              userFavoritesRestaurants={restaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyFavoritesRestaurants;
