import axios from "axios";
import React, { useEffect, useState } from "react";

const getUserData = () => {
  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const data = await api.get("https://ggitscodeclubcopy.vercel.app/login", {
        withCredentials: true,
      });
    } catch (error) {
      return;
    }
  };
  return user;
};

export default getUserData;
