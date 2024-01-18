import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

function Project({}) {
  return (
    <Card
      className={cn(
        " bg-[transparent] p-[30px] flex justify-center items-center "
      )}
    >
      <CardHeader>
        <CardTitle className="text-[white]">Project</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default Project;
