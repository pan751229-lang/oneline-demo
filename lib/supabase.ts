// ─────────────────────────────────────────────────────────────
//  창고 열쇠고리 (브라우저용)
//
//  ③회차에서 만든 Supabase 창고에 연결합니다.
//  여기 쓰는 anon key 는 NEXT_PUBLIC_ 이 붙어 있어 브라우저에 그대로 보입니다.
//  보여도 괜찮게 설계된 값입니다 — 진짜 자물쇠는 창고 쪽 RLS 가 걸고 있습니다.
//  (④회차 「금고 비밀번호를 유리창에 붙이지 마세요」 참고)
// ─────────────────────────────────────────────────────────────

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// 진짜로 쓰일 때(로그인 버튼을 누르는 등)만 만듭니다.
// 빌드 시점(next build 의 정적 페이지 미리 그리기)에 곧바로 만들어버리면,
// 배포 서버에 환경변수가 아직 안 붙은 순간 빌드 전체가 죽어버립니다.
let client: SupabaseClient | null = null;

function ensureClient(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    // .env.local 을 안 만들었을 때 여기서 걸립니다.
    // .env.example 을 복사해서 값을 채우세요.  cp .env.example .env.local
    throw new Error(
      "창고 주소나 열쇠가 없습니다. .env.local 에 NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY 를 넣어주세요."
    );
  }

  client = createClient(url, anonKey);
  return client;
}

// 기존처럼 `supabase.auth...` 로 그대로 쓸 수 있게, 실제 호출이 닿을 때만
// ensureClient() 를 거치는 대리인(Proxy)입니다.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(ensureClient(), prop, receiver);
  },
});
