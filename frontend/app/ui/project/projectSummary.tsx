import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

function Summary({ projectData }: { projectData: any }) {
  return (
    <>
      {/* Read Me */}
      <div className="flex flex-col justify-between w-full">
        <div>
          <h2>Description</h2>
          <p>{projectData.description}</p>
        </div>

        <Button
          role="link"
          variant={"default"}
          size="default"
          aria-expanded={false}
          className="px-[40px] relative left-[10px]"
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
