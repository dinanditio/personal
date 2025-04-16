import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Dinantinho | Brazilian Footballer",
  description: "Personal portfolio website of Dinantinho, a Brazilian Footballer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={`${firaCode.variable} font-mono antialiased transition-colors duration-300`}>
        {children}
      </body>
    </html>
  );
} 