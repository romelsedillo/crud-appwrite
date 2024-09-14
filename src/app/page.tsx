import React from "react";
import LoginForm from "@/components/layout/loginform";
import Navbar from "@/components/layout/navbar";

export default function HomePage(): JSX.Element {
  return (
    <section className="mx-auto">
      <Navbar />
      <div className="max-w-xs mx-auto p-6 rounded-md shadow-2xl border">
        <LoginForm />
      </div>
    </section>
  );
}
