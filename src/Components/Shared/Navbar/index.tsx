import React, { FC, memo, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import "./index.css";

import { appsMenus, removeUser } from "../../../utils";
import clsx from "clsx";
import { SearchBar } from "../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setAuthenticated } from "../../../store/auth";
import { setActivePath } from "../../../store/ui";
import { Avatar } from "../Avatar";
import stocklerzLogoWithName from "../../../assets/stocklerz_logo_wname.svg";

const leftNav = [
  {
    name: "Photos",
    path: "/photos",
    isAuthRequired: false,
  },
  {
    name: "Vectors",
    path: "/vectors",
  },
  {
    name: "Videos",
    path: "/videos",
  },
  {
    name: "Music",
    path: "/music",
  },
  {
    name: "SFX",
    path: "/sfx"
  },
  // {
  //   name: "3D",
  //   path: "/3d"
  // },
  // {
  //   name: "Icons",
  // },
  // {
  //   name: "Courses",
  //   path: "/courses",
  // },
];

const rightNav = [
  // {
  //   name: "Pricing",
  // },
  {
    name: "Upload",
    path: "/upload",
    isAuthRequired: true,
  },
];

export const Navbar: FC<{ showSearchBar?: boolean }> = memo(
  ({ showSearchBar = false }) => {
    const params = useSearchParams();
    const [value, setValue] = useState(params[0].get("q") || "");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(
      (t: RootState) => t.auth.isAuthenticated
    );

    const { activePath } = useSelector((t: RootState) => t.ui);

    const submit = () => {
      navigate("/search?q=" + value, { replace: true });
    };

    const handleLink = (e: any, item: any) => {
      e.preventDefault();
      if (isAuthenticated) {
        dispatch(setActivePath(item.path));
        navigate(item.path);
      } else {
        navigate("/login");
      }
    };

    const logout = () => {
      dispatch(setAuthenticated(false));
      removeUser();
      navigate("/");
    };

    const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
      usePopperTooltip({
        trigger: "click",
        interactive: true,
      });

    const setDefaultAndNavigate = (e: any, item: any) => {
      e.preventDefault();
      dispatch(setActivePath(item.path));
      navigate(item.path);
    };

    return (
      <nav className="bg-white flex px-4 justify-between items-center navbar navbar-fixed z-30">
        <div className="flex items-center top-nav">
          <div className="mr-10 top-nav-transition">
            <Link
              className={clsx({ "active-path": activePath === "/" })}
              to={"/"}
              onClick={() => dispatch(setActivePath("/"))}
            >
              <img
                src={stocklerzLogoWithName}
                alt="Stocklerz"
                className="logo"
              />
            </Link>
          </div>

          {!showSearchBar &&
            leftNav.map((item) => {
              return (
                <div className="top-nav-transition">
                  <Link
                    className={clsx("mr-10", {
                      "active-path": activePath === item.path,
                    })}
                    onClick={
                      item.isAuthRequired
                        ? (e) => handleLink(e, item)
                        : (e) => setDefaultAndNavigate(e, item)
                    }
                    to={item.path || "#"}
                    key={item.name}
                  >
                    {item.name}
                  </Link>
                </div>
              );
            })}

          {showSearchBar && (
            <div className="border mr-4 rounded">
              <SearchBar
                className="max-h-[40px]"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onSearch={submit}
              />
            </div>
          )}

          <span
            ref={setTriggerRef}
            className="material-symbols-outlined cursor-pointer"
          >
            apps
          </span>

          {visible && (
            <div
              ref={setTooltipRef}
              {...getTooltipProps({
                className: "tooltip-container rounded-lg",
              })}
            >
              <div className="full-nav-menu text-[#4B3A5A]">
                {Object.keys(appsMenus).map((key, ind) => {
                  return (
                    <div>
                      <h3 className="font-bold text-lg mb-5">{key}</h3>
                      <div
                        className={clsx({
                          "mr-[50px]":
                            ind + 1 !== Object.keys(appsMenus).length,
                        })}
                      >
                        {appsMenus[key].map((item, lindex) => {
                          return (
                            <Link
                              to=""
                              className={clsx("block", {
                                "mb-5": appsMenus[key].length !== lindex + 1,
                              })}
                            >
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center top-nav top-nav-transition">
          {rightNav.map((item) => {
            return (
              <Link
                className={clsx("mr-10", {
                  "active-path": activePath === item.path,
                })}
                onClick={
                  item.isAuthRequired
                    ? (e) => handleLink(e, item)
                    : (e) => setDefaultAndNavigate(e, item)
                }
                to={item.path || "#"}
                key={item.name}
              >
                {item.name}
              </Link>
            );
          })}

          {!isAuthenticated && (
            <button
              onClick={() => navigate("/login")}
              className="px-10 py-2 bg-[#189EFF] rounded text-white active:scale-105"
            >
              Login
            </button>
          )}

          {isAuthenticated && (
            // <button
            //   onClick={logout}
            //   className="px-10 py-2 border-[#189EFF] border rounded active:scale-105"
            // >
            //   Logout
            // </button>

            <Avatar />
          )}
        </div>
      </nav>
    );
  }
);
