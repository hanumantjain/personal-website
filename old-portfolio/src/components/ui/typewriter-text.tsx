"use client";

import { useEffect, useId, useMemo, useState } from "react";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export interface TypewriterTextProps {
  /** Collection of words to cycle through. */
  words?: string[];
  /** Additional class names for the wrapper element. */
  className?: string;
  /** Class names applied to the typed text. */
  textClassName?: string;
  /** Class names applied to the caret/cursor element. */
  cursorClassName?: string;
  /** Time between typing each character in milliseconds. */
  typingSpeed?: number;
  /** Time between deleting each character in milliseconds. */
  deletingSpeed?: number;
  /** Pause duration after a word is fully typed before deleting. */
  pauseBetweenWords?: number;
  /** Pause duration before typing starts */
  initialDelay?: number;
}

const DEFAULT_WORDS = ["Full-Stack Developer", "Software Engineer", "Problem Solver"];

export function TypewriterText({
  words = DEFAULT_WORDS,
  className,
  textClassName,
  cursorClassName,
  typingSpeed = 110,
  deletingSpeed = 60,
  pauseBetweenWords = 1600,
  initialDelay = 200,
}: TypewriterTextProps) {
  const id = useId();
  const safeWords = useMemo(
    () => words.filter((word) => word && word.trim().length > 0),
    [words],
  );

  const [displayText, setDisplayText] = useState<string>("");
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  useEffect(() => {
    setDisplayText("");
    setWordIndex(0);
    setIsDeleting(false);
    setHasStarted(false);
  }, [safeWords]);

  useEffect(() => {
    if (safeWords.length === 0) {
      return undefined;
    }

    if (!hasStarted) {
      const startTimer = window.setTimeout(() => setHasStarted(true), initialDelay);
      return () => window.clearTimeout(startTimer);
    }

    const currentWord = safeWords[wordIndex % safeWords.length];
    const isWordComplete = displayText === currentWord;
    const isWordEmpty = displayText.length === 0;

    let timeout = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && isWordComplete) {
      timeout = pauseBetweenWords;
      const timer = window.setTimeout(() => setIsDeleting(true), timeout);
      return () => window.clearTimeout(timer);
    }

    if (isDeleting && isWordEmpty) {
      const timer = window.setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % safeWords.length);
      }, pauseBetweenWords / 2);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setDisplayText((prev) => {
        if (isDeleting) {
          return prev.slice(0, Math.max(prev.length - 1, 0));
        }
        const nextLength = Math.min(prev.length + 1, currentWord.length);
        return currentWord.slice(0, nextLength);
      });
    }, timeout);

    return () => window.clearTimeout(timer);
  }, [
    safeWords,
    wordIndex,
    displayText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseBetweenWords,
    initialDelay,
    hasStarted,
  ]);

  if (safeWords.length === 0) {
    return null;
  }

  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className={cn("font-inherit", textClassName)} aria-live="polite" role="text">
        {displayText}
      </span>
      <motion.span
        key={`typewriter-cursor-${id}`}
        aria-hidden
        className={cn(
          "inline-block h-[1em] w-[2px] bg-current align-middle",
          cursorClassName,
        )}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.9, repeat: Infinity }}
      />
    </span>
  );
}

