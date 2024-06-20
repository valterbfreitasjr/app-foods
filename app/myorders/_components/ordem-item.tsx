"use client";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import { formatCurrency } from "@/app/_helpers/price";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/app/_context/cart";
import { useRouter } from "next/navigation";

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
  const { addProductToCart } = useContext(CartContext);
  const router = useRouter();

  const handleReDoOrderClick = () => {
    for (const orderProduct of order.orderProducts) {
      addProductToCart({
        product: { ...orderProduct.product, restaurant: order.restaurant },
        quantity: orderProduct.quantity,
      });
    }
    router.push(`/restaurants/${order.restaurantId}`);
  };

  return (
    <Card className="space-y-3">
      <CardContent className="space-y-2 p-5">
        <div
          className={`w-fit rounded-full bg-[#eeeeee] px-2 py-1 text-center text-muted-foreground ${order.status !== "COMPLETED" && "bg-green-500 text-white"}`}
        >
          <span className="block text-xs font-semibold">{order.status}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order?.restaurant.imageUrl} />
            </Avatar>

            <Link href={`/products/${order.restaurantId}`}>
              <span className="text-sm font-semibold">
                {order.restaurant.name}
              </span>
            </Link>
          </div>

          <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
            <Link href={`/restaurants/${order.restaurantId}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="space-y-2">
          {order.orderProducts.map((p) => (
            <div key={p.id} className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">{p.quantity}</span>
              </div>
              <Link href={`/products/${p.product.id}`}>
                <span>{p.product.name}</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="itemx-center flex justify-between">
          <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant="ghost"
            className="text-primary"
            size="sm"
            disabled={order.status !== "COMPLETED"}
            onClick={handleReDoOrderClick}
          >
            Refazer pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
