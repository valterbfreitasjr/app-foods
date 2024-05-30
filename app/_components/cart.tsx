import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";

const Cart = () => {
  const { products, subtotalPrice, totalDiscounts, totalPrice } =
    useContext(CartContext);

  return (
    <div className="py-4">
      <div className="space-y-2">
        {products.map((product) => (
          <CartItem cartProducts={product} key={product.id} />
        ))}
      </div>

      <div className="mt-6">
        <Card>
          <CardContent>
            <div className="space-y-2">
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-muted-foreground ">Subtotal</span>
                <span>{formatCurrency(subtotalPrice)}</span>
              </div>

              <hr />

              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-muted-foreground ">Entrega</span>
                {Number(products[0].restaurant.deliveryFee) === 0 ? (
                  <span className="uppercase">grátis</span>
                ) : (
                  <p>
                    {formatCurrency(Number(products[0].restaurant.deliveryFee))}
                  </p>
                )}
              </div>

              <hr />

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground ">Descontos</span>
                <span>- {formatCurrency(totalDiscounts)}</span>
              </div>

              <hr />

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground ">Total</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>

              <hr />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
