import OneLineBoard from "@/components/OneLineBoard";

export default function Page() {
  return (
    <section className="hero">
      <h1 className="title">중고장터</h1>
      <p className="lead">여기는 중고장터입니다. 나누고 싶은 물건을 한 줄로 남겨보세요.</p>
      <OneLineBoard
        storageKey="board-market"
        seed={[
          {
            id: "market-seed-1",
            nickname: "운영자",
            message: "중고장터에 오신 것을 환영합니다.",
            createdAt: "2026-09-05T13:00:00+09:00",
          },
        ]}
      />
    </section>
  );
}
