import { Card, CardContent } from "@/app/_components/ui/card";
import { OrderStatus, Prisma } from "@prisma/client";

interface OrdemItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: true;
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  // {CONFIRMED, CANCELED, PREPARING, DELIVERING, COMPLETED}
  switch (status) {
    case "CONFIRMED":
      return "Confirmado";
    case "CANCELED":
      return "Cancelado";
    case "PREPARING":
      return "Em preparo";
    case "DELIVERING":
      return "Em transporte";
    case "COMPLETED":
      return "Entregue";
  }
};

const OrderItem = ({ order }: OrdemItemProps) => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="rounded-full bg-muted text-muted-foreground">
          <span className="bg-green">{getOrderStatusLabel(order?.status)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
