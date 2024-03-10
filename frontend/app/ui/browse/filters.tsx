"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "../../../components/ui/checkbox";
import { useParams, useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Label } from "@/components/ui/label";
import { SDGS } from "@/lib/constants";
function Filters() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const languages = [
    "C",
    "C++",
    "CSS",
    "Dart",
    "Dockerfile",
    "HTML",
    "Java",
    "JavaScript",
    "Jupyter Notebook",
    "Kotlin",
    "Makefile",
    "Objective-C",
    "PHP",
    "Python",
    "R",
    "Ruby",
    "SCSS",
    "Shell",
    "Swift",
    "TypeScript",
    "Vue",
  ];

  const status = ["Active", "Not Active"];

  const newcomer_friendly = ["True", "False"];

  const handleFilter = useDebouncedCallback(
    (filterType, filterValue, isChecked) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      const updatedFilters = {} as any;

      for (const [type, value] of params.entries()) {
        // Parse the query parameters into an object representing the selected filters
        updatedFilters[type] = value.split(",");
      }

      if (isChecked) {
        // Add the filter value to the array of selected filters for the given type
        updatedFilters[filterType] = [
          ...(updatedFilters[filterType] || []),
          filterValue,
        ];

      } else {
        // Remove the filter value from the array of selected filters for the given type
        updatedFilters[filterType] = (updatedFilters[filterType] || []).filter(
          (value) => {
            return value !== filterValue;
          }
        );
      }

      setSelectedFilters(updatedFilters);

      // Reupdate the URL with the new param and the existing ones
      Object.entries(updatedFilters).forEach(([type, values]) => {
        if (values.length <= 0) {
          params.delete(type);
          return;
        }
        const queryList = values.join(",");
        params.set(type, queryList);
      });

      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  useEffect(() => {
    const paramsTemp = new URLSearchParams(searchParams);

    const parsedFilters = {} as any;
    for (const [type, value] of paramsTemp.entries()) {
      // Parse the query parameters into an object representing the selected filters
      parsedFilters[type] = value.split(",");
    }
    setSelectedFilters(parsedFilters);
  }, []);

  return (
    <div className="flex flex-col gap-[30px]">
      {/* SDG Goals */}
      <div>
        <h3>SDGs</h3>
        <div className="flex flex-col  gap-[5px] items-start">
          {SDGS.map((filter, key) => (
            <div
              className="flex justify-start gap-[10px] items-center"
              key={key}
            >
              <Checkbox
                checked={selectedFilters.sdg?.includes(`${key + 1}`)}
                onCheckedChange={(isChecked) =>
                  handleFilter("sdg", (key + 1).toString(), isChecked)
                }
                id={`SDGS-${key}`}
              />
              <Label
                className="cursor-pointer hover:text-primary"
                htmlFor={`SDGS-${key}`}
              >
                {filter}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <h3>Languages</h3>
        <div className="flex flex-col  gap-[5px] items-start">
          {languages.map((filter, key) => (
            <div
              className="flex justify-start gap-[10px] items-center"
              key={key}
            >
              <Checkbox
                checked={selectedFilters.languages?.includes(filter)}
                onCheckedChange={(isChecked) =>
                  handleFilter("languages", filter, isChecked)
                }
                id={`languages-${key}`}
              />
              <Label
                className="cursor-pointer hover:text-primary"
                htmlFor={`languages-${key}`}
              >
                {filter}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <h3>Status</h3>
        <div className="flex flex-col  gap-[5px] items-start">
          {status.map((filter, key) => (
            <div
              className="flex justify-start gap-[10px] items-center"
              key={key}
            >
              <Checkbox
                checked={selectedFilters.status?.includes(filter)}
                onCheckedChange={(isChecked) =>
                  handleFilter("status", filter, isChecked)
                }
                id={`status-${key}`}
              />
              <Label
                className="cursor-pointer hover:text-primary"
                htmlFor={`status-${key}`}
              >
                {filter}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Newcomer Friendly */}
      <div>
        <h3>Newcomer Friendly</h3>
        <div className="flex flex-col  gap-[5px] items-start">
          {newcomer_friendly.map((filter, key) => (
            <div
              className="flex justify-start gap-[10px] items-center"
              key={key}
            >
              <Checkbox
                checked={selectedFilters.newcomer_friendly?.includes(filter)}
                onCheckedChange={(isChecked) =>
                  handleFilter("newcomer_friendly", filter, isChecked)
                }
                id={`friend-${key}`}
              />
              <Label
                className="cursor-pointer hover:text-primary"
                htmlFor={`friend-${key}`}
              >
                {filter}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;
