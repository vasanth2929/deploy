import { Checkbox, Divider } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import clsx from "clsx";
import { isEmpty, isEqual } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Shared/Button";
import { Input } from "../../Components/Shared/Input";
import { AppLoader } from "../../Components/Shared/Loader";
import { Navbar } from "../../Components/Shared/Navbar";
import { getUserDetail, setUserDetail } from "../../services/user.services";
import { User } from "../../types/user.type";
import { excludeEmpty } from "../../utils";
import "./index.scss";

const Profile = () => {
  const [userData, setUserData] = useState<Partial<User>>({});
  const [mode, setMode] = useState<"view" | "edit">("view");
  const oldDataRef = useRef<Partial<User>>({});
  const navigate = useNavigate();
  const { data, isLoading, refetch, isRefetching } = useQuery(
    ["profile-me"],
    getUserDetail,
    {
      select: (d) => d.data,
    }
  );
  const editProfileBtn = () => {
    setMode("edit");
  };
  const submit = () => {
    setUserDetail({ ...userData })
      .then(() => {
        showNotification({
          message: "Profile updated successfully.",
          color: "green",
        });
        refetch();
        oldDataRef.current = userData;
        setMode("view");
      })
      .catch((e) => {
        const errors = e.response.data?.errors;
        const errorKeys = Object.keys(errors);
        let items = errorKeys.map((key, errInd) => {
          return (
            <div
              key={key}
              className={clsx({ "mb-2": errorKeys.length - 1 != errInd })}
            >
              <span className="text-red-800 capitalize">{key}</span>
              {errors[key]?.map((err, i) => {
                return <p key={key + i}>{err}</p>;
              })}
            </div>
          );
        });
        showNotification({
          message: <>{items}</>,
          color: "red",
          title: "Invalid inputs",
        });
      });
  };
  useEffect(() => {
    if (!isEmpty(data)) {
      setUserData(data);
      oldDataRef.current = data;
    }
  }, [data]);

  const isFormDisabled = () => {
    return isEqual(oldDataRef.current, userData);
  };

  const cancel = () => {
    setUserData(oldDataRef.current);
    setMode("view");
  };

  const {
    img = "",
    email = "",
    firstName = "",
    lastName = "",
    facebook = "",
    instagram = "",
    websiteUrl = "",
    twitter = "",
    isSubscribedToNewsletter,
    country = "",
    phone = "",
  } = userData;
  const disabled = mode === "view";
  const onFieldChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="profile-page">
      <Navbar />
      {isLoading || isRefetching ? (
        <AppLoader className="h-64" />
      ) : (
        <div className="w-max mx-auto  my-8">
          <div className="flex justify-between">
            <h3 className="text-xl font-medium">My Profile</h3>
            {mode == "view" ? (
              <Button
                onClick={editProfileBtn}
                text="Edit Profile"
                variant="outline"
              />
            ) : (
              <div className="flex gap-5">
                <Button
                  onClick={cancel}
                  color="secondary"
                  text="Cancel"
                  variant="outline"
                />
                <Button
                  onClick={submit}
                  disabled={isFormDisabled()}
                  text="Submit"
                />
              </div>
            )}
          </div>

          <img
            className="my-5 w-14 h-14 rounded-full border shadow-lg"
            src={img}
          />

          <form>
            <div className="flex">
              <div>
                <div className="flex gap-10 mb-5">
                  <Input
                    label="First name"
                    onChange={(e) => {
                      onFieldChange("firstName", e.target.value);
                    }}
                    value={firstName}
                    disabled={disabled}
                  />
                  <Input
                    label="Last name"
                    onChange={(e) => {
                      onFieldChange("lastName", e.target.value);
                    }}
                    value={lastName}
                    disabled={disabled}
                  />
                </div>

                <div className="flex gap-10 mb-5">
                  <Input
                    label="Email ID"
                    onChange={(e) => {
                      onFieldChange("email", e.target.value);
                    }}
                    value={email}
                    disabled={disabled}
                  />
                  <Input
                    label="Phone Number"
                    onChange={(e) => {
                      onFieldChange("phone", e.target.value);
                    }}
                    value={phone}
                    disabled={disabled}
                  />
                </div>

                <div className="flex gap-10 ">
                  <Input
                    label="Country"
                    disabled
                    onChange={() => {}}
                    value={country}
                  />
                  <Input
                    label="Portfolio/Website"
                    onChange={(e) => {
                      onFieldChange("websiteUrl", e.target.value);
                    }}
                    value={websiteUrl}
                    disabled={disabled}
                  />
                </div>
              </div>
              <div className="mx-10 h-auto w-[2px] bg-gray-100"></div>

              <div>
                <div className="mb-5">
                  <Input
                    label="Facebook"
                    onChange={(e) => {
                      onFieldChange("facebook", e.target.value);
                    }}
                    value={facebook}
                    disabled={disabled}
                  />
                </div>

                <div className="mb-5">
                  <Input
                    label="Twitter"
                    disabled={disabled}
                    onChange={(e) => {
                      onFieldChange("twitter", e.target.value);
                    }}
                    value={twitter}
                  />
                </div>
                <div>
                  <Input
                    label="Instagram"
                    onChange={(e) => {
                      onFieldChange("instagram", e.target.value);
                    }}
                    value={instagram}
                    disabled={disabled}
                  />
                </div>
              </div>
            </div>
            <div className="my-5">
              <Checkbox
                checked={isSubscribedToNewsletter}
                onChange={(e) =>
                  onFieldChange("isSubscribedToNewsletter", e.target.checked)
                }
                disabled={disabled}
                label="I’m open to receiving an email/newsletter from digilerz"
              />
            </div>
            <div className="flex gap-5">
              <Button
                color="secondary"
                text="Change Password"
                variant="outline"
                onClick={() => navigate("/change-password")}
              />

              <Button
                color="secondary"
                text="Delete Account"
                variant="outline"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
