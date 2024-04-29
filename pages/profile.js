import ProfilePage from "@templates/ProfilePage";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import Users from "models/Users";

function Profile({ user }) {
  return (
    <div>
      <ProfilePage user={user} />
    </div>
  );
}

export default Profile;
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const user = await Users.findOne({ email: session.user.email });

  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  };
}
