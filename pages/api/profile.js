import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import Users from "models/Users";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
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

  const user = await Users.findOne({ email: session.user.email });
  console.log(user);
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exist!" });
  }

  const { name, lastName, password } = req.body;

  if (!name || !lastName || !password) {
    return res.status(422).json({ stats: "failed", message: "data Invalid" });
  }

  if (req.method === "POST") {
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(422).json({
        status: "failed",
        message: "password is incorrect!",
      });
    }

    user.name = name;
    user.lastName = lastName;
    user.save();

    res.status(200).json({
      status: "success",
      message: "Add information successful",
      data: { name, lastName, email: session.user.email },
    });
  } else if (req.method === "PATCH") {
    user.name = name;
    user.lastName = lastName;
    user.save();
    res
      .status(200)
      .json({ status: "success", message: "Edit information successful" });
  }
}
