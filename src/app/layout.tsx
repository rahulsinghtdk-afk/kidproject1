import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import { ADVENTURE_APP_NAME } from "@/lib/design-tokens";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: ADVENTURE_APP_NAME,
  description: "A playful learning adventure for young explorers.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fredoka.variable} h-full antialiased`}>
      <body className="adventure-play-root min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
