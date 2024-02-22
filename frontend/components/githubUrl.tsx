"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitUrl } from "@/lib/data";
function GithubUrl() {
  const [githubUrl, setGithubUrl] = useState("");

  const handleSubmit = async () => {
    const urlRes = await submitUrl(githubUrl);
  };
  return (
    <>
      <Input
        className="border-border max-w-[700px] h-[55px] text-center"
        placeholder="Enter GitHub Repository URL"
        value={githubUrl}
        onChange={(e) => {
          setGithubUrl(e.target.value);
        }}
      />
      <Button className="px-[50px]" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

export default GithubUrl;
