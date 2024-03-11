/**
 * / route
 *
 *
 * @author  Kevin Yu <yu.kevin2002@gmail.com>
 * @date    March 2024
 */
import Image from "next/image";
import { Button } from "../components/ui/button";
import Link from "next/link";
import Container from "./ui/container";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-[100%]">
      <Container className="flex flex-col xl:flex-row justify-start xl:justify-between items-center xl:items-start gap-[60px] w-[100%] h-full relative">
        <div className="flex flex-col items-center xl:items-start justify-center gap-[40px] h-[100%] ">
          <div className="min-w-[300px]">
            <h1 className="font-bold text-center xl:text-left text-[40px] md:text-[55px] xl:text-[76px] text-primary2 ">
              WITH IMPACT
            </h1>
            <p className="font-[400] relative md:left-[10px] max-w-[700px] text-[#5F6C7B] text-center xl:text-left text-[15px] md:text-subheadings leading-snug">
              Discover and contribute to Open-Source Software Related to the
              United Nations Sustainable Development Goals.
            </p>
          </div>

          <Link href={"/browse"}>
            <Button
              role="link"
              variant={"default"}
              size="default"
              aria-expanded={false}
              className="px-[40px] relative md:left-[10px]"
            >
              Browse Projects
            </Button>
          </Link>
        </div>
        <div className="h-[100%] flex items-center relative">
          <Image
            src={"/logos/logo.png"}
            alt="illustration"
            width={579}
            height={487}
            className=""
          />
        </div>
      </Container>
    </main>
  );
}
