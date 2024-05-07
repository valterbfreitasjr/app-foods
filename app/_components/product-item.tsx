import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="w-[150px] space-y-2">
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-md object-cover shadow-md"
        />
      </div>

      <div>
        <span className="text-sm font-semibold">{product.name}</span>
      </div>
    </div>
  );
};

export default ProductItem;
