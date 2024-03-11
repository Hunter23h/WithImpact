import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Nav from "./ui/nav";
import { cn } from "@/lib/utils";
import { GlobalContextProvider } from "./context";
import AuthContextProvider from "./context/AuthContext";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});
export const metadata: Metadata = {
  title: "With Impact",
  description: "WithImpact",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body
          className={cn(
            outfit.className,
            "h-[100vh] flex flex-col overflow-auto"
          )}
        >
          <AuthContextProvider>
            <GlobalContextProvider>
              <Nav />
              {children}
            </GlobalContextProvider>
          </AuthContextProvider>
        </body>
      </html>
    </>
  );
}
