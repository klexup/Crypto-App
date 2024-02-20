"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navigation/NavBar";
import AppContextProvider from "./contexts/AppContext";
import { ReactNode } from "react";
import HomeChartSection from "./components/home-chart-section/HomeChartSection";
import CoinOrConverterSelector from "./components/CoinOrConverterSelector/CoinOrConverterSelector";
import MarketDataNav from "./components/market-data-nav/MarketDataNav";
import HomeTableSection from "./components/home-table-section/HomeTableSection";
import { StoreProvider } from "./store/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppContextProvider>
      <StoreProvider>
        <html lang="en">
          <BodyWapper>
            <MarketDataNav />
            <NavBar />
            <CoinOrConverterSelector />
            <HomeChartSection />
            <HomeTableSection />
            {children}
          </BodyWapper>
        </html>
      </StoreProvider>
    </AppContextProvider>
  );
}

function BodyWapper({ children }: { children: ReactNode }) {
  return (
    <>
      <body
        className={`${inter.className} bg-background max-w-[1440px] flex justify-center items-center flex-col m-auto`}
      >
        {children}
      </body>
    </>
  );
}
