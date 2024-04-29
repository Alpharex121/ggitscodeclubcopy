import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import { useCookies } from "react-cookie";

const Logout = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const Navigate = useNavigate();
  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });
  const verifyUser = async () => {
    try {
      const data = await api.get("https://ggitscodeclubcopy.vercel.app/login");
      if (data.status == 200) {
        setIsVerified(true);
      }
      return;
    } catch (error) {
      if (error.response.status == 401) {
        alert("User not looged in");
        Navigate("/");
        return;
      }
    }
  };
  const logoutUser = async () => {
    try {
      const data = await api.get(
        "https://ggitscodeclubcopy.vercel.app/login/logout"
      );
      console.log(data);
      if (data.status == 200) {
        console.log(cookies);
        removeCookie("jwt");
        alert("Logged out seccuessfull");
        // Navigate("/");
      }
    } catch (error) {
      console.log(error);
      console.log("Error occur while logging out");
    }
  };

  useEffect(() => {
    verifyUser();
    logoutUser();
  }, []);

  return (
    <>
      <Header />
    </>
  );
};

export default Logout;
