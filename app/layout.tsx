import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BinaryQuest AI Assistant",
  description: "Ask anything about BinaryQuest — our services, products, and expertise.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
