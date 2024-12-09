import Products from "@/components/layout/getproducts";
import ProductsCatalog from "@/components/layout/ProductsCatalog";
import Carousel from "@/components/layout/tab";


export default function Home() {
  return (
    <div className="w-[100%] flex flex-col items-center">
      <Carousel />
      <ProductsCatalog />
      <Products />

    </div>

  );
}
