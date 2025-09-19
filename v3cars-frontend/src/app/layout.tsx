import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Layout from "../components/layouts/Layout";
import ScrollFlipIcon from "@/components/common/ScrollFlipIcon";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'], // include weights as needed
  display: 'swap', // optional but recommended for better UX
})

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

    <html lang="en" className={roboto.className}>
      <body
        className="antialiased transition-colors"
      >
        <div className="min-h-screen flex flex-col justify-between">
         
          <Layout>
            {children}
          </Layout>

          <ScrollFlipIcon />
        </div>
      </body>
    </html>

  );
}

