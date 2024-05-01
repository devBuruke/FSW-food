import { Product } from "@prisma/client";
import Image from "next/image";
import {
  calculateProductsTotalPrince,
  formatCurrency,
} from "../_helpers/price";

interface ProductItemProps {
  // sendo o product do prisma, ou seja, do BANCO
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="w-[150px] min-w-[150px] space-y-2">
      {/*{Imagem} */}
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageURL}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />
      </div>
      {/*{Titulo,preço e restaurant}*/}
      <div>
        <h2 className="truncate text-sm">{product.name}</h2>
        <div className="flex items-center gap-1">
          <h3 className="font-semibold">
            {formatCurrency(calculateProductsTotalPrince(product))}
          </h3>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
