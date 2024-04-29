import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";

function ProfileForm({ showForm, setShowForm, user }) {
  const { name, lastName } = user;

  const router = useRouter();

  const [form, setForm] = useState({
    name: name || "",
    lastName: lastName || "",
    password: "",
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [name]: value }));
  };

  const addHandler = async () => {
    const loading = toast.loading("loading...");
    const res = await fetch("api/profile", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      toast.remove(loading);
      toast.success(data.message);
      setForm({
        name: "",
        lastName: "",
        password: "",
      });
    } else {
      toast.remove(loading);
      toast.error(data.message);
    }
  };

  const editHandler = async () => {
    const loading = toast.loading("loading...");
    const res = await fetch("api/profile", {
      method: "PATCH",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      toast.remove(loading);
      toast.success(data.message);
      setForm({
        name: "",
        lastName: "",
        password: "",
      });
      setShowForm(false);
      router.replace(router.asPath);
    } else {
      toast.remove(loading);
      toast.error(data.message);
    }
  };

  return (
    <div>
      <h1 className="text-blue-500 flex items-center gap-2 text-3xl font-semibold mb-10">
        <CgProfile />
        Profile
      </h1>
      <div className="flex flex-col gap-6 w-96">
        <input
          className="p-2 rounded-md border-2 border-blue-300"
          type="text"
          placeholder="name"
          name="name"
          value={form.name}
          onChange={changeHandler}
        />
        <input
          className="p-2 rounded-md border-2 border-blue-300"
          type="text"
          placeholder="lastName"
          name="lastName"
          value={form.lastName}
          onChange={changeHandler}
        />
        <input
          className="p-2 rounded-md border-2 border-blue-300"
          type="text"
          placeholder="password"
          name="password"
          value={form.password}
          onChange={changeHandler}
        />
        {showForm ? (
          <div className="space-x-2">
            <button
              onClick={editHandler}
              className="bg-orange-400 p-2 w-32 text-white rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-red-400 p-2 w-22 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={addHandler}
            className="bg-blue-500 p-2 w-32 text-white rounded-md"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileForm;
