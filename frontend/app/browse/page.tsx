import React from "react";
import Projects from "../ui/browse/projects";
import SidebarActions from "../ui/browse/sidebarActions";
import Container from "../ui/container";

async function Browse() {
  return (
    <div className="flex  min-h-[100vh] items-stretch">
      {/* Filter and Sorting */}
      <div className="min-w-[300px] w-[100%] max-w-[15vw]">
        <SidebarActions />
      </div>
      {/* Browse Results */}
      <Projects />
    </div>
  );
}

export default Browse;
