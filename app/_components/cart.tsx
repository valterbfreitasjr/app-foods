import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subtotalPrice, totalDiscounts, totalPrice } =
    useContext(CartContext);

  return (
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

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground ">Descontos</span>
                  <span>- {formatCurrency(totalDiscounts)}</span>
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
          <Button className="mt-6 w-full">Finalizar pedido</Button>
        </>
      ) : (
        <h2>Não há produtos na sacola.</h2>
      )}
    </div>
  );
};

export default Cart;
