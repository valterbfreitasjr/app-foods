"use client";

import { Button } from "@/app/_components/ui/button";
import { isRestaurantFavorited } from "@/app/_helpers/restaurants";
import useToggleFavoriteRestaurant from "@/app/_hooks/useFavoritesRestaurants";
import { Restaurant, UserFavoriteRestaurants } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
  userFavoriteRestaurants: UserFavoriteRestaurants[];
}

const RestaurantImage = ({
  restaurant,
  userFavoriteRestaurants,
}: RestaurantImageProps) => {
  const { data } = useSession();
  const router = useRouter();

  const isFavorite = isRestaurantFavorited(
    restaurant.id,
    userFavoriteRestaurants,
  );

  const { handleFavoriteClick } = useToggleFavoriteRestaurant({
    userId: data?.user.id,
    restaurantId: restaurant.id,
    restaurantIsFavorited: isFavorite,
  });

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />

      <Button
        className="absolute left-4 top-4 h-10 w-10 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        className={`absolute right-4 top-4 h-10 w-10 rounded-full bg-gray-700  ${isFavorite && "bg-primary hover:bg-gray-700"}`}
        size="icon"
        onClick={handleFavoriteClick}
      >
        <HeartIcon className="fill-white" size={20} />
      </Button>
    </div>
  );
};

export default RestaurantImage;
