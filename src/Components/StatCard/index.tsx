import React from "react";

export const StatCard = ({ label = "", value = "" }) => {
  return (
    <div className="p-4 shadow flex-1 border rounded flex flex-col justify-center items-center">
      <p className="uppercase">{label}</p>
      <p className="uppercase text-5xl mt-4">{value}</p>
    </div>
  );
};
