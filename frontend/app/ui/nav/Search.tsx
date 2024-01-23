"use client";
import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: any) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("name", term);
      params.set("page", "1");
    } else {
      params.delete("name");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <>
      <Input
        placeholder="Search projects, owners, sdg goals, etc..."
        className=""
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </>
  );
}

export default Search;
