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
    { label: "Recently Updated", value: "last-updated-desc" },
    { label: "Least Recently Updated", value: "last-updated-asc" },
    { label: "Stars: High to Low", value: "popularity-desc" },
    { label: "Stars: Low to High", value: "popularity-asc" },
    { label: "Alphabetical", value: "alphabetical" },
  ];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [currentSort, setCurrentSort] = useState<any>("Select Option");

  const handleSort = useDebouncedCallback((term: any) => {
    setCurrentSort(term);
    const params = new URLSearchParams(searchParams);
    const val = SORT_OPTIONS.find((option) => option.label === term);

    if (term) {
      params.set("sort", val.value);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    // Populating Sort Option
    if (params.get("sort")) {
      params.set("sort", params.get("sort") || "");
      setCurrentSort(params.get("sort"));
    }
  }, [pathname]);

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
            defaultValue={""}
            className="flex flex-col items-start p-[5px] "
          >
            {SORT_OPTIONS.map((option, key) => (
              <div
                className="flex items-center space-x-2 cursor-pointer"
                key={key}
              >
                <RadioGroupItem value={option.label} id={`${key}`} />
                <label htmlFor={`${key}`} className="cursor-pointer">
                  {option.label}
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
