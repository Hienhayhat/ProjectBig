
import Carousel from "@/components/layout/tab/tab";
import ListProduct from "@/components/product/getproducts";
import ProductsCatalog from "@/components/product/ProductsCatalog";
import { SessionProvider } from "next-auth/react"

export default function Home() {


  return (
    <SessionProvider>
      <div className="w-[100%] flex flex-col items-center">
        <Carousel />
        <div className="border-[3px] mx-3 border-solid border-cyan-200 rounded-[10px] my-5 w-[85%] sm:w-[80%]">
          <h2 className="text-4xl font-semibold text-sky-600" >Danh mục</h2>
          <ProductsCatalog />

        </div>
        <div className="border-[3px] mx-3 border-solid border-cyan-200 rounded-[10px] w-[85%] sm:w-[80%]">
          <h2 className="text-4xl font-semibold text-sky-600">Sản phẩm</h2>
          <ListProduct />

        </div>


      </div>
    </SessionProvider>


  );
}
