"use client";
import { createContext, useEffect, useState } from "react";

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<themeOption>("dark");
  const [coinsOrConverterSelector, setCoinsOrConverterSelector] =
    useState<CoinOrConverterSelectorOption>("coins");
  const isProd = process.env.NODE_ENV === "production";
  const [isViewingCoinPage, setIsViewingCoinPage] = useState<boolean>(false);

  const toggleTheme = () => {
    setTheme((prev: themeOption) => {
      if (prev === "light") {
        return "dark";
      } else return "light";
    });
  };

  const colors = {
    background: theme === "dark" ? "#13121B" : "#F3F5F9",
    backgroundSecondary:
      theme === "dark" ? "#191925" : "rgba(204, 204, 254, 0.4)",
    primary: theme === "dark" ? "#191926" : "#FFF",
    accent:
      theme === "dark" ? "rgba(97, 97, 222, 0.50)" : "rgba(97, 97, 222, 0.50)",
    chartBackground: theme === "dark" ? "#191934" : "#FFF",
    themeTextColor: theme === "dark" ? "#ffffff" : "#424286",
    greenMain: theme === "dark" ? "#00f58f" : "#00f58f",
    redMain: theme === "dark" ? "#ff0015" : "#ff0015",
  };

  const currencyFormat = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "usd",
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-background", colors.background);
    root.style.setProperty(
      "--color-background-secondary",
      colors.backgroundSecondary
    );
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-accent", colors.accent);
    root.style.setProperty("--color-chart-background", colors.chartBackground);
    root.style.setProperty("--color-themeTextColor", colors.themeTextColor);
    root.style.setProperty("--color-green-main", colors.greenMain);
    root.style.setProperty("--color-red-main", colors.redMain);
  }, [theme, colors]);

  return (
    <>
      <AppContext.Provider
        value={{
          theme,
          setTheme,
          toggleTheme,
          colors,
          coinsOrConverterSelector,
          setCoinsOrConverterSelector,
          currencyFormat,
          isProd,
          isViewingCoinPage,
          setIsViewingCoinPage,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}

export const AppContext = createContext<CreateContextType>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
  coinsOrConverterSelector: "coins",
  setCoinsOrConverterSelector: () => {},
  colors: {
    background: "#13121B",
    backgroundSecondary: "#191925",
    primary: "#191926",
    accent: "rgba(97, 97, 222, 0.50)",
    chartBackground: "#191934",
  },
  currencyFormat: new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "usd",
  }),
  isProd: process.env.NODE_ENV === "production",
  isViewingCoinPage: false,
  setIsViewingCoinPage: () => {},
});
