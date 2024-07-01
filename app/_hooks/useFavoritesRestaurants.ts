import { toast } from "sonner";
import { toogleFavoritesRestaurants } from "../_actions/restaurant";
import { UserFavoriteRestaurants } from "@prisma/client";
import { useRouter } from "next/navigation";

interface useToggleFavoriteRestaurantProps {
  userId?: string;
  userFavoriteRestaurants?: UserFavoriteRestaurants[];
  restaurantId: string;
  restaurantIsFavorited?: boolean;
}

const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  restaurantIsFavorited,
}: useToggleFavoriteRestaurantProps) => {
  const router = useRouter();

  const handleFavoriteClick = async () => {
    if (!userId) return;
    try {
      await toogleFavoritesRestaurants(userId, restaurantId);
      toast(
        restaurantIsFavorited
          ? "Restaurante removido dos favoritos."
          : "Restaurante favoritado.",
        {
          action: {
            label: "Ver favoritos.",
            onClick: () => router.push(`/my-favorites-restaurants`),
          },
        },
      );
    } catch (error) {
      toast.error("Erro ao favoritar restaurante.");
    }
  };

  return { handleFavoriteClick };
};

export default useToggleFavoriteRestaurant;
