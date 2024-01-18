import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Container from "../ui/container";
import SDGCards from "../ui/sdgs/sdgCards";

function SDGGoals() {
  return (
    <Container className="flex justify-center flex-col items-center w-[100%] gap-[30px]">
      <h1 className="text-center">Learn About SDG Goals</h1>
      <SDGCards />
    </Container>
  );
}

export default SDGGoals;
