import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

const ProductList = async () => {
  const Products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
  });

  return (
    <div className="flex overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {Products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
