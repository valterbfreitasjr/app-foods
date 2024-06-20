import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CartProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Cart = ({ setIsOpen }: CartProps) => {
  const { products, subtotalPrice, totalDiscounts, totalPrice, clearCart } =
    useContext(CartContext);
  const { data } = useSession();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const router = useRouter();

  const handleClickConfirmOrder = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleFinishOrderClick = async () => {
    try {
      setSubmitLoading(true);
      if (!data?.user) return;

      const restaurant = products?.[0].restaurant;

      await createOrder({
        subtotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data?.user.id },
        },
        orderProducts: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });

      clearCart();
      setIsOpen(false);

      toast("Pedido realizado!", {
        description: "Você pode acompanhar na tela dos seus pedidos.",
        action: {
          label: "Meus pedidos",
          onClick: () => router.push(`/myorders`),
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col py-5">
        {products.length > 0 ? (
          <>
            <div className="flex-auto space-y-2">
              {products.map((product) => (
                <CartItem cartProducts={product} key={product.id} />
              ))}
            </div>

            {/* Totais */}
            <div className="mt-6">
              <Card>
                <CardContent className="space-y-2 p-5">
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground ">Subtotal</span>
                    <span>{formatCurrency(subtotalPrice)}</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground ">Descontos</span>
                    <span>- {formatCurrency(totalDiscounts)}</span>
                  </div>

                  <Separator />

                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground ">Entrega</span>
                    {Number(products[0]?.restaurant.deliveryFee) === 0 ? (
                      <span className="uppercase text-primary">grátis</span>
                    ) : (
                      <p>
                        {formatCurrency(
                          Number(products[0]?.restaurant.deliveryFee),
                        )}
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Finalizar Pedido */}
            <Button
              className="mt-6 w-full"
              onClick={handleClickConfirmOrder}
              disabled={submitLoading}
            >
              {submitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar pedido
            </Button>
          </>
        ) : (
          <h2 className="text-center font-medium">
            Não há produtos na sacola.
          </h2>
        )}
      </div>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsConfirmDialogOpen(false);
              }}
            >
              Não
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleFinishOrderClick}>
              Sim, finalizar pedido.
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Cart;
