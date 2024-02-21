import { Button } from "@/components/ui/button";
import React from "react";

function Summary() {
  return (
    <>
      {/* Read Me */}
      <div className="flex flex-col justify-between">
        <div>
          <h2>Description</h2>
          <p>
            Industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining. Industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic
            typesetting, remaining. Industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining. Industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining.
          </p>
        </div>

        <Button className="w-[100%] py-[25px] mx-auto text-lg">
          Visit GitHub
        </Button>
      </div>
    </>
  );
}

export default Summary;
