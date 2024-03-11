/**
 * /auth/signin
 *
 * @author  Kevin Yu <yu.kevin2002@gmail.com>
 * @date    March 2024
 */

import React from "react";

import { getProviders } from "next-auth/react";
import SigninProviders from "./signinProviders";
import Container from "@/app/ui/container";
import Image from "next/image";

async function SignIn() {
  let providers = await getProviders();
  return (
    <Container className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between">
      <div className="flex flex-col items-center justify-center h-full max-w-fit lg:min-w-[50%] relative bottom-[50px] px-[10px]">
        <h2 className="mb-[30px] text-center lg:text-left">
          Get Started Using WithImpact
        </h2>
        <SigninProviders providers={providers} />
      </div>
      <Image
        src={"/illustrations/sign-in.png"}
        height={651}
        width={586}
        alt="sign in"
      />
    </Container>
  );
}

export default SignIn;
