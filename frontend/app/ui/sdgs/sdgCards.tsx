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
import React from "react";

function SDGCards() {
  const SDGs = [
    { img: "/sdgs/E-WEB-Goal-01.png" },
    { img: "/sdgs/E-WEB-Goal-02.png" },
    { img: "/sdgs/E-WEB-Goal-03.png" },
    { img: "/sdgs/E-WEB-Goal-04.png" },
    { img: "/sdgs/E-WEB-Goal-05.png" },
    { img: "/sdgs/E-WEB-Goal-06.png" },
    { img: "/sdgs/E-WEB-Goal-07.png" },
    { img: "/sdgs/E-WEB-Goal-08.png" },
    { img: "/sdgs/E-WEB-Goal-09.png" },
    { img: "/sdgs/E-WEB-Goal-10.png" },
    { img: "/sdgs/E-WEB-Goal-11.png" },
    { img: "/sdgs/E-WEB-Goal-12.png" },
    { img: "/sdgs/E-WEB-Goal-13.png" },
    { img: "/sdgs/E-WEB-Goal-14.png" },
    { img: "/sdgs/E-WEB-Goal-15.png" },
    { img: "/sdgs/E-WEB-Goal-16.png" },
    { img: "/sdgs/E-WEB-Goal-17.png" },
  ];

  return (
    <div className="flex justify-center w-[100%]">
      <div className="grid justify-center grid-cols-sm_sdgs md:grid-cols-md_sdgs 2xl:grid-cols-sdgs gap-[10px] m-auto w-[100%] max-w-[500px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1400px] 3xl:max-w-[1900px]">
        {SDGs.map((sdg, key) => (
          <Dialog key={key}>
            <DialogTrigger asChild>
              <button className="relative aspect-square transition-all hover:scale-[1.07]">
                <Image
                  src={sdg.img}
                  alt="sdg"
                  fill
                  className="rounded-[0px] object-fit aspect-square min-h-sdgs"
                />
              </button>
            </DialogTrigger>

            {/* Content */}
            <DialogContent className="w-[55vw] max-w-none h-[50vh] bg-[#09090b] flex flex-col gap-[30px] justify-between p-[60px] pb-[30px] !rounded-[20px]">
              <DialogHeader className="flex flex-row gap-[30px] items-center">
                <Image
                  src={sdg.img}
                  alt="sdg"
                  width={90}
                  height={90}
                  className="rounded-[5px] object-fit aspect-square"
                />
                <DialogTitle>
                  <h1>Poverty</h1>
                </DialogTitle>
              </DialogHeader>
              <div className="flex h-[100%]">
                <div className="">
                  <h2 className="font-bold text-[lightgrey]">Description:</h2>
                  <h2 className="text-[lightgrey]">
                    End Poverty In All Its Forms Everywhere.
                  </h2>
                </div>
                <div className=""></div>
              </div>
              <DialogFooter className="h-auto">
                <Button type="submit" variant={"secondary"}>
                  Learn More About SDG 2
                </Button>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}

export default SDGCards;
