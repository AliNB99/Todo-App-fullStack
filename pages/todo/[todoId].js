import connectDB from "@/utils/connectDB";
import { colorList } from "constants/statusColorList";
import Users from "models/Users";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import React from "react";

function TodoDetail({ todo }) {
  console.log(todo);
  const { title, status, description } = todo;
  return (
    <div>
      <h1 className="text-3xl text-blue-500 font-semibold mb-10">
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
          <p className="bg-white w-96 min-h-36 p-2 rounded-md mt-2 shadow-md">
            {description}
          </p>
        </li>
        <li>
          <label className="text-xl font-semibold text-blue-500">status:</label>
          <span
            className="inline-block w-40 text-center py-1 rounded-md text-white"
            style={{ backgroundColor: colorList[status] }}
          >
            {status}
          </span>
        </li>
      </ul>
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
  const user = await Users.findOne({ email: session.user.email });

  if (!user) {
    return {
      notFound: true,
    };
  }

  const todo = user.todos.find((todo) => todo.id === todoId);

  return {
    props: { todo: JSON.parse(JSON.stringify(todo)) },
  };
}
