// components/ClientInit.tsx
'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/stores/cart.store'
import { useSessionStore } from '@/stores/session.store'

export default function ClientInit(props: { session: any }) {

    const setSession = useSessionStore(state => state.setSession)
    const fetchCart = useCartStore(state => state.fetchCart)

    useEffect(() => {
        if (props.session && props.session.user?.id) {
            setSession(props.session)
            fetchCart(props.session)
        } else {
            setSession(null)
        }
    }, [props.session])
    return null
}
