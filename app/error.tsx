"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-gray-900">发生错误</h1>
      <p className="mt-4 text-lg text-gray-600">很抱歉，页面加载时出现了问题。</p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-violet-600 px-6 py-2 text-white hover:bg-violet-700 transition-colors"
      >
        重试
      </button>
    </div>
  );
}