import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

const ProductList = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  return (
    <div className="flex overflow-x-scroll">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
