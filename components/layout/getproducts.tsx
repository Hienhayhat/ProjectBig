'use client'
import { useEffect, useState } from "react";
import Product from "./productAtMenu";

const axios = require('axios')
const Products = () => {
    const [listProduct, setlistProduct] = useState([])

    useEffect(() => {
        axios.get(`${process.env.API}products`)
            .then(function (response: any) {
                setlistProduct(response.data)

            })
            .catch(function (error: any) {
                console.log(error);
            });
    }, []);



    return (
        <div className="w-[85%] sm:w-[60%] flex flex-wrap border-2 border-black justify-center">
            {listProduct.map((productdata: any) => {
                return (
                    <div>
                        <Product productdata={productdata} />
                    </div>
                )
            })}

        </div >
    )
}






export default Products;