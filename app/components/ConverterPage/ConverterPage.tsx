import React, { useContext, useEffect, useState } from "react";

import VerticalSwitchDarkIcon from "./VerticalSwitchDarkIcon.svg";
import VerticalSwitchLightIcon from "./VerticalSwitchLightIcon.svg";
import { AppContext } from "@/app/contexts/AppContext";
import ConverterCoinSelector from "./ConverterCoinSelector";
import ConverterCoinsChart from "./ConverterCoinsChart";
import ConverterChartDurationSelector from "./ConverterChartDurationSelector";

export default function ConverterPage() {
  const { theme } = useContext(AppContext);
  const switchIcon =
    theme === "dark" ? <VerticalSwitchDarkIcon /> : <VerticalSwitchLightIcon />;
  const [firstCoinData, setFirstCoinData] = useState({
    name: "bitcoin",
    fetchName: "bitcoin",
    amount: 1,
    data: null,
    isSecondCoin: false,
    coinChartData: null,
  });
  const [secondCoinData, setSecondCoinData] = useState({
    name: "ethereum",
    fetchName: "ethereum",
    amount: 1,
    data: null,
    isSecondCoin: true,
    coinChartData: null,
  });
  const [converterChartDurationSelector, setConverterChartDurationSelector] =
    useState<durationOption>("7D");

  const onSwitchButtonClick = () => {
    setFirstCoinData((prev) => {
      const newFirst = { ...secondCoinData, isSecondCoin: false };
      setSecondCoinData({ ...prev, isSecondCoin: true });
      return newFirst;
    });
  };

  const firstCoinPrice = firstCoinData.data?.market_data?.current_price?.usd;
  const secondCoinPrice = secondCoinData.data?.market_data?.current_price?.usd;
  const amountOfFirstCoin = firstCoinData.amount;

  useEffect(() => {
    if (
      firstCoinData &&
      secondCoinData &&
      (firstCoinData.data || secondCoinData.data)
    ) {
      const newOtherAmount =
        (firstCoinData.amount *
          firstCoinData.data?.market_data?.current_price?.usd) /
        secondCoinData.data?.market_data?.current_price?.usd;
      setSecondCoinData((prev) => ({ ...prev, amount: newOtherAmount }));
    }
  }, [firstCoinData.amount, firstCoinData.data, secondCoinData.data]);

  return (
    <div className="text-themeTextColor w-full px-10 flex flex-col justify-center items-center">
      <div className="flex w-full justify-center items-center relative">
        <div className="basis-1/2 bg-chartBackground rounded-2xl text-themeTextColor flex flex-col items-center p-4 gap-4">
          <div className="w-full opacity-50 text-sm">You sell</div>
          <ConverterCoinSelector
            coinData={firstCoinData}
            otherCoinData={secondCoinData}
            setOtherCoinData={setSecondCoinData}
            setCoinData={setFirstCoinData}
            converterChartDurationSelector={converterChartDurationSelector}
          />
        </div>
        <div className="w-[15px] h-[15px]"></div>
        <div className="min-w-[46px] min-h-[46px] max-w-[46px] max-h-[46px] bg-background rounded-full flex justify-center items-center absolute"></div>
        <div
          className="min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] bg-themeTextColor rounded-full flex justify-center items-center absolute cursor-pointer transition-all hover:scale-110 z-10"
          onClick={onSwitchButtonClick}
        >
          {switchIcon}
        </div>
        <div className="basis-1/2 bg-chartBackground rounded-2xl text-themeTextColor flex flex-col items-center p-4 gap-4">
          <div className="w-full opacity-50 text-sm">You buy</div>
          <ConverterCoinSelector
            coinData={secondCoinData}
            otherCoinData={firstCoinData}
            setOtherCoinData={setFirstCoinData}
            setCoinData={setSecondCoinData}
            converterChartDurationSelector={converterChartDurationSelector}
          />
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center mt-10  bg-chartBackground rounded-lg relative">
        <ConverterChartDurationSelector
          converterChartDurationSelector={converterChartDurationSelector}
          setConverterChartDurationSelector={setConverterChartDurationSelector}
        />
        <ConverterCoinsChart
          firstCoinData={firstCoinData.data}
          secondCoinData={secondCoinData.data}
          firstCoinChartData={firstCoinData.coinChartData}
          secondCoinChartData={secondCoinData.coinChartData}
        />
      </div>
    </div>
  );
}
