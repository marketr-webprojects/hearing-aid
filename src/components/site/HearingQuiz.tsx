"use client";

import Link from "next/link";
import { useState } from "react";

const QUESTIONS = [
  { q: "Do you often feel that people are mumbling?", img: "/assets/quiz-images/Mumbling.webp" },
  { q: "Do you have trouble following conversations in restaurants?", img: "/assets/quiz-images/Resto.webp" },
  { q: "Do family members complain the TV is too loud?", img: "/assets/quiz-images/LoudTV.webp" },
  { q: "Do you avoid social events because hearing is tiring?", img: "/assets/quiz-images/SocialIsolation.webp" },
  { q: "Have you noticed ringing or buzzing in your ears?", img: "/assets/quiz-images/RingingEars.webp" },
];

export function HearingQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const done = step >= QUESTIONS.length;
  const score = answers.filter(Boolean).length;

  function answer(yes: boolean) {
    setAnswers((a) => [...a, yes]);
    setStep((s) => s + 1);
  }

  function reset() {
    setAnswers([]);
    setStep(0);
  }

  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-card md:p-10">
          {!done ? (
            <>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary/80">
                Quick hearing self-check · {step + 1} of {QUESTIONS.length}
              </p>
              <div className="mt-4 overflow-hidden rounded-2xl empty:hidden">
                <img
                  key={QUESTIONS[step].img}
                  src={QUESTIONS[step].img}
                  alt=""
                  loading="lazy"
                  className="max-h-56 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <h2 className="mt-3 text-2xl md:text-3xl">{QUESTIONS[step].q}</h2>
              <div className="mt-8 flex gap-3">
                <button onClick={() => answer(true)} className="flex-1 rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground hover:bg-primary/90">
                  Yes
                </button>
                <button onClick={() => answer(false)} className="flex-1 rounded-full border-2 border-primary px-6 py-4 text-base font-bold text-primary hover:bg-primary-soft">
                  No
                </button>
              </div>
              <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-cta transition-all" style={{ width: `${(step / QUESTIONS.length) * 100}%` }} />
              </div>
            </>
          ) : (
            <>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary/80">Your result</p>
              <h2 className="mt-3 text-2xl md:text-3xl">
                {score >= 3 ? "It sounds like a hearing test would help" : score >= 1 ? "A check-up is a good next step" : "Great — no obvious signs today"}
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                You answered yes to <span className="font-bold text-foreground">{score}</span> of {QUESTIONS.length} questions. A 45-minute assessment will give you a clear answer.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/book" className="inline-flex items-center justify-center rounded-full bg-cta px-6 py-3 text-base font-bold text-cta-foreground shadow-soft hover:bg-cta-hover">
                  Book a Hearing Test
                </Link>
                <button onClick={reset} className="inline-flex items-center justify-center rounded-full border-2 border-border px-6 py-3 text-base font-semibold text-foreground hover:bg-muted">
                  Retake quiz
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}