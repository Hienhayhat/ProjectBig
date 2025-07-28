'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const axios = require('axios')
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GoogleLogin from "./Google.Login";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import protectRouter from "../Sercurity/protectRouter";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(1, {
        message: "password must be at least 1 characters."
    })
});

function Signin() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
    const router = useRouter()
    // 2. Define a submit handler.
    const onSubmit = async (values: any) => {
        // Do something with the form values.

        const { username, password } = values
        const value = await signIn("credentials", { username, password, redirect: false })

    }




    return (
        <section className="flex justify-center items-center px-[16px] md:px-[80px] h-[400px]">
            <div className="flex flex-col items-center">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-[400px] p-5 border rounded-lg transition-all hover:shadow-2xl">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="mt-2" >Submit</Button>
                    </form>
                    <GoogleLogin />
                </Form>
            </div>
        </section>
    );

}

export default protectRouter(Signin);