import OneLineBoard from "@/components/OneLineBoard";

export default function Page() {
  return (
    <section className="hero">
      <h1 className="title">필진의 전당</h1>
      <p className="lead">여기는 필진의 전당입니다. 남긴 한 줄이 명예의 전당에 오릅니다.</p>
      <OneLineBoard
        storageKey="board-hall-of-fame"
        seed={[
          {
            id: "hall-of-fame-seed-1",
            nickname: "운영자",
            message: "필진의 전당에 오신 것을 환영합니다.",
            createdAt: "2026-09-05T13:00:00+09:00",
          },
        ]}
      />
    </section>
  );
}
