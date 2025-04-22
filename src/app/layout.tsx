import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Putra Dinantio | Data and Public Policy Enthusiast",
  description: "Personal portfolio website of Putra Dinantio, a Data and Public Policy Enthusiast",
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
        <style>{`
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px) rotate(-1deg); }
            50% { transform: translateX(5px) rotate(1deg); }
            75% { transform: translateX(-3px) rotate(-0.5deg); }
            100% { transform: translateX(0); }
          }
          
          .shake-on-hover:hover {
            animation: shake 0.5s ease;
          }
          
          @keyframes bounce-lr {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(8px); }
          }
          
          .ditto-bounce {
            animation: bounce-lr 1.5s infinite;
          }
          
          @keyframes wiggle {
            0%, 100% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(-3deg) scale(1.05); }
            75% { transform: rotate(3deg) scale(0.95); }
          }
          
          .ditto-wiggle {
            animation: wiggle 1s infinite;
          }
          
          @keyframes bounce-thinking {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-3px) rotate(-2deg); }
            50% { transform: translateY(0) rotate(0deg); }
            75% { transform: translateY(2px) rotate(2deg); }
          }
          
          .ditto-thinking {
            animation: bounce-thinking 0.8s infinite;
          }
          
          .typing-dots {
            display: inline-flex;
            align-items: center;
          }
          
          .typing-dots span {
            background-color: currentColor;
            border-radius: 50%;
            width: 4px;
            height: 4px;
            margin: 0 2px;
            display: inline-block;
            opacity: 0.3;
          }
          
          .typing-dots span:nth-child(1) {
            animation: pulse 1.4s infinite ease-in-out;
          }
          
          .typing-dots span:nth-child(2) {
            animation: pulse 1.4s 0.2s infinite ease-in-out;
          }
          
          .typing-dots span:nth-child(3) {
            animation: pulse 1.4s 0.4s infinite ease-in-out;
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}</style>
      </head>
      <body className={`${firaCode.variable} ${inter.variable} font-mono antialiased transition-colors duration-300`}>
        {children}
      </body>
    </html>
  );
} 