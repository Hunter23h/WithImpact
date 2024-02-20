"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "../../../components/ui/checkbox";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function Filters() {
  const FILTERS = {};
  const [filters, setFilters] = useState([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // const { replace } = useRouter();

  const handleFilter = useDebouncedCallback((newFilter: any) => {
    console.log(newFilter);
    // setFilters([...filters, newFilter]);
    // const params = new URLSearchParams(searchParams);

    // // If no filters set
    // if (!params.get("filter")) {
    //   params.delete("filter");
    // }

    // // If filter is added
    // if (newFilter) {
    //   params.set("filter", filters.join(","));
    // }

    // replace(`${pathname}?${params.toString()}`);
  }, 300);

  // useEffect(() => {
  //   const params = new URLSearchParams(searchParams);
  //   if (params.get("filter")) params.set("filter", params.get("filter") || "");
  // }, []);
  return (
    <div className="flex flex-col gap-[30px]">
      {/* SDG Goals */}
      <div>
        <h3>SDG Goals</h3>
        {["Poverty", "Hunger"].map((filter, key) => (
          <div className="flex justify-start gap-[10px] items-center" key={key}>
            <Checkbox checked={true} onCheckedChange={() => {}} />
            <label>{filter}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filters;
