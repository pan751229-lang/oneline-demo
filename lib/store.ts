// ─────────────────────────────────────────────────────────────
//  창고 (진짜)
//
//  이제 Supabase의 lines 표에 직접 읽고 씁니다.
//  → 모든 손님이 같은 목록을 보고, 같은 곳에 남깁니다.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export type OneLine = {
  id: number;
  nickname: string;
  message: string;
  createdAt: string;
};

function mapRow(row: {
  id: number;
  created_at: string;
  nikname: string;
  message: string;
}): OneLine {
  return {
    id: row.id,
    nickname: row.nikname,
    message: row.message,
    createdAt: row.created_at,
  };
}

export function useLines() {
  const [lines, setLines] = useState<OneLine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    supabase
      .from("lines")
      .select("id, created_at, nikname, message")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (!ignore && data) setLines(data.map(mapRow));
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  async function addLine(nickname: string, message: string) {
    const { data, error } = await supabase
      .from("lines")
      .insert({
        nikname: nickname.trim() || "익명",
        message: message.trim(),
      })
      .select("id, created_at, nikname, message")
      .single();

    if (!error && data) {
      setLines((prev) => [mapRow(data), ...prev]);
    }

    return error;
  }

  return { lines, loading, addLine };
}

export function formatTime(iso: string): string {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${d.getMonth() + 1}/${d.getDate()} ${hh}:${mm}`;
}
