import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import Image from "next/image";

const Home = () => {
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
        <Image
          src="/banner_01.png"
          alt="até 30% de desconto em pizzas"
          width={0}
          height={0}
          className="h-auto w-full"
          sizes="100vw"
          quality={100}
        />
      </div>
    </>
  );
};

export default Home;
