export default async function Page({
    params,
}: {
    params: Promise<{ UserID: any }>
}) {
    const { userid } = (await params).UserID;
    console.log('userid', userid);

    return <div>My Post: {userid}</div>
}