/**
 * /browse route
 *
 * @author  Kevin Yu <yu.kevin2002@gmail.com>
 * @date    March 2024
 */

import React, { Suspense } from "react";
import Projects from "../ui/browse/projects";
import SidebarActions from "../ui/browse/sidebarActions";
import BrowseSkeleton from "../ui/browse/browseSkeleton";
import Container from "../ui/container";

async function Browse({ searchParams }: { searchParams: { page: string } }) {
  return (
    <Container className="flex min-h-[100vh] items-stretch w-[100%] relative">
      {/* Filter and Sorting */}
      <SidebarActions />
      {/* Browse Results */}
      <Suspense fallback={<BrowseSkeleton />}>
        <Projects searchParams={searchParams} projectsType="browse" />
      </Suspense>
    </Container>
  );
}

export default Browse;
