"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function protectRouterAdmin(Component: any) {
    return function ProtectRouterAdmin(props: any) {
        const { data: session, status } = useSession();
        const router = useRouter();

        useEffect(() => {
            // only run after the session is fully loaded
            if (status === "authenticated") {
                if (session?.user?.role !== "admin") {
                    router.replace("/");
                }
            }
        }, [status, session, router]);

        // ✅ Show a loading screen until session is ready
        if (status === "loading") {
            // 👇 You can customize this to match your design system
            return (
                <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <p>Checking your session, please wait...</p>
                </div>
            );
        }


        // ✅ Prevent showing admin page to non-admin users
        if (status === "authenticated" && session?.user?.role !== "admin") {
            return null;
        }

        return <Component {...props} />;
    };
}