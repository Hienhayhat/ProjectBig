'use client';
const axios = require('axios')
import AdminPageComponent from "@/components/adminpage/adminProducts";
import protectRouterAdmin from "@/components/Sercurity/protectRouterAdmin";
import { useEffect, useState } from "react";

const AdminProductsPage = () => {
    const [listProduct, setlistProduct] = useState([])
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BE_URL}/products`)
            .then(function (response: any) {

                setlistProduct(response?.data?.Product)

            })
            .catch(function (error: any) {
                console.log(error);

            });
    }, []);


    return (
        <AdminPageComponent List={listProduct} Type={'products'} />
    )

}
export default protectRouterAdmin(AdminProductsPage)