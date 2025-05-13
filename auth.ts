import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import axios from "axios"


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null

                await axios.post(`${process.env.BE_URL}/auth/login`, {
                    username: credentials.username,
                    password: credentials.password,
                })
                    .then((res) => {

                        user = res.data.user


                    })
                    .catch((err) => {


                    })
                // You can use any database or API to validate the user credentials here.


                return user
            },
        }),
    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.user = user as IUser
            }
            return token
        },
        session({ session, token }) {
            (session.user as any) = token.user
            return session
        },
    },
})