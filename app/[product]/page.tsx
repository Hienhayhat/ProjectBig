import ProductDetail from "@/components/product/productDetail"

export default async function Page({
    params,
}: {
    params: Promise<{ product: string }>
}) {
    const id = (await params).product
    console.log('id', id);

    return (
        <div>
            <ProductDetail id={id} />
        </div>

    )
}