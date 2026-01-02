import type { Metadata } from "next";
import { Roboto_Slab, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-Montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AniPath",
  description: "Anime and Manga Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSlab.variable} ${montserrat.variable} antialiased`}
      >
          
        <div className="flex flex-col h-screen">
          

            <div className="h-screen flex  flex-1">
                   {/* Sidebar nav */}
                <nav className="  ">
                  <Navbar />
                </nav>

          
              {/* Main area */}
              <div className="flex flex-col overflow-hidden">
                  {/* Header */}
              <Header />

           
                {/* Page content */}
                <main className="flex-1 overflow-y-auto">
                  {children}
                </main>

              </div>
            </div>


        </div>
      </body>
    </html>
  );
}
