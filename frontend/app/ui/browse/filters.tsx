"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "../../../components/ui/checkbox";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function Filters() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const sdgs = [
    "No Poverty",
    "Zero Hunger",
    "Good Health and Well-being",
    "Quality Education",
    "Gender Equality",
    "Clean Water and Sanitation",
    "Affordable and Clean Energy",
    "Decent Work and Economic Growth",
    "Industry, Innovation, and Infrastructure",
    "Reduced Inequality",
    "Sustainable Cities and Communities",
    "Responsible Consumption and Production",
    "Climate Action",
    "Life Below Water",
    "Life on Land",
    "Peace, Justice, and Strong Institutions",
    "Partnerships for the Goals"
  ];  

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
    "Vue"
  ];

  const status = [
    "Active",
    "Not Active"
  ];

  const newcomer_friendly = [
    "True",
    "False"
  ];

  const handleFilter = useDebouncedCallback((filterType, filterValue, isChecked) => {
    const updatedFilters = { ...selectedFilters };

    if (isChecked) {
      // Add the filter value to the array of selected filters for the given type
      updatedFilters[filterType] = [...(updatedFilters[filterType] || []), filterValue];
    } else {
      // Remove the filter value from the array of selected filters for the given type
      updatedFilters[filterType] = (updatedFilters[filterType] || []).filter(value => value !== filterValue);
    }

    setSelectedFilters(updatedFilters);

    // const params = new URLSearchParams(searchParams);
    // Object.entries(updatedFilters).forEach(([type, values]) => {
    //   // Set the query parameter for each filter type with its selected values
    //   params.set(type, values.join(","));
    // });
    const params = new URLSearchParams(searchParams);
    Object.entries(updatedFilters).forEach(([type, values]) => {
    if (type === 'sdg') {
      const indexes = values.map(value => sdgs.indexOf(value) + 1); // Get the indexes of the values in the SDG array and add 1
      params.set(type, indexes.join(","));
    } else {
      params.set(type, values.join(","));
    }
    });

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const parsedFilters = {};
    for (const [type, value] of params.entries()) {
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
        {sdgs.map((filter, key) => (
          <div className="flex justify-start gap-[10px] items-center" key={key}>
            <Checkbox
              checked={selectedFilters.sdg?.includes(filter)}
              onCheckedChange={(isChecked) => handleFilter('sdg', filter, isChecked)}
            />
            <label>{filter}</label>
          </div>
        ))}
      </div>

      {/* Languages */}
      <div>
        <h3>Languages</h3>
        {languages.map((filter, key) => (
          <div className="flex justify-start gap-[10px] items-center" key={key}>
            <Checkbox
              checked={selectedFilters.languages?.includes(filter)}
              onCheckedChange={(isChecked) => handleFilter('languages', filter, isChecked)}
            />
            <label>{filter}</label>
          </div>
        ))}
      </div>

      {/* Status */}
      <div>
        <h3>Status</h3>
        {status.map((filter, key) => (
          <div className="flex justify-start gap-[10px] items-center" key={key}>
            <Checkbox
              checked={selectedFilters.status?.includes(filter)}
              onCheckedChange={(isChecked) => handleFilter('status', filter, isChecked)}
            />
            <label>{filter}</label>
          </div>
        ))}
      </div>

      {/* Newcomer Friendly */}
      <div>
        <h3>Newcomer Friendly</h3>
        {newcomer_friendly.map((filter, key) => (
          <div className="flex justify-start gap-[10px] items-center" key={key}>
            <Checkbox
              checked={selectedFilters.newcomer_friendly?.includes(filter)}
              onCheckedChange={(isChecked) => handleFilter('newcomer_friendly', filter, isChecked)}
            />
            <label>{filter}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filters;
