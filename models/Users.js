import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  lastName: String,
  description: String,
  todos: [{ title: String, status: String }],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updateAt: { type: Date, default: () => Date.now() },
});

const Users = models.Users || model("Users", userSchema);

export default Users;
