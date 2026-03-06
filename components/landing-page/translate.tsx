"use client";

import { useEffect } from "react";

export default function Translate() {
  useEffect(() => {
    const existingGTranslate = document.querySelector(
      'script[src="https://cdn.gtranslate.net/widgets/latest/float.js"]'
    );

    if (!existingGTranslate) {
      (window as any).gtranslateSettings = {
        default_language: "en",
        native_language_names: true,
        detect_browser_language: true,
        languages: [
          "en",
          "fr",
          "es",
          "de",
          "zh-CN",
          "ja",
          "ar",
          "ru",
          "pt",
          "it",
        ],
        wrapper_selector: ".gtranslate_wrapper",
        alt_flags: { en: "usa" },
      };

      const gScript = document.createElement("script");
      gScript.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
      gScript.defer = true;
      document.body.appendChild(gScript);
    }
  }, []);

  return (
    <div className="fixed bottom-6 left-5 z-50 bg-[#3c4654] border border-gray-600 rounded-md shadow-md p-2">
      <div className="gtranslate_wrapper"></div>
    </div>
  );
}