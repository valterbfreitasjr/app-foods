"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const toogleFavoritesRestaurants = async (
  userId: string,
  restaurantId: string,
) => {
  const isFavorite = await db.userFavoriteRestaurants.findFirst({
    where: {
      userId,
      restaurantId,
    },
  });

  if (!isFavorite) {
    await db.userFavoriteRestaurants.create({
      data: {
        userId: userId,
        restaurantId: restaurantId,
      },
    });
    revalidatePath("/");
    return;
  }

  await db.userFavoriteRestaurants.delete({
    where: {
      userId_restaurantId: {
        userId: userId,
        restaurantId: restaurantId,
      },
    },
  });
  revalidatePath("/");
};
