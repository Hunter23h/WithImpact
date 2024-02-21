import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

function ProjectComments({ projectData }: { projectData: any}) {
  return (
    <div className="flex flex-col gap-[20px] mt-[60px]">
      <h2>Comments</h2>
      <div className="flex relative">
        <Input
          placeholder="Comment on project"
          className="h-[60px] text-black rounded-tr-none rounded-br-none"
        />
        <Button className="h-auto w-[120px] rounded-tl-none rounded-bl-none text-lg">
          Post
        </Button>
      </div>

      <div className="comment-container relative flex flex-col gap-[20px] mt-[40px] mb-[20px] max-h-[70vh] overflow-auto px-[20px]">
        {[
          { author: "Kevin", msg: "You don't know me son!" },
          { author: "Sam", msg: "You don't know me son!" },
          { author: "Ainsley", msg: "You don't know me son!" },
          { author: "Hunter", msg: "You don't know me son!" },
          { author: "Logan", msg: "You don't know me son!" },
        ].map((comment, key) => (
          <div
            key={key}
            className="flex flex-col gap-[30px] p-[30px] border-solid border-[2px] border-white rounded-[10px] shadow-comments"
          >
            <div
              className={cn(
                "w-[50px] h-[50px] border-border border-[1px] rounded-[50%]",
                {
                  "self-end bg-border": comment.author === "Kevin",
                }
              )}
            ></div>
            <p className="px-[30px]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Similique modi doloremque porro delectus deleniti velit architecto
              qui aut tenetur tempora optio incidunt minima blanditiis officiis,
              beatae quos iste eum quisquam.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectComments;
