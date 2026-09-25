import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#315C4A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Apex Diagnostics | Advanced Diagnostic Center & Healthcare Management",
    template: "%s | Apex Diagnostics",
  },
  description:
    "ISO 15189 & CAP accredited diagnostic center offering advanced pathology, 3.0T MRI, 128-slice CT scan, 4D ultrasound, echocardiogram, and verifiable digital medical reports.",
  keywords: [
    "Diagnostic Center",
    "Medical Laboratory",
    "Blood Test",
    "MRI Scan",
    "CT Scan",
    "Pathology",
    "Echocardiogram",
    "Dhaka Diagnostic Center",
    "Online Medical Report",
    "Doctor Appointment",
  ],
  authors: [{ name: "Apex Diagnostics Clinical Team" }],
  creator: "Apex Diagnostics",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://apexdiagnostics.com.bd",
    title: "Apex Diagnostics | Precision Medical Testing & Digital Health",
    description:
      "Advanced diagnostics with automated barcoded analyzers, expert pathologists, 3.0T MRI, and cryptographically verified digital reports.",
    siteName: "Apex Diagnostics",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Diagnostics | Clinical Excellence",
    description:
      "Reliable diagnostic testing, experienced specialists, and modern medical technology.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#171717] antialiased font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
