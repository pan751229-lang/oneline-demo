"use client";

import OneLineForm from "@/components/OneLineForm";
import OneLineList from "@/components/OneLineList";
import { useLines } from "@/lib/store";

export default function HomePage() {
  // 값(변수) — 이제 Supabase에 저장되어 모든 손님이 같은 목록을 봅니다.
  const { lines, loading, addLine } = useLines();

  function handleSubmit(nickname: string, message: string) {
    addLine(nickname, message);
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
      {loading ? (
        <p className="empty">불러오는 중...</p>
      ) : (
        <OneLineList lines={lines} />
      )}

      <p className="hint">
        이제 이 목록은 모든 손님에게 똑같이 보입니다.
      </p>
    </>
  );
}
