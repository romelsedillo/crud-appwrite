"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { account, ID, OAuthProvider } from "@/appwrite/appwrite";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { toast } from "react-hot-toast"; // Added toast for better feedback
import { ReloadIcon } from "@radix-ui/react-icons";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [registering, setRegistering] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const checkUserSession = async () => {
      try {
        const user = await account.get();
        setLoggedInUser(user);
        router.push("/tables"); // Redirect if already logged in
      } catch (error) {
        console.log("No active session found.");
      } finally {
        setLoading(false);
      }
    };
    checkUserSession();
  }, [router]);

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegistering(true);
    try {
      await account.create(ID.unique(), email, password, name);
      router.push("/tables");
      toast.success("Registration successful!"); // Feedback for success
    } catch (error: any) {
      toast.error("Registration failed: " + error.message);
    } finally {
      setRegistering(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await account.createOAuth2Session(
        OAuthProvider.Google,
        "http://localhost:3000/tables",
        "http://localhost:3000"
      );
      toast.success("Google login successful!");
    } catch (error: any) {
      toast.error(`Google login failed: ${error.message}`);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      await account.createOAuth2Session(
        OAuthProvider.Github,
        "http://localhost:3000/tables",
        "http://localhost:3000"
      );
      toast.success("GitHub login successful!");
    } catch (error: any) {
      toast.error(`GitHub login failed: ${error.message}`);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-semi mb-4 text-center">Sign up</h2>
      <form
        onSubmit={register}
        className="max-w-xs mx-auto flex flex-col items-center gap-2"
      >
        <div className="w-full flex flex-col items-start gap-2">
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            type="text"
            className="border border-slate-500 rounded outline-none focus-visible:ring-0"
          />
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            type="text"
            className="border border-slate-500 rounded outline-none focus-visible:ring-0"
          />
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <Input
            placeholder="Password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-slate-500 rounded outline-none focus-visible:ring-0"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              className="mr-2"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)} // Toggle password visibility
            />
            <label htmlFor="showPassword" className="text-xs">
              Show Password
            </label>
          </div>
        </div>
        <div className="flex flex-col items-start w-full">
          <Button type="submit" className="w-full py-1 rounded font-thin">
            {registering ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Sign up"
            )}
          </Button>
        </div>
      </form>

      <div className="max-w-xs flex items-center gap-2 py-4 mx-auto">
        <hr className="border flex-grow" />
        <p className="text-xs">Or continue with</p>
        <hr className="border flex-grow" />
      </div>
      <div className="flex flex-col items-center mx-auto gap-2">
        <Button onClick={handleGoogleLogin} className="w-full">
          Google
          <FcGoogle className="ml-2" />
        </Button>
        <Button onClick={handleGitHubLogin} className="w-full">
          GitHub
          <FaGithub className="ml-2" />
        </Button>
      </div>

      <div className="mx-auto max-w-xs mt-4">
        <p className="text-xs">
          Already have an account?{" "}
          <Link href="/" className="font-medium underline">
            Sign in.
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
