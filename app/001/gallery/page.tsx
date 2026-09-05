import OneLineBoard from "@/components/OneLineBoard";

export default function Page() {
  return (
    <section className="hero">
      <h1 className="title">갤러리</h1>
      <p className="lead">여기는 갤러리입니다. 오늘 본 것을 한 줄로 남겨보세요.</p>
      <OneLineBoard
        storageKey="board-gallery"
        seed={[
          {
            id: "gallery-seed-1",
            nickname: "운영자",
            message: "갤러리에 오신 것을 환영합니다.",
            createdAt: "2026-09-05T13:00:00+09:00",
          },
        ]}
      />
    </section>
  );
}
