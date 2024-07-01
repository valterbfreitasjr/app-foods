import { UserFavoriteRestaurants } from "@prisma/client";

export const isRestaurantFavorited = (
  restaurantId: string,
  userFavoritesRestaurants: UserFavoriteRestaurants[],
) => userFavoritesRestaurants?.some((fav) => fav.restaurantId === restaurantId);
