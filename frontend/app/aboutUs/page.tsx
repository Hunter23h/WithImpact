import React from "react";
import Container from "../ui/container";
import MissionObjective from "../ui/aboutUs/missionObjective";
function AboutUs() {
  const OBJECTIVES = [
    {
      title: "Barrier to Entry",
      flowRight: true,
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic totam, vel dicta aspernatur rem recusandae illo laboriosam iste quam quisquam a inventore asperiores explicabo fugiat atque ducimus quis distinctio tempora?",
      image: {
        src: "/illustrations/barrier_to_entry.png",
        width: 500,
        height: 500,
        alt: "barrier to entry",
      },
    },
    {
      title: "Barrier to Entry",
      flowRight: false,
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic totam, vel dicta aspernatur rem recusandae illo laboriosam iste quam quisquam a inventore asperiores explicabo fugiat atque ducimus quis distinctio tempora?",
      image: {
        src: "/illustrations/barrier_to_entry.png",
        width: 500,
        height: 500,
        alt: "barrier to entry",
      },
    },
    {
      title: "Barrier to Entry",
      flowRight: true,
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic totam, vel dicta aspernatur rem recusandae illo laboriosam iste quam quisquam a inventore asperiores explicabo fugiat atque ducimus quis distinctio tempora?",
      image: {
        src: "/illustrations/barrier_to_entry.png",
        width: 500,
        height: 500,
        alt: "barrier to entry",
      },
    },
  ];

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
