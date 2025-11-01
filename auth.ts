import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import axios from "axios"
import Google from "next-auth/providers/google"


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

                        user = { data: res.data.user, accessToken: res.data.access_token };




                    })
                    .catch((err) => {
                        console.log('err:', err);

                        throw new Error("Invalid username or password");

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
                token.user = user.data; // Store all user data
                token.accessToken = user.accessToken; // Store accessToken from backend
            }

            // Handle Google login
            if (account?.provider === 'google') {
                try {
                    const res = await axios.post(`${process.env.BE_URL}/auth/google`, {
                        accessToken: account.access_token,

                    });




                    token.accessToken = res.data.access_token; // Store accessToken from backend
                    token.user = res.data.user; // Store all user data from backend
                } catch (error) {
                    console.error('Google backend login failed:', error);
                }
            }


            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;// Expose accessToken to the client
            session.user = token.user as any; // Expose all user data


            return session;
        },


        // authorized: async ({ auth }) => {
        //     // Logged in users are authenticated, otherwise redirect to login page
        //     return !!auth
        // }
    },

})
