"use client";
import Image from "next/image";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { useGlobalContext } from "./context";

export default function Home() {

  const fetchData = async ()=>{
    try{

      const response = await fetch("http://localhost:8000/getusers/")
      const data = await response.json()
      console.log(data)
      console.log(data[0])
      // alert(response.json())
      // console.log(response.json())
    }catch(e){
      console.log(e)
    }
  }
  return (
    <main className=" flex flex-col items-center justify-center h-[100%]">
      <div className="flex flex-col items-center gap-[40px] relative bottom-[120px]">
        <div className="max-w-[900px]">
          <h1 className="font-bold text-center">WITH IMPACT</h1>
          <h3 className="font-[300] mt-[10px] text-center ">
            Discover and contribute to Open Source Projects Related to the
            United Nations Sustainable Development Goals...
          </h3>
        </div>

        <Link href={"/browse"}>
          <Button
            role="link"
            variant={"default"}
            size="default"
            aria-expanded={false}
            className="px-[40px]"
          >
            Browse Projects
          </Button>
        </Link>
      </div>
    </main>
  );
}
