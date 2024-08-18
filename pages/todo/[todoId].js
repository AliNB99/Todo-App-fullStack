import connectDB from "@/utils/connectDB";
import { colorList } from "constants/statusColorList";
import UserTodo from "models/UserTodo";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { authOptions } from "pages/api/auth/[...nextauth]";
import React from "react";
import toast from "react-hot-toast";
import { LuListTodo } from "react-icons/lu";

function TodoDetail({ todo }) {
  const { title, status, description, _id } = todo;

  const router = useRouter();

  const deleteHandler = async () => {
    const loading = toast.loading("loading...");
    const res = await fetch(`/api/delete-todo/${_id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status === "failed") {
      toast.remove(loading);
      return toast.error(data.message);
    }
    router.replace("/");
    toast.remove(loading);
    return toast.success("deleted successful");
  };

  return (
    <div>
      <h1 className="flex items-center gap-2 text-2xl text-blue-600 font-semibold mb-10">
        <LuListTodo />
        Todo Detail
      </h1>
      <ul className="space-y-7 *:space-x-3">
        <li>
          <label className="text-xl font-semibold text-blue-500">Title:</label>
          <p className="bg-white w-96 font-semibold p-2 rounded-md mt-2 shadow-md">
            {title}
          </p>
        </li>
        <li>
          <label className="text-xl font-semibold text-blue-500">
            Description:
          </label>
          <p className="bg-white w-96 min-h-36 p-3 rounded-md mt-2 shadow-md text-justify">
            {description}
          </p>
        </li>
        <li>
          <label className="text-xl font-semibold text-blue-500">status:</label>
          <span
            className="inline-block text-xl font-semibold w-40 text-center py-1 rounded-md text-white"
            style={{ backgroundColor: colorList[status] }}
          >
            {status}
          </span>
        </li>
      </ul>
      <div className="mt-20 space-x-3">
        <Link
          href={`/edit-todo/${_id}`}
          className="bg-blue-200 text-blue-500 p-2 rounded-md"
        >
          Edit
        </Link>
        <button
          onClick={deleteHandler}
          className="bg-red-200 text-red-500 p-2 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoDetail;

export async function getServerSideProps(context) {
  const { todoId } = context.params;

  try {
    await connectDB();
  } catch (error) {
    return {
      notFound: true,
    };
  }
  const session = await getServerSession(context.req, context.res, authOptions);
  const user = await UserTodo.findOne({ email: session.user.email });
  const todo = user.todos.find((todo) => todo.id === todoId);

  if (!todo) {
    return {
      notFound: true,
    };
  }

  return {
    props: { todo: JSON.parse(JSON.stringify(todo)) },
  };
}
