import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import GithubUrl from "@/components/githubUrl";

function ProjectSubmission() {
  return (
    <div className="flex flex-col justify-center items-center gap-[30px] h-[100%] ">
      <h2>
        Submit Project to{" "}
        <span className="">
          <b>WITH IMPACT</b>
        </span>
      </h2>
      <GithubUrl />
      <p>
        Ensure your project meets all of the requirements before submitting.
        View the requirements{" "}
        <Link href="/submission-criteria" className="text-primary">
          here.
        </Link>
      </p>
    </div>
  );
}

export default ProjectSubmission;
