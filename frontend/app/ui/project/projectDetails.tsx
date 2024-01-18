import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import React from "react";

function ProjectDetails() {
  return (
    <>
      {/* Metadata */}
      <div className="min-w-[300px] max-w-[15vw] w-[100%] flex flex-col items-start gap-[20px] flex-1">
        {/* Content Updated */}
        <div>
          <p className="font-bold">Content Updated</p>
          <p>2023-11-12</p>
        </div>
        {/* Tags */}
        <div>
          <p className="font-bold">Tags</p>
          <div className=" flex gap-[7px]">
            {[1, 2, 3].map((tag) => (
              <Badge>tag {tag} </Badge>
            ))}
          </div>
        </div>
        {/* Status */}
        <div>
          <p className="font-bold">Status</p>
          <div className="flex items-center gap-[10px] ">
            <span className="w-[6px] h-[6px] bg-[lightgreen] rounded-[50%]" />{" "}
            <span>Active</span>
          </div>
        </div>
        {/* Latest Commit */}
        <div>
          <p className="font-bold">Latest Commit</p>
          <p>2023-11-12</p>
        </div>
        {/* Languages */}
        <div>
          <p className="font-bold">Languages</p>
          <div className="grid grid-cols-2 justify-start gap-[20px] ">
            <div className="flex h-[10px] w-[100%] col-span-2 rounded-[20px] overflow-hidden">
              {[
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
              ].map((item) => (
                <div
                  className={cn("h-[100%]", item.color, `${item.percentage}`)}
                ></div>
              ))}
            </div>
            {[
              { language: "JavaScript", percentage: "10" },
              { language: "Python", percentage: "30" },
              { language: "HTML", percentage: "40" },
              { language: "CSS", percentage: "20" },
            ].map((item) => (
              <div className="flex items-center gap-[10px]">
                <span className="w-[6px] h-[6px] bg-[lightgreen] rounded-[50%]" />
                <span>{item.language}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Contributors */}
        <div>
          <p className="font-bold">Contributors</p>
          <div className="flex gap-[10px]">
            {[1, 2, 3, 4].map(() => (
              <div className="w-[30px] h-[30px] rounded-[50%] border-border border-[1px]"></div>
            ))}
          </div>
        </div>
        {/* Open Issues */}
        <div>
          <p className="font-bold">Open Issues</p>
          <div className="flex items-center gap-[10px] ">
            <span className="w-[6px] h-[6px] bg-[lightgreen] rounded-[50%]" />{" "}
            <span>Active</span>
          </div>
        </div>
        {/* Open PRs */}
        <div>
          <p className="font-bold">Open PRs</p>
          <div className="flex items-center gap-[10px] ">
            <span className="w-[6px] h-[6px] bg-[lightgreen] rounded-[50%]" />{" "}
            <span>Active</span>
          </div>
        </div>
        {/* Project Difficulty */}
        <div>
          <p className="font-bold">Project Difficulty</p>
          <div className="flex items-center gap-[10px] ">
            <span className="w-[6px] h-[6px] bg-[lightgreen] rounded-[50%]" />{" "}
            <span>Active</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectDetails;
