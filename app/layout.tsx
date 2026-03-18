import type { Metadata } from "next";
import Script from "next/script";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fasttool.top"),
  title: "FastTool",
  description: "Free online FastTool.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" }
    ],
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZQE18GXVEW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            const dataLayer = window.dataLayer || [];
            function gtag(...args) {
              dataLayer.push(args);
            }
            gtag('js', new Date());

            gtag('config', 'G-ZQE18GXVEW');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
