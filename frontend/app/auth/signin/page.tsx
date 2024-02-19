import React from "react";

import { getProviders, signIn } from "next-auth/react";
import SigninProviders from "./signinProviders";

async function SignIn() {
  let providers = await getProviders();
  return <SigninProviders providers={providers} />;
}

export default SignIn;
