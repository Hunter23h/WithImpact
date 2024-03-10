"use client";
import { useGlobalContext } from "@/app/context";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function ShowFilters() {
  const { setShowFilters, showFilters } = useGlobalContext();
  
  return (
    <div className="block md:hidden fixed right-[20px] bottom-[20px]">
      <Button
        variant={"outline"}
        className="rounded-[50%] h-[60px] w-[60px]"
        onClick={() => setShowFilters(true)}
      >
        <div className="h-[60px] w-[60px] relative">
          <Image
            src="/icons/filter.png"
            fill
            alt="filter"
            className="object-contain"
          />
        </div>
      </Button>
    </div>
  );
}

export default ShowFilters;
