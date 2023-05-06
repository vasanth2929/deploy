import React, { useState } from "react";
import {
  Checkbox,
  Pagination,
  Paper,
  Tab,
  Tabs,
  Transition,
} from "@mantine/core";
import { FaUser } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { useQuery } from "react-query";
import { getUsers, updateStatus } from "../../services/user.services";
import { usePopperTooltip } from "react-popper-tooltip";
import { useClickOutside } from "@mantine/hooks";
import { AppLoader } from "../Shared/Loader";
const scaleY = {
  in: { opacity: 1, transform: "scaleY(1)" },
  out: { opacity: 0, transform: "scaleY(0)" },
  common: { transformOrigin: "top" },
  transitionProperty: "transform, opacity",
};
export const Users = ({ activeTab }) => {
  const [page, setPage] = useState(1);
  let [user, setUser] = useState<any>({});
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const [opened, setOpened] = useState(false);
  const clickOutsideRef = useClickOutside(() => setOpened(false));

  const { data, isLoading, refetch } = useQuery("users", getUsers, {
    enabled: activeTab === 2,
  });
  const toogleStatus = (e) => {
    setOpened(false);
    updateStatus(
      user._id,
      user?.status === "active" ? "inactive" : "active"
    ).then(() => {
      refetch();
    });
  };
  if (isLoading) return <AppLoader />;
  return (
    <>
      <div className="flex items-center max-w-[1200px] mx-auto mb-4 mt-5">
        <Checkbox />
        <div className="flex items-center flex-1 ml-5">
          <div className="flex flex-col mx-8 w-[300px] max-w-[300px] min-w-[300px] pl-[70px]">
            Name
          </div>

          <p className="flex-1  w-52 max-w-52 min-w-52">Email</p>

          <p className="flex-1">Phone</p>

          <div className={" status"}>status</div>

          <div className="mx-8 flex justify-end w-9">
            <MdMoreVert />
          </div>
        </div>
      </div>
      {data.data.slice(10 * (page - 1), 10 * (page - 1) + 10).map((t: any) => (
        <div
          key={t._id}
          className="flex items-center max-w-[1200px] mx-auto mb-4 relative"
        >
          <Checkbox />
          <div className="flex items-center flex-1 ml-5 row">
            {t.url ? (
              <img
                className="w-[75px] h-[85px] object-cover user-img"
                src={t.url}
              />
            ) : (
              <FaUser className="w-[75px] h-[85px] px-2" />
            )}

            <div className="flex flex-col mx-8 w-52 max-w-52 min-w-52">
              <span className="user-name">{t.username}</span>
              <span>{t.location}</span>
            </div>

            <p className="flex-1  w-52 max-w-52 min-w-52">{t.email}</p>

            <p className="flex-1">{t.phone}</p>

            <div className={" status  " + t.status?.toLowerCase()}>
              {t.status}
            </div>

            <div
              className="cursor-pointer px-6 py-3"
              onClick={(e) => {
                setUser(t);
                setOpened(true);
                setPos({ x: e.clientX, y: e.clientY });
              }}
            >
              <span className="cursor-pointer">
                <MdMoreVert />
              </span>
            </div>
          </div>
        </div>
      ))}

      <Transition
        mounted={opened}
        transition={scaleY}
        duration={200}
        timingFunction="ease"
      >
        {(styles) => (
          <Paper
            shadow="md"
            style={{
              ...styles,
              position: "absolute",
              top: pos.y,
              left: pos.x,
            }}
            ref={clickOutsideRef}
          >
            <div
              className="shadow-2xl border bg-white px-8 py-2 rounded-md cursor-pointer"
              onClick={toogleStatus}
            >
              Set {user?.status === "active" ? "Inactive" : "active"}
            </div>
          </Paper>
        )}
      </Transition>

      {data.data.length > 10 && (
        <div className=" max-w-[1200px] mx-auto my-8">
          <Pagination
            classNames={{ active: "active-pagination-btn" }}
            page={page}
            onChange={(p) => setPage(p)}
            total={Math.ceil(data.data.length / 10)}
          />
        </div>
      )}
    </>
  );
};
