"use client";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
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
import { usePathname, useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";

function Sort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // const { replace } = useRouter();

  // const handleSearch = useDebouncedCallback((term: any) => {
  //   const params = new URLSearchParams(searchParams);

  //   params.set("page", "1");
  //   if (term) {
  //     params.set("search", term);
  //   } else {
  //     params.delete("search");
  //   }

  //   replace(`${pathname}?${params.toString()}`);
  // }, 300);

  return (
    <div>
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
