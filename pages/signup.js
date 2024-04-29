import connectDB from "@/utils/connectDB";
import SignupPage from "@templates/SignupPage";
import { getSession } from "next-auth/react";

function Signup() {
  return <SignupPage />;
}

export default Signup;

export async function getServerSideProps(context) {
  try {
    await connectDB();
  } catch (error) {
    return {
      notFound: true,
    };
  }

  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
