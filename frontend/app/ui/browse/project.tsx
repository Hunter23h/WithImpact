import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

function Project() {
  return (
    <Card
      className={cn(
        " bg-[transparent] p-[30px] flex justify-center items-center min-h-sm_sdgs md:min-h-md_sdgs 2xl:min-h-sdgs"
      )}
    >
      <CardHeader>
        <CardTitle className="text-[black]">Project</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default Project;
