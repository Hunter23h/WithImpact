// @ts-nocheck
"use client";
/**
 * List of sign-in providers for logging in
 *
 * @author  Kevin Yu <yu.kevin2002@gmail.com>
 * @date    March 2024
 */

import React from "react";
import { signIn } from "next-auth/react";
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
