"use client";
import React from "react";
import { Checkbox } from "../../../components/ui/checkbox";

function Filters() {
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

      {/* Difficulty*/}
      <div>
        <h3>Difficulty</h3>
        {["Beginner Friendly", "Hard"].map((filter, key) => (
          <div className="flex justify-start gap-[10px] items-center" key={key}>
            <Checkbox checked={true} onCheckedChange={() => {}} />
            <label>{filter}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filters;
