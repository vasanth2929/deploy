import { Tab, Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Masonry } from "../../Components/Masonary";
import { AppLoader } from "../../Components/Shared/Loader";
import { Navbar } from "../../Components/Shared/Navbar";
import { StatCard } from "../../Components/StatCard";
import { TrendChart } from "../../Components/TrendChart";
import { Users } from "../../Components/Users";
import { getAllStatistics } from "../../services/stat.service";
import { getUser } from "../../utils";
import "./index.css";

export const Admin = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { data: statData, isLoading: statLoading } = useQuery(
    ["get-admin-stat"],
    getAllStatistics,
    {
      select: (d) => d.data,
      enabled: activeTab == 0,
    }
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (getUser().role !== "admin") {
      navigate("/");
    }
  }, []);

  const renderDashboard = () => {
    if (statLoading) return <AppLoader />;
    const { upload = 0, view = 0, download = 0 } = statData;
    return (
      <>
        <div className="flex gap-5">
          <StatCard label="Uploads" value={upload} />
          <StatCard label="Downloads" value={download} />
          <StatCard label="Views" value={view} />
        </div>

        <div className="h-[600px] my-5">
          <TrendChart data={statData.stats} />
        </div>
      </>
    );
  };
  return (
    <div>
      <Navbar />
      <div className="px-8">
        <div className="mt-8 mb-4 font-medium text-[30px]">Admin</div>

        <div className="flex">
          <Tabs
            className="flex-1"
            active={activeTab}
            onTabChange={setActiveTab}
          >
            <Tab label="Dashboard">{renderDashboard()}</Tab>
            <Tab label="Review Submission">
              <Masonry userIn="admin" type="Photo" />
            </Tab>
            <Tab label="Users">
              <Users activeTab={activeTab} />
            </Tab>
          </Tabs>
          <div>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex-1 cursor-pointer border-b-2 right-0 mt-[10px] pb-1 flex justify-end items-center"
            >
              <MdMoreHoriz />
              <span className="mx-2">More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
