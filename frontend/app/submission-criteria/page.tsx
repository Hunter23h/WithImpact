import React from "react";
import Container from "../ui/container";
import ChecklistItem from "../ui/project-check-list/checklistItem";

function SubmissionCriteria() {
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
        <h1>Approval Checklist</h1>
        <p>
          Make sure the following steps are finished before submitting your
          project:
        </p>
        <div className="flex flex-col w-[100%] gap-[30px]">
          {OBJECTIVES.map((objective) => (
            <ChecklistItem
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

export default SubmissionCriteria;
