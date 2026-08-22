"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Particles() {
  return (
    <div>
      <Button className="group not-disabled:inset-shadow-none mx-auto flex cursor-pointer items-center justify-center gap-0 rounded-full border-none bg-transparent px-0 py-5 font-normal shadow-none hover:bg-transparent [:hover,[data-pressed]]:bg-transparent">
        <span className="rounded-full bg-primary px-6 py-3 text-black duration-500 ease-in-out group-hover:bg-secondary group-hover:text-primary group-hover:transition-colors">
          Start a Project
        </span>
        <div className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full bg-primary p-5 text-black duration-500 ease-in-out group-hover:bg-secondary group-hover:text-primary group-hover:transition-colors">
          <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
          <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
        </div>
      </Button>
    </div>
  );
}
