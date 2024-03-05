import React, { useEffect, useRef, useState } from "react";
import ProjectCard from "./projectCard";
import Container from "../container";
import { useGlobalContext } from "@/app/context";
import BrowseSkeleton from "./browseSkeleton";
import LoadMoreProjects from "./intersectionObserver";
import { fetchFavourites, fetchProjects } from "@/lib/data";
import PageNav from "./pageNav";
import Link from "next/link";
import { Label } from "@/components/ui/label";

async function Projects({
  searchParams,
  projectsType,
  user,
}: {
  searchParams?: {
    search?: string;
    page?: string;
    sort?: string;
    sdg?: string;
    languages?: string;
    status?: string;
    newcomer_friendly?: string;
  };
  projectsType: string;
  user: any;
}) {
  const search = searchParams?.search ?? "";
  const currentPage = (searchParams?.page as string) ?? "1";
  const sort = searchParams?.sort ?? "";
  const sdg = searchParams?.sdg ?? ""; // Extract filter values from searchParams
  const language = searchParams?.languages ?? "";
  const status = searchParams?.status ?? "";
  const newcomer_friendly = searchParams?.newcomer_friendly ?? "";

  let res = [];
  if (projectsType === "browse") {
    res = await fetchProjects(
      search,
      currentPage,
      sort,
      sdg,
      language,
      status,
      newcomer_friendly
    );
  } else if (projectsType === "favourites") {
    res = await fetchFavourites(
      search,
      currentPage,
      sort,
      sdg,
      language,
      status,
      newcomer_friendly,
      user.username
    );
  }
  const PROJECTS_PER_PAGE = 20;
  const projects = res.results;
  const count = res.count;
  const pageCount = Math.ceil(count / PROJECTS_PER_PAGE);

  const pageArray = [] as String[];
  for (let i = 1; i < pageCount + 1; i++) {
    pageArray.push(String(i));
  }

  return (
    <div className="w-[100%] h-[100%]">
      <h3 className="font-[600] pb-[20px]">Results</h3>
      <div className="grid grid-cols-1 gap-[10px] w-[100%] self-start">
        {projects && projects?.length > 0 ? (
          projects.map((project: any, key: any) => (
            <Link href={`project/${project.owner}/${project.name}`}>
              <ProjectCard key={key} project={project}></ProjectCard>
            </Link>
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center min-h-[60vh]">
            <Label className="text-2xl text-black/70">
              No Projects Available...
            </Label>
          </div>
        )}
      </div>
      <PageNav pageArray={pageArray} />
    </div>
  );
}

export default Projects;
