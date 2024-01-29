import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

function BrowseSkeleton({ title }: any) {
  return (
    <>
      <div className={cn(" grid grid-cols-1 gap-[10px] w-[100%]")}>
        {new Array(20).fill(0).map(() => (
          <Card className={cn(" bg-[transparent] w-[100%] h-[100%]")}>
            <CardContent className="flex justify-between py-[2rem] gap-[15px] h-[100%] w-[100%]">
              <div className="flex flex-col gap-[15px] h-[100%] w-[100%]">
                <Skeleton className=" w-[70%] h-[30px]" />
                <Skeleton className=" w-[50%] h-[20px]" />
                <Skeleton className=" w-[100%] h-[60px]" />
              </div>
              <div className="flex justify-start items-end flex-col gap-[25px] h-[100%] w-[100%]">
                <div className="grid grid-cols-2 gap-[10px] w-[70%]">
                  <Skeleton className="w-[100%] h-[14px] " />
                  <Skeleton className="w-[100%] h-[14px] " />
                  <Skeleton className="w-[100%] h-[14px] " />
                  <Skeleton className="w-[100%] h-[14px] " />
                  <Skeleton className="w-[100%] h-[14px] " />
                  <Skeleton className="w-[100%] h-[14px] " />
                </div>
                <div className="w-[70%]">
                  <Skeleton className="w-[100%] h-[20px] " />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default BrowseSkeleton;
