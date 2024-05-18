import React, { useEffect, useState } from "react";
import Header from "./Header";
import NewsCard from "./helper/NewsCard";
import { Button } from "@chakra-ui/react";
import getUserData from "../utils/getUserData";
import getNews from "../utils/getNews";
import NewsShimmer from "../components/shimmers/NewsShimmer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const News = () => {
  const Navigate = useNavigate();
  const [shimdata, setShimData] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const news = useSelector((store) => store.datas.newsData);

  useEffect(() => {
    !news && getNews(dispatch);
  }, []);

  return (
    <>
      <div className="container bg-gray-100 py-6 h-full max-w-full flex md:py-10 lg:py-14">
        <div className="mx-auto  sm:max-w-full">
          <div className="space-y-6">
            {user != null && (user.role == "admin" || user.role == "news") ? (
              <Link to="/newspost">
                <div className="flex justify-endmb-4">
                  <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2  px-4 rounded ml-auto">
                    New News
                  </Button>
                </div>
              </Link>
            ) : null}
            <div className="space-y-2  ">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
                TECH NEWS AND UPDATES
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed text-center lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Stay connected to the latest news in the industry.
              </p>
              {!news ? (
                <NewsShimmer />
              ) : (
                news.map((newsItem, index) => (
                  <div key={index} className="flex flex-col  ">
                    <div className="w-full">
                      <NewsCard
                        title={newsItem.title}
                        description={newsItem.description}
                        tag={newsItem.tag}
                        link={newsItem.link}
                        moredescription={newsItem.moredescription}
                        uploadDate={String(newsItem.createdAt).substring(0, 10)}
                      />
                    </div>
                    {user != null &&
                    (user.role == "admin" || user.role == "news") ? (
                      <div className="flex mt-2 ml-auto">
                        <Link to={"/newsedit/" + newsItem._id}>
                          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                          </Button>
                        </Link>
                        <Link to={"/newsdelete/" + newsItem._id}>
                          <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                            Delete
                          </Button>
                        </Link>
                      </div>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
