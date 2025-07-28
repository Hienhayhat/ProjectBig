export default async function Page({
    params,
}: {
    params: Promise<{ user: any }>
}) {
    const { user } = (await params).user
    return <div>My Post: {user}</div>
}