"use client";

import React, { useState, useEffect } from "react";
import { account } from "@/appwrite/appwrite"; // Import Appwrite account service
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import useCustomerStore from "@/store/store"; // Zustand store

const ProfilePage: React.FC = () => {
  const { userEmail, loggedInUser } = useCustomerStore(); // Access email and user from Zustand store
  const [email, setEmail] = useState<string>(userEmail || ""); // Initialize with the userEmail from store
  const [password, setPassword] = useState<string>(""); // New state for password
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false); // State to toggle password visibility
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch logged-in user data if not available in the Zustand store
        if (!loggedInUser) {
          const user = await account.get();
          setEmail(user?.email);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [loggedInUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Update email if it has changed

      await account.updateEmail(email,password);
      toast.success("Email and password updated successfully!");
    } catch (error: any) {
      toast.error("Failed to update profile: " + error.message);
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Update Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Update email */}
        <div>
          <label className="block text-sm font-medium mb-1">New Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded"
          />
        </div>

        {/* Update password */}
        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <Input
            type={passwordVisible ? "text" : "password"} // Toggle password visibility
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded"
          />
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={passwordVisible}
              onChange={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-sm">
              Show Password
            </label>
          </div>
        </div>

        <Button type="submit" className="mt-2" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
};

export default ProfilePage;
