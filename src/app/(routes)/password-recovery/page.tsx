"use client";
import React, { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Client, Account } from "appwrite";
import Link from "next/link";

const PasswordRecovery: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRecovery = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const client = new Client();
    client
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
      .setProject(process.env.NEXT_PUBLIC_PROJECT_ID as string);

    const account = new Account(client);
    try {
      await account.createRecovery(
        email,
        "http://localhost:3000/password-reset"
      );
      setMessage("Password recovery email sent! Please check your inbox.");
    } catch (error: any) {
      setMessage("Failed to send recovery email. Please try again.");
      console.error(error.message);
      console.error(error.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">
          Forgot Your Password?
        </h2>
        <p className=" text-center mt-2 mb-6">
          Enter your email address below and we&apos;ll send you a link to reset
          your password.
        </p>
        <form onSubmit={handleRecovery}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <Input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm outline-none focus:ring-2 "
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4 font-semibold rounded-md transition duration-200"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
        {message && <p className="text-center mt-4">{message}</p>}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm hover:underline">
            Back to <span className=" font-medium">Login.</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
