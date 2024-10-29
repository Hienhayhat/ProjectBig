"use client";

import SearchIcon from "@/components/icon/search-icon";
import ShoppingCartIcon from "@/components/icon/shopping-cart";
import Image from "next/image";
import React, { useState } from "react";

export const NavBar = () => {
  const [input, setInput] = useState<string>("");
  return (
    <div className="sticky top-0 h-28 bg-white ">
      <div className="relative flex items-center px-20 h-full justify-between">
        <div className="relative hidden md:flex md:w-[80px] md:h-[80px] overflow-hidden">
          <Image
            alt="logo"
            src="/images/logo.png"
            fill
            style={{
              objectFit: "cover",
            }}
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <form
          className="flex w-[670px] h-[50px] rounded-2xl border-[2px] border-gray-400 p-3 items-center"
          onSubmit={() => {}}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="tìm kiếm"
            className="w-[670px] outline-none text-2xl"
          />
          <SearchIcon />
        </form>

        <ShoppingCartIcon width={60} height={60} />
      </div>
    </div>
  );
};
