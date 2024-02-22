import React from "react";

import { getProviders, signIn } from "next-auth/react";
import SigninProviders from "./signinProviders";

async function SignIn() {
  console.log("PLEASEEEE", process.env.GITHUB_CLIENT_ID);
  console.log("SECRET", process.env.GITHUB_SECRET);

  let providers = await getProviders();
  return <SigninProviders providers={providers} />;
}

export default SignIn;
