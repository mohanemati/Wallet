import React from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router";
import animationData from "../jsons/wallet.json";
import ButtonComponent from "./elements/ButtonComponent";

function HomePage() {
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: "svg",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  w-full">
      <div className="flex lg:flex flex-col items-center justify-center p-24 gap-y-4 border rounded-md shadow-button_sm_hover w-[800px]">
        <div className=" flex items-center justify-center">
          <Lottie options={defaultOptions} />
        </div>
        <div className="flex flex-col gap-4 m-4 w-[100px] items-center justify-center">
          <ButtonComponent
            className="w-[200px] px-10 "
            onClick={() => navigate("/add-wallet")}
          >
            ایجاد کیف پول
          </ButtonComponent>
          <ButtonComponent
            className="w-[200px]"
            bgColor="bg-green-500"
            onClick={() => navigate("/transaction")}
          >
            مشاهده کیف پول
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
