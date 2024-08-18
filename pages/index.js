import HomePage from "@templates/HomePage";
import connectDB from "@/utils/connectDB";
import { sortTodos } from "@/utils/sortTodos";
import UserTodo from "models/UserTodo";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

function Home({ data }) {
  return (
    <div>
      <HomePage data={data} />
    </div>
  );
}

export default Home;

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

  try {
    await connectDB();
  } catch (error) {
    return {
      notFound: true,
    };
  }

  const user = await UserTodo.findOne({ email: session.user.email });
  const sortedData = sortTodos(user.todos);

  return {
    props: { data: JSON.parse(JSON.stringify(sortedData)) },
  };
}
