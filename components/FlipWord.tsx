import React from "react";
import { FlipWords } from "./ui/flip-words";

export function FlipWordsDemo() {
  const words = ["Recovery", "Satisfaction", "Feedback", "Support"];

  return (
    <div className="h-[5rem] mt-6 flex justify-center items-center">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Patients
        <FlipWords words={words} /> <br />
        Stories
      </div>
    </div>
  );
}
