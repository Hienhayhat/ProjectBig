import ProductsCatalog from "@/components/layout/ProductsCatalog";
import Carousel from "@/components/layout/tab";


export default function Home() {
  return (
    <div className="w-[100%] ">
      <Carousel />
      <ProductsCatalog />
    </div>

  );
}
