import ProfileData from "@modules/ProfileData";
import ProfileForm from "@modules/ProfileForm";
import { useState } from "react";

function ProfilePage({ user }) {
  const [showForm, setShowForm] = useState(false);
  const { name, lastName } = user;

  if (!name || !lastName || showForm)
    return (
      <ProfileForm showForm={showForm} setShowForm={setShowForm} user={user} />
    );

  return <ProfileData user={user} setShowForm={setShowForm} />;
}

export default ProfilePage;
