import { cn } from "@/lib/utils";
import React from "react";

function PercentageBar({ projectData }: any) {
  return (
    <div className="py-[10px]">
      {projectData?.languages.map((languageObject: any, key: any) => {
        // Convert each key-value pair into an object with language and percentage properties
        const languageEntries = Object.entries(languageObject);
        const languageItems = languageEntries.map(([language, percentage]) => ({
          language,
          // @ts-ignore
          percentage: parseFloat(percentage), // Assuming percentages are represented as decimals in the original data
        }));

        // Sort the language items based on percentage (descending order)
        languageItems.sort((a, b) => b.percentage - a.percentage);

        const topFourLanguages = languageItems.slice(0, 4);
        const languageSum = topFourLanguages.reduce(
          (accumulator, language) => accumulator + language.percentage,
          0
        );

        console.log("Sum", languageSum);
        // Render each language item
        return (
          <div className="flex items-center rounded-[1rem] overflow-hidden shadown-lg bg-[green]">
            {topFourLanguages.map((item, index) => (
              <span
                style={{ width: `${(item.percentage / languageSum) * 100}%` }}
                className={cn(
                  ` bg-[green] h-[10px]`,
                  {
                    "bg-[#3981ED]": index == 0,
                  },
                  {
                    "bg-[#1D3D6D]": index == 1,
                  },
                  {
                    "bg-[#0B182D]": index == 2,
                  },
                  {
                    "bg-[#081221]": index == 3,
                  }
                )}
              ></span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default PercentageBar;
