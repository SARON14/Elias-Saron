import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elias & Saron | Save the Date",
  description:
    "Join us in celebrating the love of Elias and Saron. Save the date for our wedding!",
};

/** `only light` opts out of browser forced dark (e.g. Chrome auto dark mode for sites). */
export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#ebebe9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="light"
      style={{ colorScheme: "only light" }}
      suppressHydrationWarning
    >
      <body
        className={`${playfair.variable} ${inter.variable} min-h-screen bg-off-white antialiased font-body text-sepia`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
