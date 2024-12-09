"use client";

import Logo from "@/components/icon/logo";
import SearchIcon from "@/components/icon/search-icon";
import ShoppingCartIcon from "@/components/icon/shopping-cart";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const locale = ["Vi", "En"];

export const NavBar = () => {
  const [input, setInput] = useState<string>("");
  const router = useRouter()
  return (
    <header className="sticky top-0 bg-white px-[16px] md:px-[80px] z-10 custom-bg pb-3">
      <div className="w-full flex justify-between m-1">
        <div></div>
        <div className="flex gap-6">
          <Link
            href="/"
            className="flex items-center transition duration-300 hover:text-gray-500 px-2 rounded-md"
          >
            Hỗ trợ
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-gray-500">VI</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex flex-col w-[61.23px] text-center">
                    {locale?.map((item) => (
                      <div
                        key={item}
                        className="m-1 transition hover:text-gray-500 rounded-sm cursor-pointer"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Link
            href="/register"
            className="flex items-center transition duration-300 hover:text-gray-500 px-2 rounded-md"
          >
            Đăng ký
          </Link>
          <Link
            href="/signin"
            className="flex items-center transition duration-300 hover:text-gray-500 px-2 rounded-md"
          >
            Đăng nhập
          </Link>
        </div>
      </div>

      <div className="relative flex items-center px-10 h-full justify-between">
        <div className="flex flex-row items-center gap-1 cursor-pointer" onClick={() => {
          router.push('/')
        }}>
          <div className="relative w-10 h-10 overflow-hidden">
            <Image
              src="/images/cover.png"
              alt=""
              fill
              style={{
                objectFit: "cover",
              }}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <Logo />
        </div>

        <form
          className="flex w-[670px] h-[50px] rounded-2xl border-[2px] border-gray-400 p-3 items-center bg-white"
          onSubmit={() => { }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="tìm kiếm"
            className="w-[670px] outline-none text-2xl"
          />
          <button>
            <SearchIcon className="cursor-pointer" />
          </button>
        </form>

        <div className="flex w-[112.5px] h-auto justify-center items-center cursor-pointer transition-transform hover:scale-110">
          <ShoppingCartIcon width={40} height={40} />
        </div>
      </div>
    </header>
  );
};
