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
  const [currentPage, setCurrentPage] = useState<pageOption>("home");

  const toggleTheme = () => {
    setTheme((prev: themeOption) => {
      if (prev === "light") {
        return "dark";
      } else return "light";
    });
  };

  const colors = {
    background: theme === "dark" ? "#13121B" : "#F3F5F9",
    backgroundSecondary: theme === "dark" ? "#191925" : "#ebebfd",
    primary: theme === "dark" ? "#191926" : "#FFF",
    accent: theme === "dark" ? "#1e1932" : "#353570",
    chartBackground: theme === "dark" ? "#191934" : "#FFF",
    themeTextColor: theme === "dark" ? "#ffffff" : "#424286",
    themeTextColorSecondary: theme === "dark" ? "#ffffff" : "#353570",
    themeTextColorThird: theme === "dark" ? "#ffffff" : "#181825",
    highlightColor: theme === "dark" ? "#3d3d7e" : "#a9aae7",
    greenMain: theme === "dark" ? "#01f1e3" : "#01f1e3",
    greenSecondary: theme === "dark" ? "#00b1a7" : "#00b1a7",
    redMain: theme === "dark" ? "#FE2264" : "#FE2264",
    navBarColor: theme === "dark" ? "#13121a" : "#ffffff",
    coinsOrConverterBackgroundColor: theme === "dark" ? "#232336" : "#ffffff",
    chartDurationBackgroundColor: theme === "dark" ? "#232336" : "#e3e5f9",
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
    root.style.setProperty(
      "--color-theme-text-color-secondary",
      colors.themeTextColorSecondary
    );
    root.style.setProperty(
      "--color-theme-text-color-third",
      colors.themeTextColorThird
    );
    root.style.setProperty("--color-highlight-color", colors.highlightColor);
    root.style.setProperty("--color-green-main", colors.greenMain);
    root.style.setProperty("--color-green-secondary", colors.greenSecondary);
    root.style.setProperty("--color-red-main", colors.redMain);
    root.style.setProperty("--color-nav-bar-color", colors.navBarColor);
    root.style.setProperty(
      "--color-coins-or-converter-background-color",
      colors.coinsOrConverterBackgroundColor
    );
    root.style.setProperty(
      "--color-chart-duration-background-color",
      colors.chartDurationBackgroundColor
    );
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
          currentPage,
          setCurrentPage,
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
    accent: "#1e1932",
    chartBackground: "#191934",
    themeTextColor: "#ffffff",
    themeTextColorSecondary: "#ffffff",
    themeTextColorThird: "#ffffff",
    highlightColor: "#3d3d7e",
    greenMain: "#01f1e3",
    greenSecondary: "#00b1a7",
    redMain: "#FE2264",
    navBarColor: "#13121a",
    coinsOrConverterBackgroundColor: "#232336",
    chartDurationBackgroundColor: "#232336",
  },
  currencyFormat: new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "usd",
  }),
  isProd: process.env.NODE_ENV === "production",
  isViewingCoinPage: false,
  setIsViewingCoinPage: () => {},
  currentPage: "home",
  setCurrentPage: () => {},
});
