import { cn } from "@/lib/utils";
import React from "react";

function Container({ children, className }: any) {
  return (
    <div
      className={cn(
        "py-[60px] px-[30px] max-w-[1900px] 3xl:max-w-[1900px] m-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Container;
