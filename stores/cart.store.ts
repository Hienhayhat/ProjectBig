import { Cart } from '@/type'
import { create } from 'zustand'


interface CartState {

    cart: Cart | null
    loading: boolean
    fetchCart: (userId: string) => Promise<void>
    addToCart: (payload: {
        productId: string
        quantity?: number
        variants?: Record<string, any>
    }) => Promise<void>

    updateQuantity: (
        productId: string,
        quantity: number,
        variants?: Record<string, any>
    ) => Promise<void>

    removeItem: (
        productId: string,
        variants?: Record<string, any>
    ) => Promise<void>

    clearCart: () => void
}


export const useCartStore = create<CartState>((set) => ({

    cart: null,
    loading: false,




    // 🔹 Load cart (khi app start)
    fetchCart: async (session: any) => {
        console.log(process.env.NEXT_PUBLIC_BE_URL);
        set({ loading: true })
        const res = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/cart/${session.user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        const cart = await res.json()
        console.log(cart);

        set({ cart, loading: false })
    },

    // 🔹 Add to cart
    addToCart: async ({ productId, quantity = 1, variants }) => {
        const res = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity, variants })
        })

        const cart = await res.json()
        set({ cart })
    },

    // 🔹 Update quantity
    updateQuantity: async (productId, quantity, variants) => {
        const res = await fetch('/api/cart/item', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity, variants })
        })

        const cart = await res.json()
        set({ cart })
    },

    // 🔹 Remove item
    removeItem: async (productId, variants) => {
        const res = await fetch('/api/cart/item', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, variants })
        })

        const cart = await res.json()
        set({ cart })
    },

    clearCart: () => set({ cart: null })
}))
