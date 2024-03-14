import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "lucide-react";
import PercentageBar from "@/components/ui/percentageBar";
import { SDGS } from "@/lib/constants";

function Project({ project }: any) {
  return (
    <Card
      className={cn(
        " bg-[transparent] p-[30px] flex  justify-center items-center min-h-sm_sdgs md:min-h-md_sdgs 2xl:min-h-sdgs w-[100%] overflow-hidden"
      )}
    >
      <CardContent className="flex flex-col xl:flex-row justify-between gap-[30px] p-0 w-full">
        <div className="flex flex-col justify-between h-[100%]">
          <div>
            <CardTitle className="text-[black] text-left text-subheadings min-w-full break-all whitespace-nowrap text-ellipsis overflow-hidden ">
              {project?.name.toUpperCase()}
            </CardTitle>
            <div>
              {/* SDG Goal */}
              <div className="mt-[10px]">
                <Badge className="bg-primary text-white border-none shadow-md text-center">
                  SDG #{project.sdg_categories}: {SDGS[project.sdg_categories - 1]}
                </Badge>
              </div>
              {/* Github Avatar */}
              <div className="flex gap-[5px] items-center justify-start my-[10px]">
                <Avatar className="w-[30px] h-[30px] border-border border-[1px] ">
                  <AvatarImage src={project.owner_avatar} alt="I"></AvatarImage>
                </Avatar>
                <span className="">{project.owner}</span>
              </div>
              {/* Description */}
              <p className="text-body description-ellipses">
                {project.description}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-[10px] mt-[30px]">
            {project.tags
              .filter((_: any, i: any) => i < 5)
              .map((tag: any, key: any) => (
                <Badge key={key} className="text-center">{tag}</Badge>
              ))}
          </div>
        </div>

        {/* Project Details */}
        <div className="max-w-[300px] w-[100%] min-w-[200px] md:min-w-[300px]">
          <div>
            {/* Grid of details */}
            <div className="grid grid-cols-2 gap-x-[20px] grid-rows-[auto] min-w-[30%] gap-[13px]">
              {/* Watchers */}
              <div className="flex justify-start gap-[6px] items-center h-auto">
                <div className="flex justify-center min-w-[30px]">
                  <Image
                    src={"/icons/watching.png"}
                    width={24}
                    height={20}
                    alt="watching"
                  />
                </div>
                <div className="flex gap-[5px] text-labels">
                  <span>{project.watchers}</span>
                  <span>Watchers</span>
                </div>
              </div>
              {/* Stars */}
              <div className="flex justify-start gap-[6px] items-center h-auto">
                <div className="flex justify-center min-w-[30px]">
                  <Image
                    src={"/icons/stars.png"}
                    width={20}
                    height={21}
                    alt="watching"
                  />
                </div>
                <div className="flex gap-[5px] text-labels">
                  <span>{project.stars}</span>
                  <span>Stars</span>
                </div>
              </div>
              {/* Forks */}
              <div className="flex justify-start gap-[6px] items-center h-auto">
                <div className="flex justify-center min-w-[30px]">
                  <Image
                    src={"/icons/fork.png"}
                    width={17}
                    height={20}
                    alt="Fork"
                  />
                </div>
                <div className="flex gap-[5px] text-labels">
                  <span>{project.forks}</span>
                  <span>Forks</span>
                </div>
              </div>
              {/* Commits */}
              <div className="flex justify-start gap-[6px] items-center h-auto">
                <div className="flex justify-center min-w-[30px]">
                  <Image
                    src={"/icons/commit.png"}
                    width={30}
                    height={20}
                    alt="Commits"
                  />
                </div>
                <div className="flex gap-[5px] text-labels">
                  <span>{project.watchers}</span>
                  <span>Commits</span>
                </div>
              </div>
              {/* Active */}
              <div className="flex justify-start gap-[6px] items-center h-auto">
                <div className="flex justify-center min-w-[30px]">
                  <Image
                    src={"/icons/active.png"}
                    width={20}
                    height={20}
                    alt="watching"
                  />
                </div>
                <div className="flex gap-[5px] text-labels">
                  <span>{project.status}</span>
                </div>
              </div>
              {/* Newcomer Friendly */}
              <div
                className={cn(
                  "flex justify-start gap-[6px] items-center h-auto",
                  {
                    hidden: !project.newcomer_friendly,
                  }
                )}
              >
                <div className="flex justify-center min-w-[30px]">
                  <Image
                    src={"/icons/newcomer.png"}
                    width={20}
                    height={20}
                    alt="newcomer"
                  />
                </div>
                <div className="flex gap-[5px] text-labels">
                  <span>Newcomer-Friendly</span>
                </div>
              </div>
            </div>
          </div>
          <PercentageBar projectData={project} />
          <div className="grid grid-cols-2 justify-start gap-[5px] ">
            {project.languages.map((languageObject: any, key: any) => {
              // Convert each key-value pair into an object with language and percentage properties
              const languageEntries = Object.entries(languageObject);
              const languageItems = languageEntries.map(
                ([language, percentage]) => ({
                  language,
                  percentage: parseFloat(percentage), // Assuming percentages are represented as decimals in the original data
                })
              );

              // Sort the language items based on percentage (descending order)
              languageItems.sort((a, b) => b.percentage - a.percentage);

              const topFourLanguages = languageItems.slice(0, 4);

              // Render each language item
              return topFourLanguages.map((item, index) => (
                <div className="flex items-center gap-[10px]" key={index}>
                  <span
                    className={cn(
                      `w-[6px] h-[6px] rounded-[50%]`,
                      {
                        "bg-[#8ecae6]": index == 0,
                      },
                      {
                        "bg-[#219ebc]": index == 1,
                      },
                      {
                        "bg-[#023047]": index == 2,
                      },
                      {
                        "bg-[#ffb703]": index == 3,
                      }
                    )}
                  />
                  <span>{item.language}</span>
                </div>
              ));
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Project;
