import React from "react";
import Container from "../container";
import Image from "next/image";
import { cn } from "@/lib/utils";

function MissionObjective({ title, content, image, flowRight }: any) {
  return (
    <Container
      className={cn("flex justify-between items-center w-[100%]", {
        "flex-row-reverse": !flowRight,
      })}
    >
      <div>
        <h1>{title}</h1>
        <p className="max-w-[800px]">{content}</p>
      </div>
      <div>
        <Image
          src={image.src}
          height={image.height}
          width={image.width}
          alt={image.alt}
          className="rounded-[20px]"
        />
      </div>
    </Container>
  );
}

export default MissionObjective;
