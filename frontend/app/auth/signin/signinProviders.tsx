"use client";
import React from "react";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "next-auth";
import Container from "@/app/ui/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
function SigninProviders({ providers }: any) {
  return (
    <div className="w-full flex justify-center">
      {Object.values(providers).map((provider) => (
        <Button
          className="bg-black hover:bg-black/90 hover:text-white flex gap-[10px] text-white w-full max-w-[500px] py-[25px] "
          variant={"outline"}
          key={provider?.name}
          onClick={() => signIn(provider?.id)}
        >
          <Image
            src={"/icons/github.png"}
            height={20}
            width={20}
            alt="github"
          />
          Sign in with {provider?.name}
        </Button>
      ))}
    </div>
  );
}

export default SigninProviders;
