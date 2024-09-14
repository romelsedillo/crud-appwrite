

import RegisterForm from "@/components/layout/registerform";

import Navbar from "@/components/layout/navbar";

export default function RegisterPage() {
  

 

  return (
    <section className="mx-auto">
      <Navbar />
      <div className="max-w-xs mx-auto p-6 rounded-md shadow-xl border">
        <RegisterForm />
      </div>
    </section>
  );
}
