import Link from "next/link"




const arrProducts = [{
    stt: 1,
    name: 'thể thao',
    icon: 'hiển',


}, {
    stt: 2,
    name: 'đồ ăn',
    icon: 'hiển',
    URL: '123'

},

]




const ProductsCatalog = () => {
    return (
        <div className="flex flex-row justify-center py-10">
            {arrProducts.map((product: Catalog) => {
                return (
                    <div key={product.stt} className="h-[100px] w-[100px] border-[3px] mx-3 border-solid border-cyan-200 rounded-[10px] shadow-lg shadow-cyan-500/50 bg-cyan-100 hover:border-pink-200 hover:shadow-pink-500/50 " >
                        <Link href={product.name} className="flex flex-col  text-[20px]  justify-center w-[100%] h-[100%] items-center">
                            <span>{product.name}</span>
                            <span>{product.icon}</span>
                        </Link>
                    </div>
                )


            })}
        </div>
    )

}
export default ProductsCatalog;