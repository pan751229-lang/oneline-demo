"use client";

import OneLineForm from "@/components/OneLineForm";
import OneLineList from "@/components/OneLineList";
import { createLine, useLines, type OneLine } from "@/lib/store";

type Props = {
  storageKey: string;
  seed: OneLine[];
};

export default function OneLineBoard({ storageKey, seed }: Props) {
  const [lines, setLines] = useLines(storageKey, seed);

  function handleSubmit(nickname: string, message: string) {
    setLines((prev) => [createLine(nickname, message), ...prev]);
  }

  return (
    <>
      <OneLineForm onSubmit={handleSubmit} />
      <OneLineList lines={lines} />
    </>
  );
}
