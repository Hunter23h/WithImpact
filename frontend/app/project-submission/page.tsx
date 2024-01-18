import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

function ProjectSubmission() {
  return (
    <div className="flex flex-col justify-center items-center gap-[30px] h-[100%] ">
      <h2>
        Submit Project to{" "}
        <span className="">
          <b>WITH IMPACT</b>
        </span>
      </h2>
      <Input
        className="border-border max-w-[700px] h-[55px] text-center"
        placeholder="Enter GitHub Repository URL"
      />
      <Button className="px-[50px]">Submit</Button>
      <p>
        Ensure your project meets all of the requirements before submitting.
        View the requirements{" "}
        <Link href="/project-check-list" className="text-[skyblue]">
          here.
        </Link>
      </p>
    </div>
  );
}

export default ProjectSubmission;
