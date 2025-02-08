'use client'
import React from "react";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import useInvalidPaths from '../../lib/use-invalid-path';

export default function Header(){
    const invalidPath:boolean= useInvalidPaths();
    if (invalidPath) return <></>;
    return(
    <div className="flex fixed inset-0 flex-col items-center z-50 h-20 bg-background border-b border-border border-pink-500">
      <div className="max-w-[1500px] md:px-14 px-4 w-full h-full flex flex-row items-center justify-between">
        <Link href="/" sr-only="Home-page" className="cursor-pointer">
          <label className="font-extrabold text-2xl ">Deenix</label>
        </Link>
        <ThemeToggle />
      </div>
    </div>
    )
};