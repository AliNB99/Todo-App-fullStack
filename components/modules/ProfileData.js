import { CgProfile } from "react-icons/cg";

function ProfileData({ user, setShowForm }) {
  const { name, lastName, email } = user;

  return (
    <div>
      <h1 className="text-blue-500 flex items-center gap-2 text-3xl font-semibold mb-10">
        <CgProfile />
        Profile
      </h1>
      <ul className="space-y-5">
        <li className="space-x-2">
          <span className="text-2xl font-semibold text-blue-500">Email:</span>
          <span className="text-xl font-semibold text-zinc-500">{email}</span>
        </li>
        <li className="space-x-2">
          <span className="text-2xl font-semibold text-blue-500">Name:</span>
          <span className="text-xl font-semibold text-zinc-500">{name}</span>
        </li>
        <li className="space-x-2">
          <span className="text-2xl font-semibold text-blue-500">
            Last Name:
          </span>
          <span className="text-xl font-semibold text-zinc-500">
            {lastName}
          </span>
        </li>
      </ul>
      <button
        onClick={() => setShowForm(true)}
        className="bg-orange-100 text-orange-600 px-4 py-1 mt-10 rounded-md text-xl"
      >
        Edit
      </button>
    </div>
  );
}

export default ProfileData;
