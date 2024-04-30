import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";

import BeatLoader from "react-spinners/BeatLoader";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const signUpHandler = async () => {
    setIsLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      setIsLoading(false);
      toast.success(data.message);
      router.push("/signin");
    }
  };

  return (
    <div className="w-full h-auth flex items-center justify-center">
      <div className="bg-white flex flex-col gap-8 w-96 p-4 rounded-md shadow-lg">
        <h3 className="text-blue-600 text-2xl font-semibold py-2 text-center">
          SignUp Form
        </h3>
        <input
          className="p-2 border-2 border-blue-300 rounded-md"
          type="text"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 border-2 border-blue-300 rounded-md"
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isLoading ? (
          <div className="text-center">
            <BeatLoader size={14} color="#3693d6" />
          </div>
        ) : (
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={signUpHandler}
          >
            Register
          </button>
        )}
        <div className="flex items-center justify-center gap-1">
          <p className="text-zinc-500">Create an account?</p>
          <Link
            className="text-blue-500 hover:underline transition-all"
            href="/signin"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
