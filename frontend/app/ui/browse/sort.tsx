"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";
import Image from "next/image";

function Sort() {
  return (
    <div >
      <div className="flex justify-start items-center gap-[5px]">
        <h3>Sort By</h3>
        <Image src={"/icons/sort.svg"} height={25} width={25} alt="sort" />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"outline"}
            className="h-auto  flex items-center justify-between gap-[30px]"
          >
            <span>Most Popular</span>
            <Image
              src="/icons/dropdown.svg"
              height={10}
              width={10}
              alt="dropdown arrow"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={"name"} onValueChange={() => {}}>
            <DropdownMenuRadioItem value={"name"}>Name</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={"Keivn"}>Name</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Sort;
