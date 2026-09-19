"use client";

import { useState } from "react";

type Props = {
  onSubmit: (nickname: string, message: string, isSecret: boolean) => void;
};

export default function OneLineForm({ onSubmit }: Props) {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [isSecret, setIsSecret] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // 판단(조건) — ②회차에서 다시 보게 될 뼈대입니다
    if (message.trim().length === 0) return;

    onSubmit(nickname, message, isSecret);
    setMessage("");
    setIsSecret(false);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="input nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="닉네임"
        maxLength={12}
      />
      <input
        className="input message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="오늘의 한 줄을 남겨주세요"
        maxLength={80}
      />
      <label className="secret-check">
        <input
          type="checkbox"
          checked={isSecret}
          onChange={(e) => setIsSecret(e.target.checked)}
        />
        비밀글
      </label>
      <button className="button" type="submit">
        남기기
      </button>
    </form>
  );
}
