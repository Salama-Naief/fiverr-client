import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import dynamic from "next/dynamic";

const ConfettiFun = () => {
  //const { width, height } = useWindowSize();
  const width = window.screen.width - 10;
  const height = window.screen.height - 10;
  return <Confetti width={width} height={height} />;
};

export default dynamic(() => Promise.resolve(ConfettiFun), { ssr: false });
