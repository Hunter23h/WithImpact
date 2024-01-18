import React from "react";
import Project from "./project";
import Container from "../container";

function Projects() {
  const projects = [
    {
      name: "hi",
    },
    {
      name: "hi",
    },
    {
      name: "hi",
    },
    {
      name: "hi",
    },
    {
      name: "hi",
    },
    {
      name: "hi",
    },
    {
      name: "hi",
    },
  ];
  return (
    <Container className="w-[100%] h-[100%]">
      <h3 className="font-[600] pb-[20px]">Results</h3>
      <div className="grid grid-cols-sm_sdgs md:grid-cols-md_sdgs 2xl:grid-cols-sdgs grid-rows-sm_sdgs md:grid-rows-md_sdgs 2xl:grid-rows-sdgs gap-[10px] w-[100%] self-start">
        {projects.map(() => (
          <Project></Project>
        ))}
      </div>
    </Container>
  );
}

export default Projects;
