import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Sidebar from "./Components/Sidebar/Sidebar";
import GlobalStylesProvider from "./providers/GlobalStylesProvider";
import Footer from "./Components/Footer/Footer";
import { Providers } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalStylesProvider>
          {/* <Sidebar />
          <div className="w-full">{children}</div> */}

          <Providers>{children}</Providers>
        </GlobalStylesProvider>
        <Footer />
      </body>
    </html>
  );
}
