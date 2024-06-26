"use server";

import { db } from "../_lib/prisma";

export const favoriteRestaurant = async (
  userId: string,
  restaurantId: string,
) => {
  return db.userFavoriteRestaurants.create({
    data: {
      userId: userId,
      restaurantId: restaurantId,
    },
  });
};
