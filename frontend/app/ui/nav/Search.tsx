"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function Search({ className }:any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const handleSearch = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.replace(`/browse?${params.toString()}`);
  }, 300);

  return (
    <>
      <Input
        placeholder="Search projects, owners, sdg goals, etc..."
        className={cn(`text-body`, className)}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </>
  );
}

export default Search;
