import React, { useEffect, useState } from "react";
import Header from "../../Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResourcesDelete = () => {
  const Navigate = useNavigate();
  const { resourceid } = useParams();
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
      if (data.data.role == "admin" || data.data.role == "resources") {
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
    if (user == "admin" || user == "resources") {
      const ans = confirm("do you want to delete the resource? ");
      if (ans == false) {
        Navigate("/resources");
        return;
      } else {
        deleteNews();
        Navigate("/resources");
        return;
      }
    }
  });

  const deleteNews = async () => {
    api
      .delete("https://ggitscodeclubcopy.vercel.app/resources/" + resourceid)
      .then((response) => {
        if (response.status == 200) {
          toast.success("Resource deleted succesfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });
          Navigate("/resources");
          console.log(response);
        } else {
          toast.error("Error occured while deleting resource!", {
            theme: "colored",
            autoClose: 3000,
          });
          Navigate("/resources");
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

export default ResourcesDelete;
