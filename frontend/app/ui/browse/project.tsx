import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

function Project({ title }: any) {
  return (
    <Card
      className={cn(
        " bg-[transparent] p-[30px] flex justify-center items-center min-h-sm_sdgs md:min-h-md_sdgs 2xl:min-h-sdgs w-[100%] overflow-hidden"
      )}
    >
      <CardHeader className="w-[100%] h-[100%] ">
        <CardTitle className="text-[black] text-center text-[24px] min-w-full break-all whitespace-nowrap text-ellipsis overflow-hidden">
          {title.toUpperCase()}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default Project;
