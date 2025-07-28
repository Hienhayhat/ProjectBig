"use client";
import { use, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const axios = require('axios')
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GoogleLogin from "./Google.Login";
import { useRouter } from "next/navigation"
import protectRouter from "../Sercurity/protectRouter";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    repassword: z.string(),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    phonenumber: z.string().optional()
}).refine((data) => data.password === data.repassword, {
    message: "Passwords do not match.",
    path: ["repassword"], // set the error on repassword field
});;

function Resgister() {
    const [responseMsg, setResponseMsg] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
    const router = useRouter()
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            repassword: "",
            email: "",
            phonenumber: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        axios.post(`${process.env.API}users/register`, values)
            .then(function (response: any) {
                if (response.data.status == 201) {
                    setResponseMsg(response.data.message);
                    setAlertType("success");

                } else {
                    setResponseMsg(response.data.message || "Register failed!");
                    setAlertType("error");
                }


                // router.push('/signin')
                console.log(response.data);

            })
            .catch(function (error: any) {
                setResponseMsg(error?.response?.data?.message || "Internal server error!");
                setAlertType("error");
            });

    }
    return (
        <section className="flex justify-center items-center px-[16px] md:px-[80px] w-full">
            <div className="flex flex-col items-center my-10">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-[400px]">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="m-4">
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
                                <FormItem className="m-4">
                                    <FormLabel className="text-base">Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="repassword"
                            render={({ field }) => (
                                <FormItem className="m-4">
                                    <FormLabel className="text-base">Repassword</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Repassword" {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="m-4">
                                    <FormLabel className="text-base">Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} type="email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phonenumber"
                            render={({ field }) => (
                                <FormItem className="m-4">
                                    <FormLabel className="text-base">Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Phone Number (optional)" {...field} type="phonenumber" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {responseMsg && (
                            <div
                                className={`m-4 px-4 py-3 rounded text-center text-sm font-medium transition-all duration-300
                        ${alertType === "success"
                                        ? "bg-green-100 text-green-700 border border-green-300"
                                        : "bg-red-100 text-red-700 border border-red-300"
                                    }`}
                            >
                                {responseMsg}
                            </div>
                        )}
                        <Button type="submit">Submit</Button>
                    </form>
                    <GoogleLogin />

                </Form>
            </div>

        </section>
    );
}
export default protectRouter(Resgister);