"use client";
import Container from "@/app/ui/container";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
function Signout() {
  const handleSignout = () => {
    signOut();
  };
  return (
    <Container className="">
      <button onClick={handleSignout}>Sign Out</button>
    </Container>
  );
}

export default Signout;
