import connectDB from "@/utils/connectDB";
import AddTodoPage from "@templates/AddTodoPage";
import Users from "models/Users";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import React from "react";
import { FaRegEdit } from "react-icons/fa";

function EditTodo({ todo }) {
  return (
    <div>
      <h2 className="text-2xl mb-8 font-semibold flex items-center gap-2">
        <FaRegEdit />
        Edit Todo
      </h2>
      <AddTodoPage todo={todo} type="edit" />
    </div>
  );
}

export default EditTodo;
export async function getServerSideProps(context) {
  try {
    await connectDB();
  } catch (error) {
    return {
      notFound: true,
    };
  }
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      notFound: true,
    };
  }
  const { todoId } = context.params;
  const user = await Users.findOne({ email: session.user.email });
  const todo = user.todos.find((todo) => todo.id === todoId);

  return {
    props: { todo: JSON.parse(JSON.stringify(todo)) },
  };
}
