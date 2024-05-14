import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import ProductImage from "./_components/product-image";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductDetails from "./_components/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  console.log(product);

  if (!product) {
    return notFound();
  }

  return (
    <div>
      {/* Image */}
      <ProductImage product={product} />

      <ProductDetails product={product} />
    </div>
  );
};

// 50min

export default ProductPage;
