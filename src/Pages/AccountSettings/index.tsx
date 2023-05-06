import { Tab, Tabs } from "@mantine/core";
import React from "react";
import { useQuery } from "react-query";

import { AppLoader } from "../../Components/Shared/Loader";
import { Navbar } from "../../Components/Shared/Navbar";
import { StatCard } from "../../Components/StatCard";
import { TrendChart } from "../../Components/TrendChart";
import { getMyStatistics } from "../../services/stat.service";

import "./index.scss";
import { SavedCollections } from "./SavedCollections";

const ChangePassword = () => {
  const { data, isLoading } = useQuery(["get-stat"], getMyStatistics, {
    select: (d) => d.data,
  });

  const renderDashboard = () => {
    if (isLoading) return <AppLoader />;
    const { upload = 0, view = 0, download = 0 } = data;
    return (
      <>
        <div className="flex gap-5">
          <StatCard label="Uploads" value={upload} />
          <StatCard label="Downloads" value={download} />
          <StatCard label="Views" value={view} />
        </div>

        <div className="h-[600px] my-5">
          <TrendChart data={data.stats} />
        </div>
      </>
    );
  };
  return (
    <div className="change-password-page">
      <Navbar />
      <div className="px-8 container mx-auto">
        <div className="mt-4 mb-4 font-medium text-[30px]">My account</div>
        <Tabs>
          <Tab label="Dashboard">{renderDashboard()}</Tab>

          <Tab label="Saved Collections">
            <SavedCollections />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ChangePassword;
