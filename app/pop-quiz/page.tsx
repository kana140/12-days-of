"use client";
import { useState } from "react";

export default function Page() {
  const [answer, setAnswer] = useState<string | null>(null);
  return (
    <div className="text-black m-auto text-center p-5">
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
          <label htmlFor="a"> B</label>
        </li>
        <li>
          <input
            type="radio"
            value="c"
            id="c"
            name="answer"
            onClick={() => setAnswer("c")}
          />
          <label htmlFor="a"> C</label>
        </li>
        {answer ? (
          <div className="font-bold">
            {answer === "b" ? (
              <p className="text-green-400">
                CORRECT: Congratulations you win an online movie date with your
                girlfriend 🤓 (All snacks paid for)
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
