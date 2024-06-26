"use client";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import useLocalStorage from "../components/custom-hooks/useLocalStorage";

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [coinsOrConverterSelector, setCoinsOrConverterSelector] =
    useState<CoinOrConverterSelectorOption>("coins");
  const isProd = process.env.NODE_ENV === "production";
  const [isViewingCoinPage, setIsViewingCoinPage] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<pageOption>("home");
  const [currency, setCurrency] = useLocalStorage("currency", "usd");
  const [screenWidth, setScreenWidth] = useState(0);

  function debounce(func: any, wait: number) {
    let timeout: any;
    return function (...args: any) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      const handleResize = debounce(() => {
        setScreenWidth(window.innerWidth);
      }, 150);

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const currencyCodes = [
    "usd", // United States Dollar
    "eur", // Euro
    "jpy", // Japanese Yen
    "gbp", // British Pound Sterling
    "aud", // Australian Dollar
    "cad", // Canadian Dollar
    "chf", // Swiss Franc
    "cny", // Chinese Yuan
    "hkd", // Hong Kong Dollar
    "sgd", // Singapore Dollar
    "krw", // South Korean Won
    "inr", // Indian Rupee
    "brl", // Brazilian Real
    "mxn", // Mexican Peso
  ];

  const currencySymbols = {
    usd: "$",
    eur: "€",
    jpy: "¥",
    gbp: "£",
    aud: "A$",
    cad: "C$",
    chf: "CHF",
    cny: "¥",
    hkd: "HK$",
    sgd: "S$",
    krw: "₩",
    inr: "₹",
    brl: "R$",
    mxn: "$",
  };

  const currencySymbol =
    currencySymbols[currency as keyof typeof currencySymbols];

  const toggleTheme = () => {
    setTheme((prev: themeOption) => {
      if (prev === "light") {
        return "dark";
      } else return "light";
    });
  };

  const colors = useMemo(
    () => ({
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
      selectedGradient: theme === "dark" ? "#7878FA" : "#7878FA",
    }),
    [theme]
  );

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
    root.style.setProperty(
      "--color-selected-gradient",
      colors.selectedGradient
    );
  }, [colors]);

  const marketCapCurrencyFormat = new Intl.NumberFormat(undefined, {
    maximumSignificantDigits: 3,
    currency: currency.toUpperCase(),
  });

  const percentFormat = new Intl.NumberFormat(undefined, {
    style: "percent",
    currency: currency.toUpperCase(),
  });

  const percentFormat4CharMax = new Intl.NumberFormat(undefined, {
    style: "percent",
    maximumSignificantDigits: 4,
    currency: currency.toUpperCase(),
  });

  const marketCapPercentageFormat = new Intl.NumberFormat(undefined, {
    maximumSignificantDigits: 3,
    currency: currency.toUpperCase(),
  });

  const percentageBarFormat = new Intl.NumberFormat(undefined, {
    maximumSignificantDigits: 3,
    currency: currency.toUpperCase(),
  });

  const currencyFormat = new Intl.NumberFormat(undefined, {
    maximumSignificantDigits: 5,
    style: "currency",
    currency: currency.toUpperCase(),
  });

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
          percentageBarFormat,
          marketCapPercentageFormat,
          percentFormat4CharMax,
          percentFormat,
          marketCapCurrencyFormat,
          isProd,
          isViewingCoinPage,
          setIsViewingCoinPage,
          currentPage,
          setCurrentPage,
          currency,
          setCurrency,
          currencyCodes,
          currencySymbols,
          currencySymbol,
          screenWidth,
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
    selectedGradient: "#7878FA",
  },
  currencyFormat: new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }),
  marketCapCurrencyFormat: new Intl.NumberFormat(undefined, {
    maximumSignificantDigits: 3,
    currency: "USD",
  }),
  percentFormat: new Intl.NumberFormat(undefined, {
    style: "percent",
    currency: "USD",
  }),
  percentFormat4CharMax: new Intl.NumberFormat(undefined, {
    style: "percent",
    maximumSignificantDigits: 4,
    currency: "USD",
  }),
  marketCapPercentageFormat: new Intl.NumberFormat(undefined, {
    maximumSignificantDigits: 3,
    currency: "USD",
  }),
  percentageBarFormat: new Intl.NumberFormat(undefined, {
    maximumSignificantDigits: 3,
    currency: "USD",
  }),
  isProd: process.env.NODE_ENV === "production",
  isViewingCoinPage: false,
  setIsViewingCoinPage: () => {},
  currentPage: "home",
  setCurrentPage: () => {},
  currency: "usd",
  setCurrency: () => {},
  currencyCodes: [
    "usd",
    "eur",
    "jpy",
    "gbp",
    "aud",
    "cad",
    "chf",
    "cny",
    "hkd",
    "sgd",
    "krw",
    "inr",
    "brl",
    "mxn",
  ],
  currencySymbols: {
    usd: "$",
    eur: "€",
    jpy: "¥",
    gbp: "£",
    aud: "A$",
    cad: "C$",
    chf: "CHF",
    cny: "¥",
    hkd: "HK$",
    sgd: "S$",
    krw: "₩",
    inr: "₹",
    brl: "R$",
    mxn: "$",
  },
  currencySymbol: "$",
  screenWidth: null,
});
