import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import ProductList from "./_components/product-list";
import Search from "./_components/search";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";

const Home = async () => {
  const Products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    // lembrar de quando chamar um elemento fazer </>
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner
          src="/banner_01.png"
          alt="Até 30% de desconto em pizzas!"
        />
      </div>

      <div className=" space-y-4 pt-4">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <div className="px-5">
          <ProductList products={Products} />
        </div>
      </div>
      <div className="px-5 pt-6">
        <PromoBanner
          src="/banner_02.png"
          alt="A partir de R$17,90 em lanches!"
        />
      </div>
    </>
  );
};

export default Home;
