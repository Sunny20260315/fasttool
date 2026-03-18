"use client";

import { useEffect } from "react";

interface AdPlaceholderProps {
  className?: string;
}

export function AdPlaceholder({ className = "" }: AdPlaceholderProps) {
  useEffect(() => {
    try {
      const windowWithAds = window as unknown as { adsbygoogle: unknown[] };
      (windowWithAds.adsbygoogle = windowWithAds.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`} style={{ width: "100%", height: "auto", textAlign: "center" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2051847344395083"
        data-ad-slot="1464414734"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
