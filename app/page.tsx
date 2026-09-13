"use client";

import OneLineForm from "@/components/OneLineForm";
import OneLineList from "@/components/OneLineList";
import { createLine, seedLines, useLines } from "@/lib/store";

export default function HomePage() {
  // 값(변수) — localStorage에 저장되어 새로고침해도 남아 있습니다.
  // ③회차에서 이 부분을 진짜 창고(Supabase)로 교체합니다.
  const [lines, setLines] = useLines("home", seedLines);

  function handleSubmit(nickname: string, message: string) {
    setLines((prev) => [createLine(nickname, message), ...prev]);
  }

  return (
    <>
      <section className="hero">
        <h1 className="title">오늘의 생각</h1>
        <p className="lead">
          한마디 남겨주세요. 우리 함께 공유해요
        </p>
      </section>

      <OneLineForm onSubmit={handleSubmit} />
      <OneLineList lines={lines} />

      <p className="hint">
        새로고침해 보세요. 이제 이 브라우저에서는 방금 남긴 줄이 그대로 남아 있습니다.
      </p>
    </>
  );
}
