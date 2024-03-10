import React, { Suspense } from "react";
import Projects from "../ui/browse/projects";
import SidebarActions from "../ui/browse/sidebarActions";
import BrowseSkeleton from "../ui/browse/browseSkeleton";
import Container from "../ui/container";
import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";

async function Favourites({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const user = await getUserSession();

  if (!user) redirect("/");

  return (
    <Container className="flex min-h-[100vh] items-stretch w-[100%]">
      {/* Filter and Sorting */}
      <div className="min-w-[300px] w-[100%] max-w-[15vw]">
        <SidebarActions />
      </div>
      {/* Favourites Results */}
      <Suspense fallback={<BrowseSkeleton />}>
        <Projects
          searchParams={searchParams}
          projectsType="favourites"
          user={user}
        />
      </Suspense>
    </Container>
  );
}

export default Favourites;
