import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

function Summary({ projectData }: { projectData: any }) {
  return (
    <>
      {/* Read Me */}
      <div className="flex flex-col justify-between h-fit min-h-[75vh] w-full">
        <div className="mb-[40px]">
          <h2 className="text-3xl md:text-4xl">Description</h2>
          <p>{projectData.description}</p>
        </div>

        <Button
          role="link"
          variant={"default"}
          size="default"
          aria-expanded={false}
          className="px-[40px]"
          asChild
        >
          <Link href={projectData.repo_url} target="no_referrer">
            GitHub
          </Link>
        </Button>
      </div>
    </>
  );
}

export default Summary;
