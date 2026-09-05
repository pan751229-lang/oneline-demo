// ─────────────────────────────────────────────────────────────
//  창고 (임시)
//
//  지금 이 가게에는 진짜 창고(서버 데이터베이스)가 없습니다.
//  대신 브라우저의 localStorage에 적어 두어 새로고침에도 남게 합니다.
//  → 이 브라우저에서만 보이고, 다른 사람/다른 기기에는 보이지 않습니다.
//
//  ③회차(9/13)에서 이 파일을 진짜 창고(Supabase)로 교체합니다.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";

export type OneLine = {
  id: string;
  nickname: string;
  message: string;
  createdAt: string;
};

// 가게를 처음 열었을 때 놓여 있는 샘플 한 줄
export const seedLines: OneLine[] = [
  {
    id: "seed-1",
    nickname: "가게 주인",
    message: "오늘부터 이 가게는 제 겁니다.",
    createdAt: "2026-09-05T13:00:00+09:00",
  },
];

export function createLine(nickname: string, message: string): OneLine {
  return {
    id: crypto.randomUUID(),
    nickname: nickname.trim() || "익명",
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };
}

// 새로고침해도 기억하게 만드는 부분 — localStorage에 저장하고 다시 읽어옵니다.
export function useLines(storageKey: string, seed: OneLine[]) {
  const [lines, setLines] = useState<OneLine[]>(seed);

  // 처음 열렸을 때 딱 한 번, localStorage에 저장된 게 있으면 불러옵니다.
  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setLines(JSON.parse(saved));
    }
  }, [storageKey]);

  // lines가 바뀔 때마다 localStorage에 다시 적어 둡니다.
  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(lines));
  }, [storageKey, lines]);

  return [lines, setLines] as const;
}

export function formatTime(iso: string): string {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${d.getMonth() + 1}/${d.getDate()} ${hh}:${mm}`;
}
