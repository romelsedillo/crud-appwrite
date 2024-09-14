"use client";
import { useState, useEffect } from "react";
import { account } from "@/appwrite/appwrite";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { OAuthProvider } from "appwrite";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>(""); // Assuming name is for future use
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    const checkUserSession = async () => {
      setLoading(true);
      try {
        const user = await account.get();
        setLoggedInUser(user);
        router.push("/tables");
      } catch (error) {
        console.log("No active session found.");
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, [router]);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
     const session = await account.createEmailPasswordSession(email, password);
     console.log(session);
      const user = await account.get();
      setLoggedInUser(user);
      router.push("/tables");
      toast.success("Successfully logged in!");
    } catch (error: any) {
      toast.error("Login failed: " + error.message);
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      console.log("Starting Google login process...");
     const session =  await account.createOAuth2Session(
        OAuthProvider.Google,

        "http://localhost:3000/tables",
        "http://localhost:3000"

        // process.env.NEXT_PUBLIC_OAUTH_SUCCESS_REDIRECT_URL as string,
        // process.env.NEXT_PUBLIC_OAUTH_FAILURE_REDIRECT_URL as string
      );
      console.log(session)
      toast.success("Successfully logged in!");
    } catch (error: any) {
      console.error("Error during Google login:", error);
      toast.error(`Error during Google login: ${error.message}`);
    }
  };

  const handleGitHubLogin = async (): Promise<void> => {
    try {
      await account.createOAuth2Session(
        OAuthProvider.Github,

        "http://localhost:3000/tables",
        "http://localhost:3000"
        // process.env.NEXT_PUBLIC_OAUTH_SUCCESS_REDIRECT_URL as string,
        // process.env.NEXT_PUBLIC_OAUTH_FAILURE_REDIRECT_URL as string
      );
      toast.success("Successfully logged in!");
    } catch (error: any) {
      console.error("Error during GitHub login:", error);
      toast.error(`Error during GitHub login: ${error.message}`);
    }
  };

  return (
    <>
      <h2 className="text-3xl mb-4 text-center ">Sign In</h2>
      <form
        onSubmit={login}
        className="bg-background text-foreground max-w-xs mx-auto flex flex-col gap-2"
        autoComplete="on"
      >
        <Input
          name="email"
          className="border border-slate-500 rounded outline-none focus-visible:ring-0"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
        <Button className="px-4 py-2 rounded" type="submit">
          Sign in
        </Button>
      </form>
      <div className="max-w-xs flex items-center justify-end py-2 mx-auto text-xs">
        <div>
          <Link
            href={"/password-recovery"}
            className="hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <div className="max-w-xs flex items-center gap-2 py-2 mx-auto">
        <hr className="border flex-grow" />
        <p className="text-xs">Or continue with</p>
        <hr className="border flex-grow" />
      </div>
      <div className="max-w-xs flex flex-col items-center mx-auto py-2 gap-2">
        <Button onClick={handleGoogleLogin} className="w-full">
          Google
          <FcGoogle className="ml-2" />
        </Button>
        <Button onClick={handleGitHubLogin} className="w-full">
          GitHub
          <FaGithub className="ml-2" />
        </Button>
      </div>
      <div className="mx-auto max-w-xs mt-8">
        <p className="text-xs">
          Don&apos;t have an account?{" "}
          <Link href={"/register"} className="font-medium hover:underline">
            Sign up here.
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
