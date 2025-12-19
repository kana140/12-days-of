"use client";
import { useState } from "react";

export default function Page() {
  const [answer, setAnswer] = useState<string | null>(null);
  return (
    <div className="text-black m-auto text-center p-5 dark:text-foreground">
      <h1> POP QUIZ</h1>
      <ul>
        <li>
          <input
            type="radio"
            value="a"
            id="a"
            name="answer"
            onClick={() => setAnswer("a")}
          />
          <label htmlFor="a"> A</label>
        </li>

        <li>
          <input
            type="radio"
            value="b"
            id="b"
            name="answer"
            onClick={() => setAnswer("b")}
          />
          <label htmlFor="b"> B</label>
        </li>
        <li>
          <input
            type="radio"
            value="c"
            id="c"
            name="answer"
            onClick={() => setAnswer("c")}
          />
          <label htmlFor="c"> C</label>
        </li>
        <li>
          <input
            type="radio"
            value="c"
            id="c"
            name="answer"
            onClick={() => setAnswer("D")}
          />
          <label htmlFor="d"> D</label>
        </li>
        {answer ? (
          <div className="font-bold">
            {answer === "a" ? (
              <p className="text-green-400">
                CORRECT: Congratulations you win 8 x BJ passes (only eligible in
                right moods and settings.)
              </p>
            ) : (
              <p className="text-red-600">WRONG VERY WRONG: try again </p>
            )}
          </div>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
