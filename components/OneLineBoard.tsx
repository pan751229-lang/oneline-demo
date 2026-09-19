"use client";

import OneLineForm from "@/components/OneLineForm";
import OneLineList from "@/components/OneLineList";
import { useLines } from "@/lib/store";

export default function OneLineBoard() {
  const { lines, addLine } = useLines();

  function handleSubmit(nickname: string, message: string) {
    addLine(nickname, message);
  }

  return (
    <>
      <OneLineForm onSubmit={handleSubmit} />
      <OneLineList lines={lines} />
    </>
  );
}
