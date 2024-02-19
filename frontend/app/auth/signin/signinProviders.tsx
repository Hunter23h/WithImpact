"use client";
import React from "react";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "next-auth";
import Container from "@/app/ui/container";
import { Button } from "@/components/ui/button";
function SigninProviders({ providers }: any) {
  return (
    <Container>
      {Object.values(providers).map((provider) => (
        <Button key={provider.name} onClick={() => signIn(provider.id)}>
          {provider?.name}
        </Button>
      ))}
    </Container>
  );
}

export default SigninProviders;
