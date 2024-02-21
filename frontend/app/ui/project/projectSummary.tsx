import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

function Summary({ projectData }: { projectData: any}) {
  return (
    <>
      {/* Read Me */}
      <div className="flex flex-col justify-between">
        <div>
          <h2>Description</h2>
          <p>
            {projectData.description}
          </p>
        </div>

        <Link href={projectData.repo_url}>
            <Button
              role="link"
              variant={"default"}
              size="default"
              aria-expanded={false}
              className="px-[40px] relative left-[10px]"
            >
              GitHub
            </Button>
          </Link>
      </div>
    </>
  );
}

export default Summary;
