import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const notoSans = Noto_Sans({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Andrew Bruening",
  description: "Costume Technician",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        {children}
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
