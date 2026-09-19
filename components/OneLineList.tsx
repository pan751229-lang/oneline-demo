import { formatTime, type OneLine } from "@/lib/store";

type Props = {
  lines: OneLine[];
  currentUserId?: string | null;
  onDelete?: (id: string) => void;
};

export default function OneLineList({ lines, currentUserId, onDelete }: Props) {
  if (lines.length === 0) {
    return <p className="empty">아직 남겨진 한 줄이 없습니다.</p>;
  }

  return (
    <ul className="list">
      {/* 반복 — ②회차에서 파이썬 for 문과 나란히 놓고 본 부분입니다 */}
      {lines.map((line) => (
        <li key={line.id} className="card">
          <div className="card-head">
            <span className="nick">
              {line.nickname}
              {/* 비밀글은 애초에 남에게 안 내려오니, 이 표시는 나에게만 보입니다 */}
              {line.isSecret && <span className="secret-badge">🔒 비밀글</span>}
            </span>
            <span className="time">
              {formatTime(line.createdAt)}
              {/* 남의 글은 보기만 — 지우기 버튼은 내 글에만 붙습니다 */}
              {onDelete && line.userId === currentUserId && (
                <button
                  className="del"
                  onClick={() => onDelete(line.id)}
                  aria-label="이 줄 지우기"
                >
                  지우기
                </button>
              )}
            </span>
          </div>
          <p className="msg">{line.message}</p>
        </li>
      ))}
    </ul>
  );
}
