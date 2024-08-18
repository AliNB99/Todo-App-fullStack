import connectDB from "@/utils/connectDB";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import UserTodo from "models/UserTodo";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "error in connectionDB" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }

  const user = await UserTodo.findOne({ email: session.user.email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exist!" });
  }

  const { title, status, description, id } = req.body;
  const todo = user.todos.find((todo) => todo.id === id);
  todo.title = title;
  todo.status = status;
  todo.description = description;
  user.save();

  return res
    .status(200)
    .json({ status: "success", Todo: { title, status, description } });
}
