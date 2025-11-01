'use client'

import { Rate } from "antd";
import { useEffect, useState } from "react";
import { ShoppingCartOutlined, CreditCardOutlined } from '@ant-design/icons';
const axios = require('axios')


const ProductDetail = (props: any) => {
    const [dataProduct, setDataProduct] = useState<any>()
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BE_URL}/products/${props.id}`)
            .then(function (response: any) {
                setDataProduct(response.data)

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
        <div className="flex items-center justify-center min-h-[700px] bg-gradient-to-br from-gray-100 to-blue-100 py-10">
            <div className="flex w-[80vw] max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Product Image */}
                <div className="w-[40%] flex items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-white">
                    <img
                        src={`${process.env.NEXT_PUBLIC_BE_URL}/${dataProduct?.img}.jpg`}
                        className="w-full h-[500px] object-contain rounded-xl border-4 border-blue-200 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                        alt={dataProduct?.name}
                        onClick={() => setShowModal(true)}
                    />
                </div>

                {/* Modal for fullscreen image */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
                        <img
                            src={`${process.env.NEXT_PUBLIC_BE_URL}/${dataProduct?.img}.jpg`}
                            className="w-[90vw] h-[90vh] object-contain rounded-2xl shadow-2xl"
                            alt={dataProduct?.name}
                        />
                        <button
                            className="absolute top-8 right-8 text-white text-3xl bg-black bg-opacity-50 rounded-full px-4 py-2 hover:bg-opacity-80"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>
                    </div>
                )}

                {/* Product Info Panel */}
                <div className="w-[60%] flex flex-col relative p-10">
                    <h2 className="text-5xl font-bold font-mono mb-4 text-blue-700">{dataProduct?.name}</h2>
                    <div className="flex items-center gap-8 mb-6">
                        <div className="flex items-center gap-2 text-lg">
                            <span className="font-semibold text-gray-600">Đánh giá:</span>
                            <Rate disabled defaultValue={dataProduct?.star} allowHalf />
                        </div>
                        <div className="text-lg text-gray-600">
                            <span className="font-semibold">Lượt mua:</span> {dataProduct?.purchaseCount}
                        </div>
                    </div>

                    <div className="border border-blue-300 rounded-lg h-16 bg-blue-50 text-3xl font-bold flex items-center px-6 text-red-600 mb-6 shadow">
                        {handlePriceDisplay(dataProduct?.price)}
                        <span className="text-xl ml-2 font-mono">đ</span>
                    </div>
                    <div className="mb-24">
                        <span className="text-xl font-semibold text-gray-700">Mô tả sản phẩm:</span>
                        <div className="mt-2 text-gray-600">{dataProduct?.description}</div>
                    </div>

                    {/* Buttons */}
                    <div className="absolute bottom-10 right-10 flex gap-6">
                        <button
                            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl shadow hover:bg-blue-700 transition-colors text-lg font-semibold"
                            onClick={() => console.log('Add to cart', dataProduct?.id)}
                        >
                            <ShoppingCartOutlined />
                            Thêm vào giỏ hàng
                        </button>
                        <button
                            className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl shadow hover:bg-green-700 transition-colors text-lg font-semibold"
                            onClick={() => console.log('Buy product', dataProduct?.id)}
                        >
                            <CreditCardOutlined />
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ProductDetail;