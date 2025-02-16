
import FooterSection from "@/component/Footer";
import MainWrapper from "@/component/MainWrapper";

// Styles
import "./globals.css";

// Font Imports
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Health Sure",
  description: "Health Sure Assurance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Call useMediaQuery directly at the top level

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainWrapper>{children}</MainWrapper>
        <FooterSection />
      </body>
    </html>
  );
}
