import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <Card className="mt-6 flex justify-around py-2">
      {/* Cost */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs text-muted-foreground">Entrega</span>
          <BikeIcon size={14} />
        </div>

        {Number(restaurant.deliveryFee) > 0 ? (
          <p className="text-xs font-semibold">
            {formatCurrency(Number(restaurant.deliveryFee))}
          </p>
        ) : (
          <p className="text-sm font-semibold">Grátis</p>
        )}
      </div>

      {/* Time */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs text-muted-foreground">Entrega</span>
          <TimerIcon size={14} />
        </div>

        <p className="text-sm font-semibold">
          {restaurant.deliveryTimeMinutes} min
        </p>
      </div>
    </Card>
  );
};

export default DeliveryInfo;
