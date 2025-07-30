import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import axios from "axios"
import Google from "next-auth/providers/google"
import { redirect } from 'next/navigation'
import { error } from "console"

// Extend the User type to include accessToken
declare module "next-auth" {
    interface User {
        accessToken?: string;
        [key: string]: any;
    }
}


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

                        user = { ...res.data.user, accessToken: res.data.accessToken };



                    })
                    .catch((err) => {
                        return error

                    })
                // You can use any database or API to validate the user credentials here.


                return user
            },
        }), Google({

            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
            authorization: {
                params: {
                    scope: 'openid email profile',
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async jwt({ token, account, user }) {
            // Handle credentials login
            if (user) {
                token.user = user; // Store all user data
                token.accessToken = user.accessToken; // Store accessToken if present
            }

            // Handle Google login
            if (account?.provider === 'google') {
                try {
                    const res = await axios.post(`${process.env.BE_URL}/auth/google`, {
                        accessToken: account.access_token,
                    });
                    if (res.status !== 200) {
                        redirect('/');
                    }
                    token.accessToken = res.data.accessToken;
                    token.user = res.data.user; // Store all user data from backend
                } catch (error) {
                    console.error('Google backend login failed:', error);
                }
            }

            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            session.user = token.user as any; // Expose all user data

            return session;
        },


        // authorized: async ({ auth }) => {
        //     // Logged in users are authenticated, otherwise redirect to login page
        //     return !!auth
        // }
    },

})
