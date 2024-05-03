"use client";

import DiscountBadge from "@/app/_components/discount-badge";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import {
  calculateProductsTotalPrince,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantify, setQuantify] = useState(1);

  const handleIncreaseQuantifyClick = () =>
    setQuantify((currentState) => currentState + 1);
  const handleDecreaseQuantifyClick = () =>
    setQuantify((currentState) => {
      if (currentState === 1) return 1;

      return currentState - 1;
    });

  return (
    <div className="p-5">
      {/* Restaurante */}
      <div className="flex items-center gap-[0.375rem]">
        <div className="relative h-7 w-7">
          <Image
            src={product?.restaurant.imageURL}
            alt={product?.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
      {/* Nome do Produto */}
      <h1 className="mb-2 mt-1 text-xl font-semibold ">{product.name}</h1>

      {/* PREÇO do PRODUTO e quantidade */}

      <div className="flex justify-between">
        {/* PREÇO COM DESCONTO*/}

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductsTotalPrince(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>

          {/* PREÇO ORIGINAL */}
          {product.discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>
        {/* QUANTIDADE */}
        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={handleDecreaseQuantifyClick}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantify}</span>
          <Button size="icon" onClick={handleIncreaseQuantifyClick}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      {/* DADOS da ENTREGA */}
      <Card className="mt-6 flex justify-around py-2">
        {/* CUSTO */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <BikeIcon size={14} />
          </div>

          {Number(product.restaurant.deliveryfee) > 0 ? (
            <p className="text-xs font-semibold">
              {formatCurrency(Number(product.restaurant.deliveryfee))}
            </p>
          ) : (
            <p className="text-sm font-semibold">Grátis</p>
          )}
        </div>

        {/* TEMPO */}

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <TimerIcon size={14} />
          </div>

          {Number(product.restaurant.deliveryfee) > 0 ? (
            <p className="text-xs font-semibold">
              {formatCurrency(Number(product.restaurant.deliveryfee))}
            </p>
          ) : (
            <p className="text-sm font-semibold">Grátis</p>
          )}
        </div>
      </Card>

      <div className="mt-6 space-y-3">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
