import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";

const Cart = () => {
  const { products } = useContext(CartContext);

  return (
    <>
      {products.map((product) => (
        <CartItem cartProducts={product} key={product.id} />
      ))}
    </>
  );
};

export default Cart;
