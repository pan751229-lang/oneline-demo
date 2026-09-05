import OneLineBoard from "@/components/OneLineBoard";

export default function Page() {
  return (
    <section className="hero">
      <h1 className="title">자유게시판</h1>
      <p className="lead">여기는 자유게시판입니다. 한 줄을 자유롭게 남겨보세요.</p>
      <OneLineBoard
        storageKey="board-free-board"
        seed={[
          {
            id: "free-board-seed-1",
            nickname: "운영자",
            message: "자유게시판에 오신 것을 환영합니다.",
            createdAt: "2026-09-05T13:00:00+09:00",
          },
        ]}
      />
    </section>
  );
}
