import connectDB from "@/utils/connectDB";
import SigninPage from "@templates/SigninPage";
import { getSession } from "next-auth/react";

function Signin() {
  return <SigninPage />;
}

export default Signin;

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
