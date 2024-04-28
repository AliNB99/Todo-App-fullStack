import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);

  const loginHandler = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res.error) router.push("/");
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
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={loginHandler}
        >
          Login
        </button>
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
