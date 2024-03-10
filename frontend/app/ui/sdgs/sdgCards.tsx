import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function SDGCards() {
  const SDGs = [
    {
      img: "/sdgs/E-WEB-Goal-01.png",
      description: "End poverty in all its forms everywhere",
    },
    {
      img: "/sdgs/E-WEB-Goal-02.png",
      description:
        "End hunger, achieve food security and improved nutrition and promote sustainable agriculture ",
    },
    {
      img: "/sdgs/E-WEB-Goal-03.png",
      description:
        "End hunger, achieve food security and improved nutrition and promote sustainable agriculture ",
    },
    {
      img: "/sdgs/E-WEB-Goal-04.png",
      description:
        "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all ",
    },
    {
      img: "/sdgs/E-WEB-Goal-05.png",
      description: "Achieve gender equality and empower all women and girls ",
    },
    {
      img: "/sdgs/E-WEB-Goal-06.png",
      description:
        "Ensure availability and sustainable management of water and sanitation for all",
    },
    {
      img: "/sdgs/E-WEB-Goal-07.png",
      description:
        "Ensure access to affordable, reliable, sustainable and modern energy for all",
    },
    {
      img: "/sdgs/E-WEB-Goal-08.png",
      description:
        "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all",
    },
    {
      img: "/sdgs/E-WEB-Goal-09.png",
      description:
        "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation",
    },
    {
      img: "/sdgs/E-WEB-Goal-10.png",
      description: "Reduce inequality within and among countries",
    },
    {
      img: "/sdgs/E-WEB-Goal-11.png",
      description:
        "Make cities and human settlements inclusive, safe, resilient and sustainable",
    },
    {
      img: "/sdgs/E-WEB-Goal-12.png",
      description: "Ensure sustainable consumption and production patterns",
    },
    {
      img: "/sdgs/E-WEB-Goal-13.png",
      description:
        "Take urgent action to combat climate change and its impacts",
    },
    {
      img: "/sdgs/E-WEB-Goal-14.png",
      description:
        "Conserve and sustainably use the oceans, seas and marine resources for sustainable development",
    },
    {
      img: "/sdgs/E-WEB-Goal-15.png",
      description:
        "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss",
    },
    {
      img: "/sdgs/E-WEB-Goal-16.png",
      description:
        "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels",
    },
    {
      img: "/sdgs/E-WEB-Goal-17.png",
      description:
        "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development",
    },
  ];

  return (
    <div className="flex justify-center w-[100%]">
      <div className="grid justify-center grid-cols-2 md:grid-cols-md_sdgs 2xl:grid-cols-sdgs gap-[10px] m-auto w-[100%] max-w-[500px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1400px] 3xl:max-w-[1900px]">
        {SDGs.map((sdg, key) => (
          <Dialog key={key}>
            <DialogTrigger asChild>
              <button className="relative aspect-square transition-all md:hover:scale-[1.07]">
                <Image
                  src={sdg.img}
                  alt="sdg"
                  fill
                  className="rounded-[0px] object-fit aspect-square md:min-h-sdgs"
                />
              </button>
            </DialogTrigger>

            {/* Content */}
            <DialogContent className="w-[95%] md:w-[55vw] max-w-none md:h-[50vh]  flex flex-col gap-[30px] justify-between lg:p-[60px] pb-[30px] rounded-[0.5rem]">
              <div className="flex flex-col gap-[10px]">
                <DialogHeader className="flex flex-col md:flex-row gap-[30px] items-start md:items-center">
                  <Image
                    src={sdg.img}
                    alt="sdg"
                    width={90}
                    height={90}
                    className="rounded-[5px] object-fit aspect-square"
                  />
                  <DialogTitle>
                    <h1 className="text-3xl md:text-5xl">Poverty</h1>
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col h-[100%]">
                  <h2 className="font-normal text-2xl md:text-4xl">Description:</h2>
                  <h2 className="text-lg md:text-xl font-light">{sdg.description}</h2>
                </div>
              </div>
              <DialogFooter className="h-auto">
                <Button asChild variant={"outline"}>
                  <Link
                    type="submit"
                    target="_blank"
                    href={"https://sdgs.un.org/goals"}
                  >
                    Learn More About SDG {key + 1}
                  </Link>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}

export default SDGCards;
