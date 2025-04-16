import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Putra Dinantio | Political Science Student",
  description: "Personal website of Putra Dinantio, a political science student nicknamed Dito",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={`${firaCode.variable} font-mono antialiased bg-gradient-to-b from-sky-50 to-white dark:from-sky-900 dark:to-sky-950`}>
        {children}
      </body>
    </html>
  );
} 