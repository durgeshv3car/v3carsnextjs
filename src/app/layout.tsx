import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/web/common/Footer";
import MobileFooter from "@/components/mobile/common/Footer";
import Header from "@/components/common/Header";
import Provider from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "V3Cars - Latest Car News, Reviews, Launches, Comparisons & Prices",
  description:
    "Get latest car news, reviews, comparisons, price updates, upcoming launches and much more from the Indian automobile industry at V3Cars.",
  keywords: [
    "V3Cars",
    "car news",
    "car reviews",
    "car launches",
    "car comparison",
    "car prices",
    "Indian cars",
    "new cars in India",
    "automobile news India",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <div className="h-screen flex flex-col justify-between">

          <Header />
          <Provider>
            {children}
          </Provider>



        </div>

      </body>
    </html>
  );
}
