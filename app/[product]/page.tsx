import ProductDetail from "@/components/product/productDetail"

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