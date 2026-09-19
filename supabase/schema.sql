-- ─────────────────────────────────────────────────────────────
--  창고 설계도 — ③회차에서 만들고, ④회차에서 자물쇠를 채운 결과
--
--  Supabase → SQL Editor 에 이 파일 내용을 통째로 붙여넣고 실행하세요.
--  표가 만들어지고 권한까지 한 번에 걸립니다.
-- ─────────────────────────────────────────────────────────────


-- ① 장부 한 권 만들기 (③회차)
--    id · created_at 은 창고가 알아서 채워줍니다.
create table if not exists public.lines (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references auth.users(id) on delete cascade,
  nickname    text        not null,
  message     text        not null,
  is_secret   boolean     not null default false,
  created_at  timestamptz not null default now()
);

-- 이미 만들어진 창고에 비밀글 칸만 추가할 때 (⑥회차)
alter table public.lines
  add column if not exists is_secret boolean not null default false;

-- 최신 글부터 빠르게 꺼내기 위한 색인
create index if not exists lines_user_created_idx
  on public.lines (user_id, created_at desc);


-- ② 자물쇠 채우기 (④회차)
--    이 줄을 실행하는 순간, 정책이 없는 한 아무것도 안 보입니다.
--    "왜 갑자기 빈 화면이 되죠?" — 정상입니다. 아래 정책을 마저 거세요.
alter table public.lines enable row level security;


-- ③ 좌석 배정 (⑤⑥회차)
--    조회는 팔찌 찬 사람 전체 공개(단, 비밀글은 쓴 사람만), 쓰기·지우기는 내 것만.
--    auth.uid() = 지금 팔찌를 찬 사람의 번호

drop policy if exists "내 줄만 조회" on public.lines;
drop policy if exists "로그인하면 전체 조회" on public.lines;
create policy "로그인하면 전체 조회"
  on public.lines for select
  using (
    auth.uid() is not null
    and ( is_secret = false or auth.uid() = user_id )
  );

drop policy if exists "내 이름으로만 작성" on public.lines;
create policy "내 이름으로만 작성"
  on public.lines for insert
  with check ( auth.uid() = user_id );

drop policy if exists "내 줄만 삭제" on public.lines;
create policy "내 줄만 삭제"
  on public.lines for delete
  using ( auth.uid() = user_id );

-- update 정책은 만들지 않습니다 — 정책이 없으면 RLS 는 기본 거부이므로
-- 내 글이든 남의 글이든 "고치기"는 아무도 못 합니다. (지우고 새로 쓰는 것만 가능)


-- ─────────────────────────────────────────────────────────────
--  확인해보기 (SQL Editor 에서 한 줄씩)
--
--    select * from lines;                     -- 읽기
--    select count(*) from lines;              -- 몇 줄인가
--
--  ⚠ update / delete 에 where 를 빼면 장부 전체가 날아갑니다.
--     ③회차에서 경고한 그 사고입니다.
-- ─────────────────────────────────────────────────────────────
