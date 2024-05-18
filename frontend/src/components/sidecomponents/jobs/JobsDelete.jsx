import React, { useEffect, useState } from "react";
import Header from "../../Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const JobsDelete = () => {
  const Navigate = useNavigate();
  const { jobid } = useParams();
  const [user, setUser] = useState("");
  const [success, setSuccess] = useState([]);

  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });
  const getUserData = async () => {
    try {
      const data = await api.get("https://ggitscodeclubcopy.vercel.app/login");
      if (data.data.role == "admin" || data.data.role == "jobs") {
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
    const ans = confirm("do you want to delete the job? ");
    if (user == "admin" || user == "jobs") {
      if (ans == false) {
        Navigate("/jobs");
        return;
      } else {
        deleteJob();
        Navigate("/jobs");
        return;
      }
    }
  });

  const deleteJob = async () => {
    api
      .delete("https://ggitscodeclubcopy.vercel.app/jobs/" + jobid)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          toast.success("Job deleted successfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });
          Navigate("/jobs");
          console.log(response);
        } else {
          toast.error("Error while deleting job!", {
            theme: "colored",
            autoClose: 3000,
          });
          Navigate("/jobs");
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

export default JobsDelete;
