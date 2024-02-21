import Container from "@/app/ui/container";
import ProjectComments from "@/app/ui/project/projectComments";
import ProjectDetails from "@/app/ui/project/projectDetails";
import ProjectSummary from "@/app/ui/project/projectSummary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchProject } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

async function Project({ params }: any) {
  console.log(params)
  const projectName = params.projectName;
  const projectOwner = params.projectOwner;
  // const project = fetchProject(projectOwner, projectName);
  // console.log(project)
  let res = {}
  res = await fetchProject(projectOwner, projectName);
  console.log(res);

  return (
    <Container>
      <div>
        {/* Header */}
        <div>
          <div className="flex justify-between items-center">
            <h1>{projectOwner + "/" + projectName}</h1>
            <Button
              variant={"outline"}
              className="flex gap-[10px]  h-[100%] tracking-tight py-[5px]"
            >
              <Image
                src="/icons/star_outline.svg"
                height={15}
                width={15}
                alt="star"
              />
              <span className="flex gap-[10px]">Starred</span>
            </Button>
          </div>
          <div className="bg-[white] h-[2px] w-[100%]"></div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-[100%] bg-border" />

        {/* Content */}
        <div className="flex mt-[30px] w-[100%] h-[100%] gap-[60px] justify-center place-items-stretch">
          <ProjectSummary projectData={res} />
          <ProjectDetails projectData={res}/>
        </div>
      </div>

      {/* Comment Section */}
      <Container>
        <ProjectComments projectData={res} />
      </Container>
    </Container>
  );
}

export default Project;
