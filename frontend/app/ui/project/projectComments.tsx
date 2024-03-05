"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { addComment } from "@/lib/data";
import { useRouter } from "next/navigation";
import Image from "next/image";

function ProjectComments({
  projectData,
  user,
}: {
  projectData: any;
  user: any;
}) {
  const comments = projectData.comments;
  const project = projectData.project;
  const router = useRouter();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleComment = async () => {
    setLoading(true);
    const commentResponse = await addComment(
      project.repo_url,
      user.username,
      text,
      user.image
    );

    if (!commentResponse || !commentResponse.success) {
      setLoading(false);
      return;
    }
    router.refresh();
    setText("");
    setLoading(false);
  };
  return (
    <div className="flex flex-col gap-[20px] mt-[60px]">
      <h2>Comments</h2>
      <div className="grid">
        <Textarea
          placeholder="Comment on project"
          className="max-h-[400px] min-h-[150px] text-black text-[20px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="w-[100%] flex justify-end">
          <Button
            className="h-auto mt-[20px] text-lg w-[200px]"
            onClick={handleComment}
            disabled={loading}
          >
            Comment{" "}
          </Button>
        </div>
      </div>

      <div className="comment-container relative flex flex-col gap-[20px] mt-[40px] mb-[20px]">
        {comments.length > 0 ? (
          comments.map((comment: any, key: any) => (
            <div
              key={key}
              className="flex flex-col gap-[30px] p-[30px] border-solid border-[2px] border-white rounded-[10px] shadow-comments relative"
            >
              <div
                className={cn(
                  "w-[50px] h-[50px] border-border border-[1px] rounded-[50%] absolute top-[10px] right-[10px] shadow-lg",
                  {
                    "self-end bg-border": comment?.username === "KevinYuCode",
                  }
                )}
              >
                <Image
                  src={comment.avatar_url}
                  alt="Avatar"
                  className="w-full h-full rounded-full"
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex flex-col gap-2">
                {/* Display the username */}
                <span className="text-sm font-bold">{comment.username}</span>
                {/* Display the date */}
                <span className="text-xs text-gray-500">
                  {comment.created_date}
                </span>
              </div>
              <p className="">{comment.text}</p>
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
