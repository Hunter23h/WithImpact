import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

function BrowseSkeleton({ title }: any) {
  return (
    <>
      {new Array(20).fill(0).map(() => (
        <Card
          className={cn(
            " bg-[transparent] p-[30px] flex justify-center items-center min-h-sm_sdgs md:min-h-md_sdgs 2xl:min-h-sdgs w-[100%] overflow-hidden"
          )}
        >
          <CardHeader className="w-[100%] h-[100%] ">
            <Skeleton className=" h-[30px] " />
          </CardHeader>
        </Card>
      ))}
    </>
  );
}

export default BrowseSkeleton;
