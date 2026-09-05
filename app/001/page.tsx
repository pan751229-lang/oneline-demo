import Link from "next/link";

const NAV_TABS = [
  { label: "자유게시판", slug: "free-board" },
  { label: "독자투고", slug: "submission" },
  { label: "필진의 전당", slug: "hall-of-fame" },
  { label: "갤러리", slug: "gallery" },
  { label: "중고장터", slug: "market" },
];
const CLUB_CATEGORIES = ["정체불명", "일상/문화", "취미/교양", "사회/경제", "엔터테인먼트"];

export default function Page001() {
  return (
    <div style={{ background: "#fff", color: "#111", margin: "-40px -24px", padding: "32px 24px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>자유게시판</h1>
        <div style={{ color: "#8a8a8a", fontSize: 13 }}>🏠 &gt; 자유게시판</div>
      </div>

      <div style={{ borderTop: "2px solid #111" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            padding: "14px 4px",
            borderBottom: "1px solid #e5e5e5",
          }}
        >
          <nav style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {NAV_TABS.map(({ label, slug }) => (
              <Link
                key={slug}
                href={`/001/${slug}`}
                style={{ fontWeight: 700, fontSize: 15, color: "#111", textDecoration: "none" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex" }}>
            <input
              type="text"
              placeholder="클럽 찾기"
              style={{
                border: "1px solid #ccc",
                borderRight: "none",
                padding: "8px 12px",
                fontSize: 14,
                width: 180,
              }}
            />
            <button
              type="button"
              style={{
                background: "#111",
                color: "#fff",
                border: "none",
                width: 40,
                cursor: "pointer",
              }}
            >
              🔍
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            padding: "14px 4px",
          }}
        >
          <div style={{ fontSize: 14, color: "#333", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700 }}>클럽 목록 바로가기 -</span>
            {CLUB_CATEGORIES.map((category, i) => (
              <span key={category} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {i > 0 && <span style={{ color: "#ccc" }}>|</span>}
                <span>{category}</span>
              </span>
            ))}
          </div>

          <button
            type="button"
            style={{
              background: "#111",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            클럽개설신청
          </button>
        </div>
      </div>
    </div>
  );
}
