import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#22C55E",
          colorBackground: "#111827",
          colorInputBackground: "#1F2937",
          colorInputText: "#F9FAFB",
        },
        elements: {
          formButtonPrimary: "bg-green-500 hover:bg-green-600",
          card: "bg-gray-900",
        },
      }}
    >
      <html lang="en" className="dark">
        <body className={`${inter.className} antialiased`} style={{ backgroundColor: '#030712', color: '#f9fafb' }}>
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}