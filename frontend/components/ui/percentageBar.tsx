import React from "react";

function PercentageBar({ languages }: any) {
  const breakdown = {
    CSS: 0,
    HTML: 2,
    SCSS: 0,
    Shell: 0.2,
    Python: 97.5,
    Makefile: 0.1,
    Procfile: 0,
    Dockerfile: 0.1,
    JavaScript: 0,
  };

  const keys = Object.keys(breakdown);
  const values = Object.values(breakdown);

  return <div></div>;
}

export default PercentageBar;
