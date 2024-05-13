import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeft, ChevronLeftIcon } from "lucide-react";

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
      <div className="relative h-[360px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />

        <Button
          className="absolute left-4 top-4 h-10 w-10 rounded-full bg-white text-foreground hover:text-white"
          size="icon"
        >
          <ChevronLeftIcon />
        </Button>
      </div>

      {/* Title and Price - 30min */}
      <div></div>
    </div>
  );
};

export default ProductPage;
