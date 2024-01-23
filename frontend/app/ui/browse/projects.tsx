import React, { useEffect, useRef, useState } from "react";
import Project from "./project";
import Container from "../container";
import { useGlobalContext } from "@/app/context";
import BrowseSkeleton from "./browseSkeleton";
import LoadMoreProjects from "./intersectionObserver";
import { fetchProjects } from "@/lib/data";
import PageNav from "./pageNav";

async function Projects({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  const search = searchParams?.search ?? "";
  const currentPage = (searchParams?.page as string) ?? "1";

  const res = await fetchProjects(search, currentPage);

  const projects = res.results;
  const count = res.count;
  const pageCount = Math.ceil(count / 10);

  const pageArray = [] as String[];
  for (let i = 1; i < pageCount + 1; i++) {
    pageArray.push(String(i));
  }

  return (
    <Container className="w-[100%] h-[100%]">
      <h3 className="font-[600] pb-[20px]">Results</h3>
      <div className="grid grid-cols-sm_sdgs md:grid-cols-md_sdgs 2xl:grid-cols-sdgs grid-rows-sm_sdgs md:grid-rows-md_sdgs 2xl:grid-rows-sdgs gap-[10px] w-[100%] self-start">
        {projects?.length > 0 &&
          projects.map((project: any, key: any) => (
            <Project key={key} title={project.name}></Project>
          ))}
      </div>
      {/* <PageNav pageArray={pageArray} /> */}
    </Container>
  );
}

export default Projects;
