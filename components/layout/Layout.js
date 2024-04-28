// Icons
import { GoPlusCircle } from "react-icons/go";
import { GoTasklist } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

function Layout({ children }) {
  const { status } = useSession();

  return (
    <div>
      <header className="h-28 bg-blue-600">
        <div className="w-full flex justify-between py-2 px-3">
          <Link href="/" className="text-white font-semibold text-xl">
            FullStack Todo App
          </Link>
          {status === "authenticated" && (
            <button
              onClick={() => signOut()}
              className="text-white flex items-center gap-2 border px-2 py-1 rounded-md hover:bg-white hover:text-blue-600 transition-all"
            >
              <span>Logout</span>
              <MdLogout />
            </button>
          )}
        </div>
      </header>

      <div className="size-main">
        <aside className="bg-white relative bottom-14 h-screen w-52 rounded-r-3xl">
          <div className="p-5">
            <h3 className="font-semibold mb-6">Welcome👋</h3>
            <ul className="*:flex *:items-center *:gap-2 *:text-zinc-500 space-y-3">
              <li className="hover:text-zinc-800">
                <GoTasklist />
                <Link href="/">Todos</Link>
              </li>
              <li className="hover:text-zinc-800">
                <GoPlusCircle />
                <Link href="/add-todo">Add Todo</Link>
              </li>
              <li className="hover:text-zinc-800">
                <GoPerson />
                <Link href="/profile">Profile</Link>
              </li>
            </ul>
          </div>
        </aside>
        <section className="bg-blue-50 min-h-screen grow p-4 section">
          {children}
        </section>
      </div>
    </div>
  );
}

export default Layout;
