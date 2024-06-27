"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const favoriteRestaurant = async (
  userId: string,
  restaurantId: string,
) => {
  await db.userFavoriteRestaurants.create({
    data: {
      userId: userId,
      restaurantId: restaurantId,
    },
  });

  revalidatePath("/");
};

export const unfavoriteRestaurant = async (
  userId: string,
  restaurantId: string,
) => {
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
