import { FacebookFilled, GithubFilled } from "@ant-design/icons"
import { Footer } from "antd/es/layout/layout"
import Link from "next/link"


const FooterApp = (): any => {
    return (
        <div >
            <Footer className="relative ">
                <Link href="/helpclient/FAQ"  ><div className="text-1xl absolute right-2 top-5 ">FAQ</div></Link>
                <Link href="/helpclient/aboutUs"><div className="text-1xl absolute right-2 top-[50%] ">About Us</div></Link>
                <Link href="https://www.facebook.com/profile.php?id=100076069864342" className="text-2xl"><FacebookFilled />Hiển</Link>
                <Link href="https://www.facebook.com/profile.php?id=100080934456147" className="text-2xl"><FacebookFilled /> Dũng</Link>
                <Link href="https://github.com/Hienhayhat/ProjectBig" className="text-2xl"><GithubFilled />github</Link>


                <div className="absolute right-[47%] bottom-[47%] text-2xl ">created by @hiendung</div>
            </Footer>
        </div>

    )

}
export default FooterApp