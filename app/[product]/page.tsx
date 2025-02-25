import ProductDetail from "@/components/layout/productDetail"

export default async function Page({
    params,
}: {
    params: Promise<{ product: string }>
}) {
    const id = (await params).product
    return (
        <div>
            <ProductDetail id={id} />
        </div>

    )
}