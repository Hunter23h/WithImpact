import React from "react";
import Container from "../ui/container";
import ChecklistItem from "../ui/project-check-list/checklistItem";

function SubmissionCriteria() {
  const OBJECTIVES = [
    {
      title: "Make Repository Public",
      flowRight: true,
      content:
        "We cannot scrape private repos on GitHub. Therefore, if you want your project listed on WithImpact, please make your project Public by going to settings and configuring the following setting:",
      image: {
        src: "/illustrations/public.png",
        width: 500,
        height: 500,
        alt: "barrier to entry",
      },
    },
    {
      title: "Add description",
      flowRight: false,
      content:
        "Please add a description to your SDG related project or else our WithImpact will not be able to classify your project under an SDG category",
      image: {
        src: "/illustrations/description.png",
        width: 500,
        height: 500,
        alt: "Desscription",
      },
    },
  ];
  return (
    <Container>
      <div className="flex flex-col items-center">
        <h1 className="text-center md:text-left text-5xl font-semibold">Approval Checklist</h1>
        <p className="text-[grey] text-center md:text-left mt-[10px]">
          Make sure the following steps are finished before submitting your
          project:
        </p>
        <div className="flex flex-col w-[100%] gap-[30px]">
          {OBJECTIVES.map((objective, key) => (
            <ChecklistItem
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

export default SubmissionCriteria;
