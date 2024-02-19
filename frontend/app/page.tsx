import Image from "next/image";
import { Button } from "../components/ui/button";
import Link from "next/link";
import Container from "./ui/container";
import { useEffect, useState } from "react";
import { getUserSession } from "@/lib/session";

export default async function Home() {
  const user = await getUserSession();

  return (
    <main className="flex flex-col items-center justify-center h-[100%]">
      <Container className="flex justify-between gap-[60px] w-[100%] relative max-w-[1200px] ">
        <div className="flex flex-col items-start justify-start gap-[40px] h-[100%] ">
          <div>
            <h1 className="font-bold text-left text-title text-primary2">
              WITH IMPACT
            </h1>
            <p className="font-[400] text-subheadings relative left-[10px] max-w-[700px] text-[#5F6C7B]">
              Discover and contribute to Open Source Projects Related to the
              United Nations Sustainable Development Goals...
            </p>
            <div>{JSON.stringify(user || "no user")}</div>
          </div>

          <Link href={"/browse"}>
            <Button
              role="link"
              variant={"default"}
              size="default"
              aria-expanded={false}
              className="px-[40px] relative left-[10px]"
            >
              Browse Projects
            </Button>
          </Link>
        </div>
        <div className="h-[100%] w-[400px] flex items-center relative">
          <Image
            src={"/logos/logo.png"}
            alt="illustration"
            fill
            className="object-contain "
          />
        </div>
      </Container>
    </main>
  );
}
