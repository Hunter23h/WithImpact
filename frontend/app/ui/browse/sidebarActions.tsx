import React from "react";
import Sort from "./sort";
import { Checkbox } from "../../../components/ui/checkbox";
import Filters from "./filters";
import Container from "../container";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function SidebarActions() {
  return (
    <>
      <Container className="border-b-solid border-b-[2px] border-b-[white] flex flex-col gap-[30px] ">
        <Sort />
        <Filters />
      </Container>
    </>
  );
}

export default SidebarActions;
