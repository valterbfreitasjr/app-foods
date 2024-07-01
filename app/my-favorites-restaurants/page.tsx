import { getServerSession } from "next-auth";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";

const MyFavoritesRestaurants = async () => {
  const session = await getServerSession(authOptions);

  const userFavoritesRestaurants = await db.userFavoriteRestaurants.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!session) return notFound();

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes recomendados
        </h2>
        <div className="flex w-full flex-col gap-6">
          {userFavoritesRestaurants.length > 0 ? (
            userFavoritesRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                restaurant={restaurant}
                key={restaurant.id}
                className="min-w-full max-w-full"
                userFavoritesRestaurants={userFavoritesRestaurants}
              />
            ))
          ) : (
            <h3>Você ainda não adicionou restaurants aos favoritos.</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoritesRestaurants;
