import { Badge } from "@/components/ui/badge";
import PercentageBar from "@/components/ui/percentageBar";
import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SDGS } from "@/lib/constants";
function ProjectDetails({ projectData }: { projectData: any }) {
  const getNewcomerFriendlyText = (isFriendly: boolean) => {
    return isFriendly ? "Newcomer Friendly" : "Not Newcomer Friendly";
  };

  function parseDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based (0 for January)
    const day = date.getDate();

    // Construct the date string in the format "YYYY-MM-DD"
    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    return formattedDate;
  }

  return (
    <>
      {/* Metadata */}
      <div className="min-w-[300px] max-w-[15vw] w-[100%] flex flex-col items-start gap-[20px] flex-1">
        {/* Content Updated */}
        <div>
          <p className="font-bold">Content Updated</p>
          <p>{parseDate(projectData.last_push_date)} </p>
        </div>
        <div>
           <p className="font-bold">SDG</p>
                <div className="flex gap-[5px] text-labels">
                  <Badge>{SDGS[projectData.sdg_categories]}</Badge>
                  {/* <span>SDG</span> */}
                </div>
              </div>
        {/* Tags */}
        <div>
          <p className="font-bold">Tags</p>
          <div className=" flex flex-wrap gap-[7px]">
            {projectData.tags
              .filter((_: any, i: any) => i < 3)
              .map((tag: any, key: any) => (
                <Badge key={key}>{tag}</Badge>
              ))}
          </div>
        </div>
        {/* Status */}
        <div>
          <p className="font-bold">Status</p>
          <div className="flex items-center gap-[10px] ">
            <span className="w-[10px] h-[10px] bg-[lightgreen] rounded-[50%]" />{" "}
            <span>{projectData.status}</span>
          </div>
        </div>
        {/* Latest Commit */}
        <div>
          <p className="font-bold">Latest Commit</p>
          <p>{parseDate(projectData.latest_commit_date)}</p>
        </div>
        {/* Stars */}
        <div>
          <p className="font-bold">Stars</p>
          <div className="flex items-center gap-[10px] ">
            <Image
              src={"/icons/star_black.png"}
              alt={`fork`}
              width={20}
              height={20}
            />
            <p>{projectData.stars}</p>
          </div>
        </div>
        {/* Watchers */}
        <div>
          <p className="font-bold">Watchers</p>
          <div className="flex items-center gap-[10px] ">
            <Image
              src={"/icons/watch.png"}
              alt={`fork`}
              width={20}
              height={20}
            />
            <p>{projectData.watchers}</p>
          </div>
        </div>
        {/* Forks */}
        <div>
          <p className="font-bold">Forks</p>
          <div className="flex items-center gap-[10px] ">
            <Image
              src={"/icons/fork.png"}
              alt={`fork`}
              width={20}
              height={20}
            />
            <p>{projectData.forks}</p>
          </div>
        </div>
        {/* Languages */}
        <div>
          <p className="font-bold">Languages</p>
          <PercentageBar projectData={projectData} />
          <div className="grid grid-cols-2 justify-start gap-[20px] ">
            {projectData.languages.map((languageObject: any, key: any) => {
              // Convert each key-value pair into an object with language and percentage properties
              const languageEntries = Object.entries(languageObject);
              const languageItems = languageEntries.map(
                ([language, percentage]) => ({
                  language,
                  // @ts-ignore
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
                  />
                  <span>
                    {item.language}: {item.percentage}%
                  </span>
                </div>
              ));
            })}
          </div>
        </div>
        {/* Contributors */}
        <div>
          <p className="font-bold">Contributors</p>
          <div className="flex gap-[10px]">
            {projectData.top_contributors
              .filter((_: any, i: any) => i < 5)
              .map((tag: any, key: any) => (
                // <img key={key} src={tag.avatar_url} alt={`Avatar ${key}`} className="w-8 h-8 rounded-full" />
                <Link
                  key={key}
                  href={`http://github.com/${tag.login}`}
                  target="_blank"
                >
                  <Image
                    src={tag.avatar_url}
                    alt={`Avatar ${key}`}
                    width={30}
                    height={30}
                    className="rounded-[50%]"
                  />
                </Link>
              ))}
          </div>
        </div>
        {/* Open Issues */}
        <div>
          <p className="font-bold">Open Issues</p>
          <div className="flex items-center gap-[10px] ">
            <Image
              src={"/icons/pull-request.png"}
              height={20}
              width={20}
              alt="difficulty"
            />
            <span>{projectData.open_issues}</span>
          </div>
        </div>
        {/* Open PRs */}
        <div>
          <p className="font-bold">Open PRs</p>
          <div className="flex items-center gap-[10px] ">
            <Image
              src={"/icons/pull-request.png"}
              height={20}
              width={20}
              alt="difficulty"
            />
            <span>{projectData.open_prs}</span>
          </div>
        </div>
        {/* Project Difficulty */}
        <div>
          <p className="font-bold">Project Difficulty</p>
          <div className="flex items-center gap-[10px] ">
            <Image
              src={"/icons/newcomer.png"}
              height={20}
              width={20}
              alt="difficulty"
            />
            <span>
              {getNewcomerFriendlyText(projectData.newcomer_friendly)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectDetails;
