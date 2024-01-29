import React, { Suspense } from "react";
import Projects from "../ui/browse/projects";
import SidebarActions from "../ui/browse/sidebarActions";
import BrowseSkeleton from "../ui/browse/browseSkeleton";
import Container from "../ui/container";

async function Browse({ searchParams }: { searchParams: { page: string } }) {
  return (
    <Container className="flex min-h-[100vh] items-stretch w-[100%]">
      {/* Filter and Sorting */}
      <div className="min-w-[300px] w-[100%] max-w-[15vw]">
        <SidebarActions />
      </div>
      {/* Browse Results */}
      <Suspense fallback={<BrowseSkeleton />}>
        <Projects searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}

export default Browse;
