import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "inflnce.io - B2B Digital Service Wholesale Platform",
  description: "Premium wholesale platform for digital marketing and social media services",
  keywords: "digital marketing, social media, wholesale, B2B, marketing services",
  authors: [{ name: "inflnce.io" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111827",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`} style={{ backgroundColor: '#030712', color: '#f9fafb' }}>
        {children}
      </body>
    </html>
  );
}
