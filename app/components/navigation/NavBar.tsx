"use client";
import { AppContext } from "@/app/contexts/AppContext";
import React, { useContext, useState } from "react";
//
import NavDarkmodeButtonSvg from "./NavDarkmodeButtonSvg.svg";
import NavLightmodeButtonSvg from "./NavLightmodeButtonSvg.svg";
//
import DarkNavSearchIcon from "./DarkNavSearchIcon.svg";
import LightNavSearchIcon from "./LightNavSearchIcon.svg";
//
import DarkNavHomeIcon from "./DarkNavHomeIcon.svg";
import LightNavHomeIcon from "./LightNavHomeIcon.svg";
import DarkNavHomeIconSelected from "./DarkNavHomeIconSelected.svg";
import LightNavHomeIconSelected from "./LightNavHomeIconSelected.svg";
//
import DarkPortfolioNavIcon from "./DarkPortfolioNavIcon.svg";
import DarkPortfolioNavIconSelected from "./DarkPortfolioNavIconSelected.svg";
import LightPortfolioNavIcon from "./LightPortfolioNavIcon.svg";
import LightPortfolioNavIconSelected from "./LightPortfolioNavIconSelected.svg";
//
import NavLogoSvg from "./NavLogoSvg.svg";

export default function NavBar() {
  const { theme, toggleTheme } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState<pageOption>("home");
  const [currencyOption, setCurrencyOption] = useState("USD");

  const currentPageDarkMode =
    currentPage === "home" ? (
      <div className="text-white flex gap-2 justify-center items-center cursor-pointer">
        <div className="flex gap-1">
          <DarkNavHomeIconSelected />
          <div>Home</div>
        </div>
        <div
          className="flex gap-1"
          onClick={() => {
            setCurrentPage("portfolio");
          }}
        >
          <DarkPortfolioNavIcon />
          <div>Portfolio</div>
        </div>
      </div>
    ) : (
      <div className="text-white flex gap-2 justify-center items-center cursor-pointer">
        <div
          className="flex gap-1"
          onClick={() => {
            setCurrentPage("home");
          }}
        >
          <DarkNavHomeIcon />
          <div>Home</div>
        </div>
        <div className="flex gap-1">
          <DarkPortfolioNavIconSelected />
          <div>Portfolio</div>
        </div>
      </div>
    );

  const currentPageLightMode =
    currentPage === "home" ? (
      <div className="flex gap-2 justify-center items-center cursor-pointer">
        <div className="flex gap-1">
          <LightNavHomeIconSelected />
          <div>Home</div>
        </div>
        <div
          className="flex gap-1"
          onClick={() => {
            setCurrentPage("portfolio");
          }}
        >
          <LightPortfolioNavIcon />
          <div>Portfolio</div>
        </div>
      </div>
    ) : (
      <div className="flex gap-2 justify-center items-center cursor-pointer">
        <div
          className="flex gap-1"
          onClick={() => {
            setCurrentPage("home");
          }}
        >
          <LightNavHomeIcon />
          <div>Home</div>
        </div>
        <div className="flex gap-1">
          <LightPortfolioNavIconSelected />
          <div>Portfolio</div>
        </div>
      </div>
    );

  return (
    <>
      <div className="w-full flex justify-between pl-10 pr-10 pt-5">
        <div className="flex text-xl justify-center items-center gap-2">
          <NavLogoSvg />
          <div className="text-accent">Logoipsm</div>
        </div>

        <div className="flex">
          {theme === "dark" ? currentPageDarkMode : currentPageLightMode}
        </div>

        <div className="flex gap-2">
          <div className="bg-backgroundSecondary rounded-lg p-2 flex justify-center items-center gap-1">
            {theme === "dark" ? <DarkNavSearchIcon /> : <LightNavSearchIcon />}
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
              className="bg-transparent"
            />
          </div>
          <select
            value={currencyOption}
            onChange={(e) => {
              setCurrencyOption(e.target.value);
            }}
            className="p-2 bg-backgroundSecondary rounded-lg text-accent"
          >
            <option value="USD">USD</option>
            <option value="BITCOIN">BITCOIN</option>
          </select>
          <button
            className="p-2 bg-backgroundSecondary max-w-[48xp] max-h-[48px] rounded-lg"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <NavDarkmodeButtonSvg />
            ) : (
              <NavLightmodeButtonSvg />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
