import NextAuth from 'next-auth';
interface Product {
    id: any,
    name: string,
    type: string,
    price: number,
    description: string,
    purchaseCount: number,
    star: number
}
interface Catalog {
    name: string,
    icon: any,
    stt: number
}

interface IUser {
    id: string
    name: string
}


declare module 'next-auth' {
    interface Session {
        accessToken?: string;
    }

    interface JWT {
        accessToken?: string;
    }
}