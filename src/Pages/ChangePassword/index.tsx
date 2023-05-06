import { Checkbox, Divider, PasswordInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Shared/Button";
import { Input } from "../../Components/Shared/Input";
import { AppLoader } from "../../Components/Shared/Loader";
import { Navbar } from "../../Components/Shared/Navbar";
import { changePassword } from "../../services/user.services";
import { setAuthenticated } from "../../store/auth";
import { removeUser } from "../../utils";
import "./index.scss";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { confirmNewPassword, newPassword, password } = data;
  const submit = () => {
    changePassword({ password, newPassword, confirmNewPassword })
      .then(() => {
        showNotification({ message: "Success", color: "green" });
        dispatch(setAuthenticated(false));
        removeUser();
        navigate("/");
      })
      .catch(() => {
        showNotification({ message: "Invalid ops", color: "red" });
      });
  };

  const isDisabled = () => {
    return (
      isEmpty(password) ||
      isEmpty(newPassword) ||
      isEmpty(confirmNewPassword) ||
      confirmNewPassword !== newPassword
    );
  };

  const onFieldChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  return (
    <div className="change-password-page">
      <Navbar />
      {false ? (
        <AppLoader className="h-64" />
      ) : (
        <div className="w-max my-8 mx-24">
          <div className="flex justify-between">
            <h3 className="text-xl font-medium">Change Your Password</h3>
          </div>

          <form>
            <div className="mt-5">
              <div className="mb-5">
                <PasswordInput
                  label="Current password"
                  onChange={(e) => {
                    onFieldChange("password", e.target.value);
                  }}
                  value={password}
                />
              </div>

              <div className="mb-5">
                <PasswordInput
                  label="New password"
                  onChange={(e) => {
                    onFieldChange("newPassword", e.target.value);
                  }}
                  value={newPassword}
                />
              </div>
              <div>
                <PasswordInput
                  label="Confirm new password"
                  onChange={(e) => {
                    onFieldChange("confirmNewPassword", e.target.value);
                  }}
                  value={confirmNewPassword}
                />
              </div>
            </div>

            <div className="flex gap-5 mt-5">
              <Button
                onClick={submit}
                disabled={isDisabled()}
                color="primary"
                text="Submit"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
