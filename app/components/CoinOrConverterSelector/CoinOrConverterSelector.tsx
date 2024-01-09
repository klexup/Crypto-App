import { AppContext } from "@/app/contexts/AppContext";
import React, { useContext } from "react";

export default function CoinOrConverterSelector() {
  const { coinsOrConverterSelector, setCoinsOrConverterSelector } =
    useContext(AppContext);

  const standardStyles =
    "flex-grow h-full rounded-lg flex justify-center items-center text-themeTextColor";

  const selectedStyles =
    "flex-grow h-full rounded-lg flex justify-center items-center text-themeTextColor bg-accent shadow-[inset_0_0_3px_black]";

  return (
    <>
      <div className="flex p-10 w-full">
        <div className="w-[506px] h-[53px] bg-backgroundSecondary rounded-lg flex justify-between items-center cursor-pointer">
          <div
            className={
              coinsOrConverterSelector === "coins"
                ? selectedStyles
                : standardStyles
            }
            onClick={() => {
              setCoinsOrConverterSelector("coins");
            }}
          >
            Coins
          </div>
          <div
            className={
              coinsOrConverterSelector === "converter"
                ? selectedStyles
                : standardStyles
            }
            onClick={() => {
              setCoinsOrConverterSelector("converter");
            }}
          >
            Convertor
          </div>
        </div>
      </div>
    </>
  );
}
