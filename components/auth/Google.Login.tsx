'use client'
import { signIn } from "next-auth/react";
import GoogleIcon from "../icon/google";
import { useRouter } from "next/navigation";
import { useState } from "react";




const GoogleLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const handleGoogleLogin = async () => {
        const res = await signIn("google", { redirect: false });
        console.log("Google login response:", res);

        if (res?.error) {
            setError("Login failed. Please try again.");
        } else {
            console.log(1);

            window.location.href = res?.url || "/";
        }
    };
    return (
        <div className="border-2 boder-gray-400 p-1 rounded-lg">
            <button className="btn btn-primary" onClick={() => { signIn('google') }} >
                <div className="object-fill flex items-center justify-center" >
                    <GoogleIcon />
                    <span>Google</span>
                </div>
            </button>

        </div>
    );
}
export default GoogleLogin;