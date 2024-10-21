import { Route, Routes, useLocation, useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { AUTH_JWTOKEN_VERIFY } from "../api/apiClient";
import Lottie from "react-lottie";
import animationData from "../jsons/LoadingBg.json";
import LandingLayout from "../LandingLayout";
import UserLayout from "../UserLayout";
import AddAccount from "../component/AddAccount";
import HomePage from "../component/HomePage";
import AddUser from "../component/AddUser";
import Transaction from "../component/Transaction/Transaction";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  renderer: "svg",
};

export default function RoutesWithAnimation() {
  const location = useLocation();
  const access_token = localStorage.getItem("access_token");
  const [formNo, setFormNo] = useState<number>(1);

  const navigate = useNavigate();
  const [enteredUser, setEnteredUser] = useState(
    localStorage.getItem("user_state") === "REGISTERED" ||
      localStorage.getItem("user_state") === "VERIFIED"
      ? localStorage.getItem("access_token")
      : null
  );

  // const verifyToken = async () => {
  //   if (access_token) {
  //     try {
  //       const response = await axiosPrivate.post(
  //         AUTH_JWTOKEN_VERIFY,
  //         { token: access_token },
  //         {
  //           headers: {
  //             accept: "application/json",
  //             Authorization: `Bearer ${access_token}`,
  //           },
  //           withCredentials: true,
  //         }
  //       );
  //       if (response?.status >= 200 && response?.status < 300) {
  //         setEnteredUser(
  //           localStorage.getItem("user_state") === "REGISTERED" ||
  //             localStorage.getItem("user_state") === "VERIFIED"
  //             ? localStorage.getItem("access_token")
  //             : null
  //         );
  //       }
  //     } catch (error) {
  //       setEnteredUser("");
  //       localStorage.clear();
  //       navigate("/");
  //     }
  //   }
  // };

  // useEffect(() => {
  //   verifyToken();
  // }, []);

  return (
    <Routes location={location} key={location.key}>
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/add-wallet" element={<AddUser />} />
        <Route path="/add-account" element={<AddAccount />} />
        <Route path="/transaction" element={<Transaction />} />
      </Route>
    </Routes>
  );
}
