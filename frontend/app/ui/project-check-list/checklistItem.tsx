import React from "react";
import Container from "../container";
import Image from "next/image";
import { cn } from "@/lib/utils";

function ChecklistItem({ title, content, image, flowRight }: any) {
  return (
    <Container
      className={cn(
        "flex flex-col lg:flex-row justify-between items-center w-[100%] gap-[50px]",
        {
          "lg:flex-row-reverse": !flowRight,
        }
      )}
    >
      <div>
        <h1 className="text-3xl md:text-5xl">{title}</h1>
        <p className="max-w-[800px] text-xl mt-[10px]">{content}</p>
      </div>
      <div>
        <Image
          src={image.src}
          height={image.height}
          width={image.width}
          alt={image.alt}
          className="rounded-[20px] shadow-xl"
        />
      </div>
    </Container>
  );
}

export default ChecklistItem;
