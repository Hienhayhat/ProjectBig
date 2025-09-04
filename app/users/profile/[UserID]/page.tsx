import UserDetail from "@/components/user/userdetail";

export default async function Page({
    params,
}: {
    params: Promise<{ UserID: string }>
}) {
    const userid = (await params).UserID;

    return <UserDetail userid={userid} />
}