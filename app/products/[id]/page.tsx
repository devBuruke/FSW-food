import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

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

  if (!product) {
    return notFound();
  }

  return (
    <div>
      {/* Imagem */}
      <div className="relative h-[360px] w-full">
        <Image
          src={product.imageURL}
          alt={product.name}
          fill
          className="object-cover"
        />
        <Button
          className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
          size="icon"
        >
          <ChevronLeftIcon />
        </Button>
      </div>
      {/* Titulo e Preço */}
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
      </div>
    </div>
  );
};

export default ProductPage;
