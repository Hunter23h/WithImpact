"use client";
import React, { useEffect } from "react";
import Sort from "./sort";
import Filters from "./filters";
import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/app/context";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";

function SidebarActions() {
  const { showFilters, setShowFilters } = useGlobalContext();
  useEffect(() => {
    setShowFilters(false);
  }, []);
  const inMobileView = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <div
      className={cn(
        `hidden md:flex min-w-[300px] w-[100%] max-w-[15vw] bg-white`,
        {
          "overflow-auto max-h-[92vh] flex fixed md:relative top-[70px] left-0 max-w-none md:top-0 shadow-lg z-[4] md:z-auto md:shadow-none px-[30px] md:px-0 py-[60px] pb-[150px] md:py-0":
            inMobileView && showFilters,
        }
      )}
    >
      {inMobileView && showFilters && (
        <Button
          variant="outline"
          className="block md:hidden fixed top-[90px] right-[20px]"
          onClick={() => setShowFilters(false)}
        >
          x
        </Button>
      )}

      <div className="border-b-solid border-b-[2px] border-b-[white] h-full flex flex-col gap-[30px] ">
        <Sort />
        <Filters />
      </div>
    </div>
  );
}

export default SidebarActions;
