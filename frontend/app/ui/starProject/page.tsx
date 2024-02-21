"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";

function StarProject({ isLiked, username, repo_url, handleLike }: any) {
  return (
    <Button
      onClick={() => handleLike()}
      variant={"outline"}
      className="flex gap-[10px] h-[100%] tracking-tight py-[5px] border-[2px]"
    >
      <Image
        src={
          isLiked ? "/icons/star_outline_gold.svg" : "/icons/star_outline.svg"
        }
        height={15}
        width={15}
        alt="star"
      />
      <span className="flex gap-[10px]">Starred</span>
    </Button>
  );
}

export default StarProject;
