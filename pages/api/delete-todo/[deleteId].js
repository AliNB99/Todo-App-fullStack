import connectDB from "@/utils/connectDB";
import UserTodo from "models/UserTodo";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const { deleteId } = req.query;
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "error in connection DB" });
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

  const todoIndex = user.todos.findIndex((todo) => todo.id === deleteId);

  user.todos.splice(todoIndex, 1);
  user.save();

  res.status(200).json({ status: "success", message: "delete todo" });
}
