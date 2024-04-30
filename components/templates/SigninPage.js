import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";

import BeatLoader from "react-spinners/BeatLoader";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const loginHandler = async () => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(res);
    if (res.error) {
      setIsLoading(false);
      return toast.error(res.error);
    }
    router.push("/");
    setIsLoading(false);
    toast.success("login successful");
  };

  return (
    <div className="w-full h-auth flex items-center justify-center">
      <div className="bg-white flex flex-col gap-8 w-96 p-4 rounded-md shadow-lg">
        <h3 className="text-blue-600 text-2xl font-semibold py-2 text-center">
          Login Form
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
            onClick={loginHandler}
          >
            Login
          </button>
        )}
        <div className="flex items-center justify-center gap-1">
          <p className="text-zinc-500">Create an account?</p>
          <Link
            className="text-blue-500 hover:underline transition-all"
            href="/signup"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
