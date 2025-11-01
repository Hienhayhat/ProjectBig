'use client';
const axios = require('axios')
import AdminPageComponent from "@/components/adminpage/adminProducts";
import AdminUsers from "@/components/adminpage/adminUsers";
import protectRouterAdmin from "@/components/Sercurity/protectRouterAdmin";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const AdminUsersPage = () => {
    const [listUser, setlistUser] = useState([])
    const { data: session } = useSession();

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`
            }
        })
            .then(function (response: any) {

                setlistUser(response?.data)

                console.log(response?.data);

            })
            .catch(function (error: any) {
                console.log(error);

            });
    }, []);


    return (
        <AdminUsers List={listUser} />
    )

}
export default protectRouterAdmin(AdminUsersPage);