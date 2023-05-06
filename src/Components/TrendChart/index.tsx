import { format } from "date-fns";
import { groupBy } from "lodash";
import React, { FC, memo, useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getDateMap } from "../../utils";

export const TrendChart: FC<{ data: any }> = memo(({ data }) => {
  const chartData = useMemo(() => {
    const chartData = groupBy(data, "type");
    const viewMap = getDateMap(chartData["view"] || []);
    const downloadMap = getDateMap(chartData["download"] || []);
    const transformedData = [];
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      let month: string | number = date.getMonth() + 1;
      let day: string | number = date.getDate();

      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }

      const formattedDate = `${date.getFullYear()}-${month}-${day}`;

      transformedData.push({
        date: format(new Date(formattedDate), "MMM-dd"),
        view: viewMap.get(formattedDate) || 0,
        download: downloadMap.get(formattedDate) || 0,
      });
    }

    return transformedData;
  }, [data]);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />

        <Area type="monotone" dataKey="download" fill="none" stroke="grey" />

        <Area fill="#f0fcff" type="monotone" dataKey="view" stroke="#189eff" />
      </AreaChart>
    </ResponsiveContainer>
  );
});
