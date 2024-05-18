import React, { useEffect, useState } from "react";
import Header from "../../Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const NewsDelete = () => {
  const Navigate = useNavigate();
  const { newsid } = useParams();
  const [user, setUser] = useState("");
  const [success, setSuccess] = useState([]);

  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });
  const getUserData = async () => {
    console.log("getuserdata");
    try {
      const data = await api.get("https://ggitscodeclubcopy.vercel.app/login");
      if (data.data.role == "admin" || data.data.role == "news") {
        setUser(data.data.role);
      } else {
        toast.warn("Access Denied!", {
          theme: "colored",
          autoClose: 3000,
        });
        Navigate("/");
      }
      return;
    } catch (error) {
      toast.warn("Access Denied!", {
        theme: "colored",
        autoClose: 3000,
      });
      Navigate("/");
      return;
    }
  };

  useEffect(() => {
    getUserData();
    if (user == "admin" || user == "news") {
      const ans = confirm("do you want to delete the news? ");
      if (ans == false) {
        Navigate("/news");
        return;
      } else {
        deleteNews();
        Navigate("/news");
        return;
      }
    }
  });

  const deleteNews = async () => {
    api
      .delete("https://ggitscodeclubcopy.vercel.app/news/" + newsid)
      .then((response) => {
        if (response.status == 200) {
          toast.success("News deleted successfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });
          Navigate("/news");
          console.log(response);
        } else {
          toast.error("Error occured while deleting news!", {
            theme: "colored",
            autoClose: 3000,
          });
          Navigate("/news");
        }
      })
      .catch((error) => {
        if (error.response.status == 401) {
          toast.warn("Access Denied!", {
            theme: "colored",
            autoClose: 3000,
          });
          Navigate("/");
        }
      });
  };

  return <></>;
};

export default NewsDelete;
