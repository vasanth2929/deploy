import React, { useMemo } from "react";
import { FaUser } from "react-icons/fa";
import { usePopperTooltip } from "react-popper-tooltip";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthenticated } from "../../../store/auth";
import { getUser, removeUser } from "../../../utils";

export const Avatar = () => {
  const user = useMemo(() => getUser(), []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = (e) => {
    e.preventDefault();
    dispatch(setAuthenticated(false));
    removeUser();
    navigate("/");
  };
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({
      trigger: "click",
      interactive: true,
    });
  return (
    <div>
      {user?.img ? (
        <img
          ref={setTriggerRef}
          src={user?.img}
          className="w-8 h-8 rounded-full border shadow-md cursor-pointer"
        />
      ) : (
        <div ref={setTriggerRef}>
          <FaUser className="text-2xl rounded-full border shadow-md cursor-pointer" />
        </div>
      )}

      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className:
              "bg-white z-10 flex flex-col shawdow-lg p-4 border rounded w-48",
          })}
        >
          <Link className="mb-4" to={"/my-profile"}>
            My Profile
          </Link>
          <Link className="mb-4" to="/upload">
            Upload
          </Link>
          <Link className="mb-4" to={"/my-uploads?tab=1"}>
            My uploads
          </Link>
          <Link className="mb-4" to={"/account-settings"}>
            Account Settings
          </Link>

          <Link onClick={logout} to={"#"}>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};
