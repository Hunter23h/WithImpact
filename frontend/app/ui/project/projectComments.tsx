import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";

function ProjectComments() {
  const comments = [] as any;
  return (
    <div className="flex flex-col gap-[20px] mt-[60px]">
      <h2>Comments</h2>
      <div className="grid s">
        <Textarea
          placeholder="Comment on project"
          className="max-h-[400px] min-h-[150px] text-black text-[20px]"
        />
        <div className="w-[100%] flex justify-end">
          <Button className="h-auto mt-[10px] text-lg w-[200px] ">
            Comment{" "}
          </Button>
        </div>
      </div>

      <div className="comment-container relative flex flex-col gap-[20px] mt-[40px] mb-[20px]">
        {comments.length > 0 ? (
          comments.map((comment: any, key: any) => (
            <div
              key={key}
              className="flex flex-col gap-[30px] p-[30px] border-solid border-[2px] border-white rounded-[10px] shadow-comments"
            >
              <div
                className={cn(
                  "w-[50px] h-[50px] border-border border-[1px] rounded-[50%]",
                  {
                    "self-end bg-border": comment?.author === "Kevin",
                  }
                )}
              ></div>
              <p className="px-[30px]">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Similique modi doloremque porro delectus deleniti velit
                architecto qui aut tenetur tempora optio incidunt minima
                blanditiis officiis, beatae quos iste eum quisquam.
              </p>
            </div>
          ))
        ) : (
          <p className="text-center">No comments for this project...</p>
        )}
      </div>
    </div>
  );
}

export default ProjectComments;
