"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { likeProject } from "@/lib/data";

function StarProject({ isLiked, username, repo_url }: any) {
  const router = useRouter();
  const [likedProject, setLikedProject] = useState(isLiked);
  const handleLike = async () => {
    const res = await likeProject(repo_url, username);
    console.log(res.likeStatus);
    setLikedProject(res.likeStatus);
  };

  return (
    <Button
      onClick={() => handleLike()}
      variant={"outline"}
      className="flex gap-[10px] h-[100%] tracking-tight py-[5px] border-[2px]"
    >
      <Image
        src={
          likedProject
            ? "/icons/star_outline_gold.svg"
            : "/icons/star_outline.svg"
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
