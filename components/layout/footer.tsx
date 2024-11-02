import { FacebookFilled, GithubFilled, PhoneOutlined } from "@ant-design/icons"
import { Footer } from "antd/es/layout/layout"
import Link from "next/link"


const FooterApp = (): any => {
    return (
        <div className="fixed bottom-0 w-[100%] " >
            <Footer className="relative h-[100px]">
                <Link href="/helpclient/FAQ"  ><div className="text-0.5xl sm:text-1xl absolute right-2 top-[10%] ">FAQ</div></Link>
                <Link href="/helpclient/aboutUs"><div className="text-0.5xl sm:text-1xl absolute right-2 top-[30%] ">About Us</div></Link>
                <div className="flex flex-col absolute left-1 top-1">
                    <Link href="https://www.facebook.com/profile.php?id=100076069864342" className="text-1xl sm:text-2xl "><FacebookFilled />Hiển</Link>
                    <Link href="https://www.facebook.com/profile.php?id=100080934456147" className="text-1xl sm:text-2xl "><FacebookFilled /> Dũng</Link>
                    <Link href="https://github.com/Hienhayhat/ProjectBig" className="text-1xl sm:text-2xl "><GithubFilled />github</Link>

                </div>

                <div className="text-0.5xl sm:text-1xl absolute right-2 top-[50%]"> <PhoneOutlined rotate={120} />0123456789 </div>
                <div className=" flex justify-center align-middle tex ">created by @hiendung</div>
            </Footer>
        </div>

    )

}
export default FooterApp