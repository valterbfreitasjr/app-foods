import RestaurantItem from "@/app/_components/restaurant-item";
import { db } from "@/app/_lib/prisma";

const RecommendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({});

  return (
    <>
      <h1>Recomendados</h1>
      <div className="px-5 ">
        {restaurants.map((restaurant) => (
          <RestaurantItem restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
    </>
  );
};

export default RecommendedRestaurants;
