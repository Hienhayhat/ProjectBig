'use client'
import { useEffect, useState } from "react";


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
                    <div key={productdata._id}>
                        <span>{productdata.name}</span>
                        <img src={`${process.env.API}${productdata.img}.jpg`}></img>
                    </div>
                )
            })}

        </div >
    )
}






export default Products;