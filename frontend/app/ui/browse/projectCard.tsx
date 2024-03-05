import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "lucide-react";

function Project({ project }: any) {
  return (
    <Card
      className={cn(
        " bg-[transparent] p-[30px] flex justify-center items-center min-h-sm_sdgs md:min-h-md_sdgs 2xl:min-h-sdgs w-[100%] overflow-hidden"
      )}
    >
      <CardHeader className="w-[100%] h-[100%] ">
        <CardContent className="flex justify-between gap-[30px] p-0">
          <div className="flex flex-col justify-between h-[100%]">
            <div>
              <CardTitle className="text-[black] text-left text-subheadings min-w-full break-all whitespace-nowrap text-ellipsis overflow-hidden">
                {project?.name.toUpperCase()}
              </CardTitle>
              {/* Github Avatar */}
              <div>
                <div className="flex gap-[5px] items-center justify-start my-[10px]">
                  <Avatar className="w-[30px] h-[30px] border-border border-[1px] ">
                    <AvatarImage
                      src={project.owner_avatar}
                      alt="I"
                    ></AvatarImage>
                  </Avatar>
                  <span className="">{project.owner}</span>
                </div>
                <p className="text-body description-ellipses">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="flex gap-[10px] mt-[30px]">
              {project.tags
                .filter((_: any, i: any) => i < 5)
                .map((tag: any, key: any) => (
                  <Badge key={key}>{tag}</Badge>
                ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="min-w-[30%]">
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
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default Project;
