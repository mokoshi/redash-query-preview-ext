import React from "react";
import Svg from "./loading.svg";

export const Loading: React.FC = () => {
  return <img style={{ width: 24, height: 24 }} src={Svg} alt="loading" />;
};
