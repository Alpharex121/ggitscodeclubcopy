import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";

const Logout = () => {
  const [isVerified, setIsVerified] = useState(false);
  const Navigate = useNavigate();
  const verifyUser = async () => {
    try {
      const data = await axios.get(
        "https://ggitscodeclubcopy.vercel.app/login",
        {
          withCredentials: true,
        }
      );
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
      const data = await axios.post(
        "https://ggitscodeclubcopy.vercel.app/login/logout",
        {
          creadentials: "same-origin",
        }
      );
      console.log(data);
      if (data.status == 200) {
        alert("Logged out seccuessfull");
        Navigate("/");
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
