/**
 * /aboutUs route
 *
 * @author  Kevin Yu <yu.kevin2002@gmail.com>
 * @date    March 2024
 */
import React from "react";
import Container from "../ui/container";
import MissionObjective from "../ui/aboutUs/missionObjective";
import { OBJECTIVES } from "@/lib/constants";
function AboutUs() {
  return (
    <Container>
      <div className="flex flex-col items-center">
        <h1>What is WithImpact about?</h1>
        <div className="flex flex-col w-[100%] gap-[30px]">
          {OBJECTIVES.map((objective, key) => (
            <MissionObjective
              key={key}
              title={objective.title}
              content={objective.content}
              image={objective.image}
              flowRight={objective.flowRight}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default AboutUs;



