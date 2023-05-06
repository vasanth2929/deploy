import { Button, Checkbox } from "@mantine/core";
import { isArray, isEmpty } from "lodash";
import React, { useState } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../Components/Shared/Input";
import { register } from "../../services/user.services";
import { showNotification } from "@mantine/notifications";
const user = z.object({
  username: z
    .string()
    .trim()
    .min(3, "username must contain at least 3 character(s)")
    .max(16, "username must contain at most 16 character(s)"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "password must contain at least 8 character(s)")
    .max(16, "password must contain at most 16 character(s)"),
});
export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUSername] = useState("");
  const navigate = useNavigate();
  const [termsAndConditionChecked, setTermsAndConditionChecked] =
    useState(false);
  const [errors, setError] = useState({
    email: "",
    password: "",
    username: "",
    terms: "",
  });

  const submit = () => {
    const data = user.safeParse({ email, password, username });
    if (data.success && termsAndConditionChecked) {
      setError({ username: "", email: "", password: "", terms: "" });
      register({
        email,
        password,
        username,
        termsAndConditionsAccepted: termsAndConditionChecked,
      })
        .then((res) => {
          showNotification({
            message: "signup successfull!",
            color: "green",
          });
          navigate("/login");
        })
        .catch(() => {
          showNotification({
            message: "username or email already exists.",
            color: "red",
          });
        });
    } else {
      const e: any = (data as any).error.format();
      setError({
        email: e.email?._errors[0] || "",
        password: e.password?._errors[0] || "",
        username: e.username?._errors[0] || "",
        terms: termsAndConditionChecked ? "" : "Please accept T&C",
      });
    }
  };
  return (
    <div className="flex h-screen">
      <div className="flex h-full justify-center items-center flex-1">
        <div className="w-max">
          <h3 className="text-4xl font-bold mb-2">Sign In</h3>
          <p>Enter your details to signup!</p>

          <div className="mt-6">
            <Input
              value={username}
              label="Username"
              placholder="john"
              onChange={(e: any) => {
                setUSername(e.target.value);
              }}
              required
              error={errors.username}
            />
          </div>

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
          <div className="justify-between mb-6">
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
          </div>

          <Button
            variant="filled"
            fullWidth
            style={{ background: "#189EFF" }}
            onClick={submit}
          >
            Sign Up
          </Button>

          <p className="mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#189EFF]">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
      <div className="flex-1">d</div>
    </div>
  );
};
