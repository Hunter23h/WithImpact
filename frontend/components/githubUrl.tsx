"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitUrl } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
function GithubUrl() {
  const [githubUrl, setGithubUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const urlRes = await submitUrl(githubUrl);
    if (!(urlRes.success === "Project created successfully"))
      alert("Error Submitting Project");
    setLoading(false);
    setGithubUrl("");
  };
  const urlRef = useRef(null);
  useEffect(() => {
    // @ts-ignore
    if (urlRef) urlRef?.current?.focus();
  }, []);
  return (
    <>
      <Input
        className="border-border max-w-[700px] h-[55px] text-center"
        placeholder="Enter GitHub Repository URL"
        value={githubUrl}
        onChange={(e) => {
          setGithubUrl(e.target.value);
        }}
        ref={urlRef}
      />
      <p className="text-center md:text-left">
        Ensure your project meets all of the requirements before submitting.
        View the requirements{" "}
        <Link href="/submission-criteria" className="text-primary">
          here.
        </Link>
      </p>
      <Button
        variant="default"
        className="px-[50px]"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          "Submit"
        )}
      </Button>
    </>
  );
}

export default GithubUrl;
