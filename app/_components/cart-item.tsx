import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProducts: CartProduct;
}

const CartItem = ({ cartProducts }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
    subtotalPrice,
    totalPrice,
    totalDiscounts,
  } = useContext(CartContext);

  const handleDecreaseProductQuantity = () => {
    decreaseProductQuantity(cartProducts.id);
  };

  const handleIncreaseProductQuantity = () => {
    increaseProductQuantity(cartProducts.id);
  };

  const handleRemoveProductFromCart = () => {
    removeProductFromCart(cartProducts.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Image */}
        <div className="relative h-20 w-20">
          <Image
            src={cartProducts.imageUrl}
            alt={cartProducts.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProducts.name}</h3>

          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProducts) *
                  cartProducts.quantity,
              )}
            </h4>
            {cartProducts.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProducts.price) * cartProducts.quantity,
                )}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 border border-solid border-muted-foreground"
            >
              <ChevronLeftIcon
                size={18}
                onClick={handleDecreaseProductQuantity}
              />
            </Button>
            <span className="w-4 text-sm font-bold">
              {cartProducts.quantity}
            </span>
            <Button size="icon" className="h-8 w-8">
              <ChevronRightIcon
                size={18}
                onClick={handleIncreaseProductQuantity}
              />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 border border-solid border-muted-foreground"
        onClick={handleRemoveProductFromCart}
      >
        <TrashIcon size={18} />
      </Button>

      <div>
        {subtotalPrice} <br />
        {totalPrice} <br />
        {totalDiscounts.toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
