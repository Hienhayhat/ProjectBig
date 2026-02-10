'use client'

import { useCartStore } from '@/stores/cart.store'

export default function CartComponent({
    onClose,
}: {
    onClose: () => void
}) {
    const cart = useCartStore((s) => s.cart)

    return (
        <>
            {/* overlay click ngoài */}
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            <div className="absolute right-0 top-full mt-2 z-50 w-80 bg-white shadow-xl border rounded p-4">
                {!cart && <p>Cart trống</p>}

                {cart && (
                    <>
                        <h4 className="font-semibold mb-2">Giỏ hàng</h4>

                        <div className="max-h-60 overflow-y-auto space-y-2">
                            {cart.items.map((item) => (
                                <div
                                    key={item?.productId}
                                    className="flex justify-between text-sm border-b pb-1"
                                >
                                    <span>{item?.name}</span>
                                    <span>x{item?.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-3 flex justify-end">
                            <a
                                href="/cart"
                                className="text-blue-600 text-sm hover:underline"
                            >
                                Xem giỏ →
                            </a>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
