"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "../../../components/ui/checkbox";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";

function Filters() {
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  // const [isNewcomerFriendly, setIsNewcomerFriendly] = useState<boolean>(false);

  // const handleIsNewcomerFriendly = () => {
  //   const params = new URLSearchParams(searchParams);
  //   searchParams.get("page");

  //   replace(`${pathname}?${params.toString()}`);
  // };

  // useEffect(() => {
  //   setIsNewcomerFriendly(searchParams.get("newcomer_friendly") == "true");
  // }, []);
  return (
    <div className="flex flex-col gap-[30px]">
      {/* SDG Goals */}
      <div>
        <h3>SDG Goals</h3>
        {["Poverty", "Hunger"].map((filter, key) => (
          <div className="flex justify-start gap-[10px] items-center" key={key}>
            <Checkbox checked={true} onCheckedChange={() => {}} />
            <label>{filter}</label>
          </div>
        ))}
      </div>

      {/* Newcomer Friendly*/}
      <div>
        {/* <h3>Newcomer Friendly</h3> */}
        {/* {["Beginner Friendly", "Hard"].map((filter, key) => (
          <div className="flex justify-start gap-[10px] items-center" key={key}>
            <Checkbox
              checked={isNewcomerFriendly}
              onCheckedChange={() => {
                // handleIsNewcomerFriendly();
              }}
            />
            <label>{filter}</label>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default Filters;
