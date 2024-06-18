"use client";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";

interface OrdemItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      orderProducts: {
        include: {
          product: true;
        };
      };
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
    <Card className="space-y-3">
      <CardContent className="space-y-3 p-5">
        <div className="w-fit rounded-full bg-[#eeeeee] px-2 py-1 text-center text-muted-foreground">
          <span className="block text-xs font-semibold">{order.status}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order?.restaurant.imageUrl} />
            </Avatar>

            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button variant="ghost" size="icon" className="h-6 w-6">
            <ChevronRightIcon />
          </Button>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div>
          {order.orderProducts.map((p) => (
            <div key={p.id} className="flex justify-between">
              <h2>{p.product.name}</h2>
              <span>{p.quantity}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
