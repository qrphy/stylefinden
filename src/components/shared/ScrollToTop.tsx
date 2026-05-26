"use client";

import { useEffect, useState } from "react";
import Button from "@/components/shared/Button";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Button
      variant="primary"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 !p-0 size-10"
    >
      <svg viewBox="0 0 24 24" className="size-4 stroke-current" fill="none" strokeWidth={2.5}>
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </Button>
  );
}
