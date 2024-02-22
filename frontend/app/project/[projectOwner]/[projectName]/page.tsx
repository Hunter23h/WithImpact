import Container from "@/app/ui/container";
import ProjectComments from "@/app/ui/project/projectComments";
import ProjectDetails from "@/app/ui/project/projectDetails";
import ProjectSummary from "@/app/ui/project/projectSummary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchProject, fetchUser } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { getUserSession } from "@/lib/session";
import { url } from "inspector";
import StarProject from "@/app/ui/starProject/page";
import { revalidatePath } from "next/cache";
import { likeProject } from "@/lib/data";

async function Project({ params }: any) {
  const projectName = params.projectName;
  const projectOwner = params.projectOwner;
  const user = await getUserSession();

  let res = {};
  let userInfo = {};
  let isLiked;

  res = await fetchProject(projectOwner, projectName);
  if (user) {
    userInfo = await fetchUser(user?.username);

    function checkLiked(repo_url: string, project: any) {
      return project.includes(repo_url);
    }

    isLiked = checkLiked(
      res?.project.repo_url,
      userInfo?.user.favourite_projects
    );
  }

  return (
    <Container>
      <div>
        {/* Header */}
        <div>
          <div className="flex justify-between items-center">
            <h1>{projectOwner + "/" + projectName}</h1>
            {user && (
              <StarProject
                isLiked={isLiked}
                repo_url={res.project.repo_url}
                username={user.username}
              />
            )}
          </div>
          <div className="bg-[white] h-[2px] w-[100%]"></div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-[100%] bg-border" />

        {/* Content */}
        <div className="flex mt-[30px] w-[100%] h-[100%] gap-[60px] justify-center place-items-stretch">
          <ProjectSummary projectData={res.project} />
          <ProjectDetails projectData={res.project} />
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
