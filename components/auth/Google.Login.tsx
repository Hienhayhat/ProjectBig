import { useRouter } from 'next/navigation'
import GoogleIcon from "../icon/google";

const GoogleLogin = () => {
    const router = useRouter()
    return (
        <div className="border-2 boder-gray-400 p-1 rounded-lg">
            <button className="btn btn-primary" onClick={() => {
                router.push("/auth/google")
            }}>
                <div className="object-fill flex items-center justify-center">
                    <GoogleIcon />
                    <span>Google</span>
                </div>







            </button>
        </div>
    );
}
export default GoogleLogin;