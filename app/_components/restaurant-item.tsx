"use client";

import { Restaurant, UserFavoriteRestaurants } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";
import {
  favoriteRestaurant,
  unfavoriteRestaurant,
} from "../_actions/restaurant";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface RestaurantItemProps {
  userId?: string;
  restaurant: Restaurant;
  className?: string;
  userFavoritesRestaurants: UserFavoriteRestaurants[];
}

const RestaurantItem = ({
  userId,
  restaurant,
  className,
  userFavoritesRestaurants,
}: RestaurantItemProps) => {
  const [isFavoritedRestaurant, setIsFavoritedRestaurant] = useState(false);

  const handleToggleFavorite = async () => {
    setIsFavoritedRestaurant(!isFavoritedRestaurant);
  };

  useEffect(() => {
    setIsFavoritedRestaurant(
      userFavoritesRestaurants.some(
        (fav) => fav.restaurantId === restaurant.id,
      ),
    );
  }, [userFavoritesRestaurants, restaurant.id]);

  const handleFavoriteClick = async () => {
    if (!userId) return;
    try {
      if (isFavoritedRestaurant) {
        await unfavoriteRestaurant(userId, restaurant.id);
        toast.success("Restaurante removido dos favoritos.");
        return;
      }

      await favoriteRestaurant(userId, restaurant.id);
      toast.success(
        restaurant.name.endsWith("a")
          ? `${restaurant.name} favoritada com sucesso!`
          : `${restaurant.name} favoritado com sucesso!`,
      );
    } catch (error) {
      toast.error("Restaurante já favoritado.");
    }
  };

  return (
    <div className={cn("w-[150px] min-w-[150px]", className)}>
      <div className="w-full space-y-3">
        <div className="relative h-[136px] w-full">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-lg object-cover"
            />
          </Link>

          <div className="absolute left-2 top-2 flex items-center rounded-full bg-white px-2 py-[2px] text-xs">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-500" />
            <span className="text-xs font-semibold">5.0</span>
          </div>

          {userId && (
            <Button
              className="absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700"
              size="icon"
              onClick={handleFavoriteClick}
            >
              <div onClick={handleToggleFavorite}>
                <HeartIcon
                  className={
                    isFavoritedRestaurant ? "fill-red-500" : "fill-white"
                  }
                  size={16}
                />
              </div>
            </Button>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <BikeIcon className="text-xs text-primary" size={12} />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega Grátis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TimerIcon className="text-xs text-primary" size={12} />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
