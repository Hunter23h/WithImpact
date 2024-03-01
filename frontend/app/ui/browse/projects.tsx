import React, { useEffect, useRef, useState } from "react";
import ProjectCard from "./projectCard";
import Container from "../container";
import { useGlobalContext } from "@/app/context";
import BrowseSkeleton from "./browseSkeleton";
import LoadMoreProjects from "./intersectionObserver";
import { fetchFavourites, fetchProjects } from "@/lib/data";
import PageNav from "./pageNav";
import Link from "next/link";

async function Projects({
  searchParams,
  projectsType,
  user,
}: {
  searchParams?: {
    search?: string;
    page?: string;
    sort?: string
  };
  projectsType: string;
  user: any;
}) {
  const search = searchParams?.search ?? "";
  const currentPage = (searchParams?.page as string) ?? "1";
  const sort = searchParams?.sort ?? "";

  let res = [];
  if (projectsType === "browse") {
    res = await fetchProjects(search, currentPage, sort);
  } else if (projectsType === "favourites") {
    res = await fetchFavourites(search, currentPage, sort, user.username);
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
        {projects?.length > 0 &&
          projects.map((project: any, key: any) => (
            <Link href={`project/${project.owner}/${project.name}`}>
              <ProjectCard key={key} project={project}></ProjectCard>
            </Link>
          ))}
      </div>
      <PageNav pageArray={pageArray} />
    </div>
  );
}

export default Projects;
