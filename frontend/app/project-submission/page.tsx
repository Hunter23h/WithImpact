/**
 * /project-submission route
 *
 * @author  Kevin Yu <yu.kevin2002@gmail.com>
 * @date    March 2024
 */

import React from "react";
import GithubUrl from "@/components/githubUrl";
import Container from "../ui/container";

function ProjectSubmission() {
  return (
    <Container className="flex flex-col justify-center items-center gap-[30px] h-[100%] ">
      <h2 className="text-center md:text-left">
        Submit Project to{" "}
        <span className="">
          <b>WITH IMPACT</b>
        </span>
      </h2>
      <GithubUrl />
    </Container>
  );
}

export default ProjectSubmission;
