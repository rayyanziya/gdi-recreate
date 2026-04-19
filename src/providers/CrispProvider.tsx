"use client";

import { useEffect } from "react";

const CRISP_WEBSITE_ID = "25262431-69de-45cf-82dd-cedfef8397df";

declare global {
  interface Window {
    $crisp: unknown[][];
    CRISP_WEBSITE_ID: string;
  }
}

export function CrispProvider() {
  useEffect(() => {
    if (typeof window === "undefined" || window.$crisp) return;

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;

    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);

    // Hide the default Crisp widget — we use our own custom UI
    window.$crisp.push(["do", "chat:hide"]);
    window.$crisp.push(["on", "chat:opened", () => {
      window.$crisp.push(["do", "chat:hide"]);
    }]);
  }, []);

  return null;
}
