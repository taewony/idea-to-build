import type { Metadata } from "next";
import { Noto_Sans_KR, Gowun_Dodum } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const noto_sans_kr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-display",
});

const gowun_dodum = Gowun_Dodum({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-handwriting",
});

export const metadata: Metadata = {
  title: "GoalCracker",
  description: "AI-Powered Goal Achievement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className={`${noto_sans_kr.variable} ${gowun_dodum.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}