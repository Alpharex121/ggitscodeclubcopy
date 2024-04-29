import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";

const Logout = () => {
  const [isVerified, setIsVerified] = useState(false);
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
      await api
        .post("https://ggitscodeclubcopy.vercel.app/login/logout")
        .then((data) => {
          if (data.status == 200) {
            alert("Logged out seccuessfull");
            // Navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("Error occur while logging out");
        });
    } catch (error) {
      console.log(error);
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
