import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";

function ProjectComments({ projectData }: { projectData: any}) {
  // const comments = [] as any;
  const comments = projectData.comments
  const project = projectData.project
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
                    "self-end bg-border": comment?.username === "KevinYuCode",
                  }
                )}
              ><img src={comment.avatar_url} alt="Avatar" className="w-full h-full rounded-full" />
              </div>
              <div className="flex flex-col gap-2">
                {/* Display the username */}
                <span className="text-sm font-bold">{comment.username}</span>
                {/* Display the date */}
                <span className="text-xs text-gray-500">{comment.created_date}</span>
              </div>
              <p className="px-[30px]">
                {comment.text}
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
