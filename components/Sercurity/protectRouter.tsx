"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";



export default function protectRouter(Component: any) {

    return function ProtectRouter(props: any) {
        const session = useSession();
        useEffect(() => {
            if (session.data) {
                redirect("/");
            }
        }, [session.status, session.data]);
        if (session.data) {
            return null
        }
        return <Component {...props} />;
    }
}
