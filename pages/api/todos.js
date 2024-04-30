import connectDB from "@/utils/connectDB";
import Users from "models/Users";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }

  const user = await Users.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exsit!" });
  }

  if (req.method === "POST") {
    const { title, status, description } = req.body;
    if (!title || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invaild data!" });
    }
    console.log({ title, status, description });

    user.todos.push({ title, status, description });
    user.save();

    res.status(201).json({ status: "success", message: "Todo created!" });
  } else if (req.method === "PATCH") {
    const { id, status } = req.body;

    if (!id || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data!" });
    }

    const result = await Users.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status } }
    );
    console.log(result);
    res.status(200).json({ status: "success" });
  }
}

export default handler;
