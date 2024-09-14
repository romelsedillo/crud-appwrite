"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Client, Account } from "appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const PasswordReset: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  const handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      setMessage("Passwords do not match.");
      return;
    }

    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
      .setProject(process.env.NEXT_PUBLIC_PROJECT_ID as string);

    const account = new Account(client);

    try {
      if (userId && secret) {
        await account.updateRecovery(userId, secret, password);
        setMessage(
          "Password successfully reset! You can now log in with your new password."
        );
        setPasswordMismatch(false);
      } else {
        setMessage("Invalid link. Please try again.");
      }
    } catch (error) {
      console.error("Password reset error:", error); // Log the error for debugging
      setMessage("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Reset Your Password</h2>
        <p className="text-center mt-2 mb-6">
          Please enter your new password below.
        </p>
        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              New Password
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm outline-none"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Confirm Password
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm outline-none ${
                passwordMismatch ? "border-red-500" : ""
              }`}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordMismatch(false);
              }}
              required
            />
            {passwordMismatch && (
              <p className="text-red-500 text-sm mt-2">
                Passwords do not match.
              </p>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              className="mr-2"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword" className="text-sm font-medium">
              Show Password
            </label>
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4 font-semibold rounded-md transition duration-200"
          >
            Reset Password
          </Button>
        </form>
        {message && <p className="text-center mt-4 text-red-500">{message}</p>}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm hover:underline">
            Back to <span className="font-medium">Login.</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
