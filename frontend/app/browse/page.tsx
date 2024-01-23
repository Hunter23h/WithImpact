import React, { Suspense } from "react";
import Projects from "../ui/browse/projects";
import SidebarActions from "../ui/browse/sidebarActions";
import Container from "../ui/container";
import BrowseSkeleton from "../ui/browse/browseSkeleton";

async function Browse({ searchParams }: { searchParams: { page: string } }) {
  return (
    <div className="flex  min-h-[100vh] items-stretch">
      {/* Filter and Sorting */}
      <div className="min-w-[300px] w-[100%] max-w-[15vw]">
        <SidebarActions />
      </div>
      {/* Browse Results */}
      <Suspense fallback={<BrowseSkeleton />}>
        <Projects searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default Browse;
