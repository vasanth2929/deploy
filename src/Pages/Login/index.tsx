import { Button, Checkbox } from "@mantine/core";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../Components/Shared/Input";
import { login, loginByGoogle } from "../../services/user.services";
import { setAuthenticated } from "../../store/auth";
import { setUser } from "../../utils";
import { z } from "zod";
import { showNotification } from "@mantine/notifications";
import { GoogleLogin } from "@react-oauth/google";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(1, "password is required"),
});

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState(false);
  const [termsAndConditionChecked, setTermsAndConditionChecked] =
    useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setError] = useState({
    email: "",
    password: "",
    terms: "",
  });

  const submit = () => {
    let data = userSchema.safeParse({
      email,
      password,
    });
    if (data.success) {
      setError({ email: "", password: "", terms: "" });
      login({ username: email, password })
        .then((res) => {
          setUser(res.data, selected);
          dispatch(setAuthenticated(true));
          showNotification({
            message: "Login successful!",
            color: "green",
          });
          if (res.data?.role == "admin") {
            navigate("/dashboard");
            return;
          }
          navigate("/");
        })
        .catch(() => {
          showNotification({
            message: "Invalid credentials",
            color: "red",
          });
        });
    } else {
      const e: any = (data as any).error?.format();
      setError({
        email: e?.email?._errors[0] || "",
        password: e?.password?._errors[0] || "",
        terms: "Please accept T&C",
      });
    }
  };
  return (
    <div className="flex h-screen">
      <div className="flex h-full justify-center items-center flex-1">
        <div className="w-max">
          <h3 className="text-4xl font-bold mb-2">Sign In</h3>
          <p>Enter your email and password to sign in!</p>

          <div className="my-6">
            <Input
              value={email}
              label="Email"
              placholder="john@company.com"
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
              required
              error={errors.email}
            />
          </div>

          <div className="mb-6">
            <Input
              value={password}
              label="Password"
              placholder="john@company.com"
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
              type="password"
              required
              error={errors.password}
            />
          </div>

          {/* <div className="justify-between mb-6">
            <div className="flex">
              <Checkbox
                checked={termsAndConditionChecked}
                onChange={(e) => setTermsAndConditionChecked(e.target.checked)}
              />
              <span className="ml-2">
                I agree terms of use and privacy policy of{" "}
                <Link className="text-[#189EFF]" to="/terms">
                  Stocklerz
                </Link>
              </span>
            </div>
            {errors.terms && (
              <div className="mt-2 text-sm text-[#f03e3e]">{errors.terms}</div>
            )}
          </div> */}

          <div className="flex justify-between mb-6">
            <div className="flex">
              <Checkbox
                checked={selected}
                onChange={(e) => setSelected(e.target.checked)}
              />
              <span className="ml-2">Keep me logged in</span>
            </div>

            <div>
              <Link className="text-[#189EFF]" to="">
                Forget password?
              </Link>
            </div>
          </div>

          <Button
            variant="filled"
            fullWidth
            style={{ background: "#189EFF" }}
            onClick={submit}
            className="mb-5"
          >
            Sign In
          </Button>

          <div className="google-login-btn">
            <GoogleLogin
              size="large"
              width="410px"
              onSuccess={(v) => {
                loginByGoogle({ token: v.credential })
                  .then((res) => {
                    setUser(res.data, selected);
                    dispatch(setAuthenticated(true));
                    showNotification({
                      message: "Login successful!",
                      color: "green",
                    });
                    navigate("/");
                  })
                  .catch(() => {
                    showNotification({
                      message: "Invalid credentials",
                      color: "red",
                    });
                  });
              }}
              onError={() => {
                console.log("Erro");
              }}
            ></GoogleLogin>
          </div>
          <button
            onClick={() =>
              window.open(
                "http://localhost:3001/api/v1/user/login/facebook",
                "_self"
              )
            }
          >
            Facebook
          </button>
          <p className="mt-6">
            Not registered yet?{" "}
            <Link to="/signup" className="text-[#189EFF]">
              Create an account
            </Link>{" "}
          </p>
        </div>
      </div>
      <div className="flex-1">d</div>
    </div>
  );
};
