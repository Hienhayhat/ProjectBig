'use client'

import { Rate } from "antd";
import { useEffect, useState } from "react";
const axios = require('axios')


const ProductDetail = (props: any) => {
    const [dataProduct, setDataProduct] = useState<any>()
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BE_URL}/products/${props.id}`)
            .then(function (response: any) {
                setDataProduct(response.data)
                console.log(response.data);

            })
            .catch(function (error: any) {
                console.log(error);
            });
    }, []);
    const handlePriceDisplay = (price: number) => {
        let Pricedisplay: string
        if (1000000 > price && price >= 1000) {
            Pricedisplay = `${price / 1000}.000`
        } else if (1000000000 > price && price >= 1000000) {
            Pricedisplay = `${price / 1000000}.000.000`
        } else if (1000000000000 > price && price >= 1000000000) {
            Pricedisplay = `${price / 1000000000}.000.000.000`
        } else if (1000000000000000 > price && price >= 1000000000000) {
            Pricedisplay = `${price / 1000000000000}.000.000.000.000`
        } else if (price >= 1000000000000000) {
            Pricedisplay = `${price / 1000000000000000}.000.000.000.000.000`
        } else {
            Pricedisplay = `${price}`
        }
        return Pricedisplay
    }
    return (
        <div >
            <div className="relative w-[100vw] h-[700px]">
                <div className="absolute top-14 left-[10%]">
                    <img src={`${process.env.API}${dataProduct?.img}.jpg`} className="w-[39%] h-[700px] object-fill "></img>
                </div>

                <div className="border-black border-2 absolute right-[10%] w-[40%] h-[700px] top-14 flex flex-col">
                    <h2 className="  text-7xl font-mono">{dataProduct?.name}</h2>
                    <div className="flex justify-between">
                        <div className="h-5 m-[20px]">Đánh giá :<Rate disabled defaultValue={dataProduct?.star} allowHalf /></div>
                        <div className="h-5 my-[20px] mx-10">Lượt mua:{dataProduct?.purchaseCount}</div>
                    </div>

                    <div className="border-black border-2 h-16 bg-slate-200 text-2xl font-medium flex items-center px-3 text-red-600" >
                        {handlePriceDisplay(dataProduct?.price)}
                        <span className="text-xl mb-5 mx-1 font-mono ">đ</span>
                    </div>
                    <div >
                        <span className="text-xl">Mô tả sản phẩm:</span>
                        <div>{dataProduct?.description}</div>
                    </div>

                </div>

            </div>
        </div>

    )
}
export default ProductDetail;