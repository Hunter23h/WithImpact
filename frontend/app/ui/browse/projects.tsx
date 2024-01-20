"use client";
import React, { useEffect, useState } from "react";
import Project from "./project";
import Container from "../container";
import { useGlobalContext } from "@/app/context";
import { fetchProjectsClient } from "@/lib/clientData";
function Projects() {
  const { projects, setProjects } = useGlobalContext();
  const [nextUrl, setNextUrl] = useState("http://127.0.0.1:8000/getprojects/");
  const fetchData = async () => {
    const BACKEND_URL = "http://127.0.0.1:8000/";

    const res = await fetch(nextUrl);
    let data = await res.json();
    console.log(data);
    setProjects([...projects, ...data.results]);
    setNextUrl(data.next);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(projects);
  }, [projects]);
  return (
    <Container className="w-[100%] h-[100%]">
      <h3 className="font-[600] pb-[20px]">Results</h3>
      <div className="grid grid-cols-sm_sdgs md:grid-cols-md_sdgs 2xl:grid-cols-sdgs grid-rows-sm_sdgs md:grid-rows-md_sdgs 2xl:grid-rows-sdgs gap-[10px] w-[100%] self-start">
        {projects.length > 0 &&
          projects.map((_: any, key: any) => <Project key={key}></Project>)}
      </div>
      <button
        onClick={() => {
          fetchData();
        }}
      >
        Show More
      </button>
    </Container>
  );
}

export default Projects;
