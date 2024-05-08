import { Product } from "@prisma/client";

export const calculateProductTotalPrice = (product: Product): number => {
  if (product.discountPercentage === 0) {
    return Number(product.price);
  }

  const discount = Number(product.price) * (product.discountPercentage / 100);

  return Number(product.price) - discount;
};

export const formatPrice = (product: Product) => {
  if (product.discountPercentage === 0) {
    const price = Intl.NumberFormat("pt-BR", {
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(Number(product.price));

    return price;
  }

  const price = Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(calculateProductTotalPrice(product));

  return price;
};
