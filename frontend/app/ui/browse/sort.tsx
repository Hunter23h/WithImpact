"use client";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function Sort() {
  const SORT_OPTIONS = [
    "Name: a to z",
    "Name: z to a",
    "Stars: lowest to highest",
    "Stars: highest to lowest",
  ];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [currentSort, setCurrentSort] = useState(SORT_OPTIONS[0]);

  const handleSort = useDebouncedCallback((term: any) => {
    setCurrentSort(term);
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("sort", term);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (params.get("sort")) params.set("sort", params.get("sort") || "");
  }, []);

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
            className="h-auto  flex items-center justify-between gap-[30px] w-[218px]"
          >
            <span className="max-w-[160px] overflow-hidden text-ellipsis">
              {currentSort}
            </span>
            <Image
              src="/icons/dropdown.svg"
              height={10}
              width={10}
              alt="dropdown arrow"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[218px]">
          <RadioGroup
            value={currentSort}
            onValueChange={handleSort}
            defaultValue={SORT_OPTIONS[0]}
            className="flex flex-col items-start p-[5px] "
          >
            {SORT_OPTIONS.map((option, key) => (
              <div
                className="flex items-center space-x-2 cursor-pointer"
                key={key}
              >
                <RadioGroupItem value={option} id={`${key}`} />
                <label htmlFor={`${key}`} className="cursor-pointer">
                  {option}
                </label>
              </div>
            ))}
          </RadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Sort;
