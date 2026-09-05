import OneLineBoard from "@/components/OneLineBoard";

export default function Page() {
  return (
    <section className="hero">
      <h1 className="title">독자투고</h1>
      <p className="lead">여기는 독자투고입니다. 하고 싶은 이야기를 보내주세요.</p>
      <OneLineBoard
        storageKey="board-submission"
        seed={[
          {
            id: "submission-seed-1",
            nickname: "운영자",
            message: "독자투고에 오신 것을 환영합니다.",
            createdAt: "2026-09-05T13:00:00+09:00",
          },
        ]}
      />
    </section>
  );
}
