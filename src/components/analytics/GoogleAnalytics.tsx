"use client";

import Script from "next/script";

export function GoogleAnalytics({ gaId }: { gaId?: string }) {
  if (!gaId || typeof gaId !== "string" || !gaId.trim().startsWith("G-")) {
    return null;
  }

  const cleanId = gaId.trim();

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${cleanId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${cleanId}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
