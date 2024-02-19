"use client";
import React from "react";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "next-auth";
function SigninProviders({ providers }: any) {
  return (
    <div>
      {Object.values(providers).map((provider) => (
        <button key={provider.name} onClick={() => signIn(provider.id)}>
          {provider?.name}
        </button>
      ))}
    </div>
  );
}

export default SigninProviders;
