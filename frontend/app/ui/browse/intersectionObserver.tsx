import { useGlobalContext } from "@/app/context";
import React, { useEffect, useRef, useState } from "react";

function LoadMoreProjects() {
  const { projects, setProjects } = useGlobalContext();
  const [nextUrl, setNextUrl] = useState("http://127.0.0.1:8000/getprojects/");
  const observerRef = useRef(null);

  const fetchData = async () => {
    if (!nextUrl) return;
    const res = await fetch(nextUrl);
    let data = await res.json();
    setProjects([...projects, ...data.results]);
    setNextUrl(data.next);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchData();
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [nextUrl]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div ref={observerRef} className="mb-[50px]">
        Loading
      </div>
    </div>
  );
}

export default LoadMoreProjects;
