/**
 * /submission-criteria route
 *
 * @author  Kevin Yu <yu.kevin2002@gmail.com>
 * @date    March 2024
 */

import React from "react";
import Container from "../ui/container";
import ChecklistItem from "../ui/project-check-list/checklistItem";
import { SUBMISSION_CRITERIA } from "@/lib/constants";

function SubmissionCriteria() {
  return (
    <Container>
      <div className="flex flex-col items-center">
        <h1 className="text-center md:text-left text-5xl font-semibold">
          Approval Checklist
        </h1>
        <p className="text-[grey] text-center md:text-left mt-[10px]">
          Make sure the following steps are finished before submitting your
          project:
        </p>
        <div className="flex flex-col w-[100%] gap-[30px]">
          {SUBMISSION_CRITERIA.map((objective, key) => (
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
