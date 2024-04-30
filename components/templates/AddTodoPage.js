import { useState } from "react";
import { GoHourglass } from "react-icons/go";
import { LuListTodo } from "react-icons/lu";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import RadioButton from "@elements/RadioButton";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

function AddTodoPage({ type, todo }) {
  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [status, setStatus] = useState(todo?.status || "todo");

  const router = useRouter();

  const addHandler = async () => {
    const loading = toast.loading("loading...");
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title, status, description }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      setTitle("");
      setDescription("");
      setStatus("todo");
      toast.remove(loading);
      toast.success("add Todo!");
    } else {
      toast.remove(loading);
      toast.error(data.message);
    }
  };

  const EditHandler = async () => {
    const loading = toast.loading("loading...");
    const res = await fetch("/api/edit-todo", {
      method: "PATCH",
      body: JSON.stringify({ title, status, description, id: todo._id }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      setTitle("");
      setDescription("");
      setStatus("todo");
      toast.remove(loading);
      toast.success("Edit Todo Successful!");
      router.replace(`/todo/${todo._id}`);
    } else {
      toast.remove(loading);
      toast.error(data.message);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-8">
        <div className="flex flex-col gap-3">
          <input
            className="p-2 md:w-[32rem] rounded-md border-2 border-blue-300"
            id="title"
            type="text"
            placeholder="Enter your task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="p-2 md:w-[32rem] rounded-md border-2 border-blue-300"
            id="description"
            type="text"
            placeholder="Enter your description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="space-y-3">
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="todo"
            title="Todo"
          >
            <LuListTodo />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="inProgress"
            title="In Progress"
          >
            <GoHourglass />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="review"
            title="Review"
          >
            <AiOutlineFileSearch />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="done"
            title="Done"
          >
            <MdDoneAll />
          </RadioButton>
        </div>
        {type === "edit" ? (
          <button
            className="bg-zinc-400 hover:bg-zinc-500 transition-all w-24 text-white p-2 rounded-md"
            onClick={EditHandler}
          >
            Edit
          </button>
        ) : (
          <button
            className="bg-zinc-400 hover:bg-zinc-500 transition-all w-24 text-white p-2 rounded-md"
            onClick={addHandler}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}

export default AddTodoPage;
