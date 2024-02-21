import { Badge } from "@/components/ui/badge";
import PercentageBar from "@/components/ui/percentageBar";
import { cn } from "@/lib/utils";
import React from "react";

function ProjectDetails({ projectData }: { projectData: any}) {
  const getNewcomerFriendlyText = (isFriendly: boolean) => {
    return isFriendly ? "Newcomer Friendly" : "Not Newcomer Friendly";
  };

function parseDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based (0 for January)
  const day = date.getDate();

  // Construct the date string in the format "YYYY-MM-DD"
  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  
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
        {/* Tags */}
        <div>
          <p className="font-bold">Tags</p>
          <div className=" flex gap-[7px]">
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
            <span className="w-[6px] h-[6px] bg-[lightgreen] rounded-[50%]" />{" "}
            <span>{projectData.status}</span>
          </div>
        </div>
        {/* Latest Commit */}
        <div>
          <p className="font-bold">Latest Commit</p>
          <p>{parseDate(projectData.latest_commit_date)}</p>
        </div>
        {/* Languages */}
        <div>
          <p className="font-bold">Languages</p>
          <div className="grid grid-cols-2 justify-start gap-[20px] ">
            <div className="flex  w-[100%] col-span-2 rounded-[20px] overflow-hidden">
              {/* {[
                {
                  language: "JavaScript",
                  percentage: "w-[40%]",
                  color: "bg-[#3981ED]",
                },
                {
                  language: "Python",
                  percentage: "w-[30%]",
                  color: "bg-[#1D3D6D]",
                },
                {
                  language: "HTML",
                  percentage: "w-[20%]",
                  color: "bg-[#0B182D]",
                },
                {
                  language: "CSS",
                  percentage: "w-[10%]",
                  color: "bg-[#081221]",
                },
              ].map((item, key) => (
                <div
                  key={key}
                  className={cn("h-[100%]", item.color, `${item.percentage}`)}
                ></div>
              ))} */}
              <PercentageBar />
            </div>
            {/* {[
              { language: "Test", percentage: "10" },
              { language: "Python", percentage: "30" },
              { language: "HTML", percentage: "40" },
              { language: "CSS", percentage: "20" },
            ].map((item, key) => (
              <div className="flex items-center gap-[10px]" key={key}>
                <span className="w-[6px] h-[6px] bg-[lightgreen] rounded-[50%]" />
                <span>{item.language}{item.percentage}</span>
              </div>
            ))} */}
            {projectData.languages.map((languageObject: any, key: any) => {
              // Convert each key-value pair into an object with language and percentage properties
              const languageEntries = Object.entries(languageObject);
              const languageItems = languageEntries.map(([language, percentage]) => ({
                language,
                percentage: parseFloat(percentage), // Assuming percentages are represented as decimals in the original data
              }));

              // Sort the language items based on percentage (descending order)
              languageItems.sort((a, b) => b.percentage - a.percentage);

              // Render each language item
              return languageItems.map((item, index) => (
                <div className="flex items-center gap-[10px]" key={index}>
                  <span className="w-[6px] h-[6px] bg-[lightgreen] rounded-[50%]" />
                  <span>{item.language}: {item.percentage}</span>
                </div>
              ));
            })}

          </div>
        </div>
        {/* Contributors */}
        <div>
          <p className="font-bold">Contributors</p>
          <div className="flex gap-[10px]">
            {/* {[1, 2, 3, 4].map((_, key) => (
              <div
                className="w-[30px] h-[30px] rounded-[50%] border-border border-[1px]"
                key={key}
              ></div>
            ))} */}
            {projectData.top_contributors
                .filter((_: any, i: any) => i < 5)
                .map((tag: any, key: any) => (
                  // <img key={key} src={tag.avatar_url} alt={`Avatar ${key}`} className="w-8 h-8 rounded-full" />
                  <a key={key} href={`http://github.com/${tag.login}`} target="_blank" rel="noopener noreferrer">
                    <img src={tag.avatar_url} alt={`Avatar ${key}`} className="w-8 h-8 rounded-full" />
                  </a>
                ))}
          </div>
        </div>
        {/* Open Issues */}
        <div>
          <p className="font-bold">Open Issues</p>
          <div className="flex items-center gap-[10px] ">
            <span className="w-[6px] h-[6px] bg-[lightgreen] rounded-[50%]" />{" "}
            <span>{projectData.open_issues}</span>
          </div>
        </div>
        {/* Open PRs */}
        <div>
          <p className="font-bold">Open PRs</p>
          <div className="flex items-center gap-[10px] ">
            <span className="w-[6px] h-[6px] bg-[lightgreen] rounded-[50%]" />{" "}
            <span>{projectData.open_prs}</span>
          </div>
        </div>
        {/* Project Difficulty */}
        <div>
          <p className="font-bold">Project Difficulty</p>
          <div className="flex items-center gap-[10px] ">
            <span className="w-[6px] h-[6px] bg-[lightgreen] rounded-[50%]" />{" "}
            <span>{getNewcomerFriendlyText(projectData.newcomer_friendly)}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectDetails;
