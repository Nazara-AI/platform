import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nazara AI — AI for Offshore Structural Design",
  description:
    "AI-powered QA/QC checks and reviews for structural engineers. Join the Early Access Program.",
  openGraph: {
    title: "Nazara AI — AI for Offshore Structural Design",
    description:
      "AI-powered QA/QC checks and reviews for structural engineers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
