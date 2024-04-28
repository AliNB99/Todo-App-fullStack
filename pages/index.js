import HomePage from "@templates/HomePage";
import connectDB from "@/utils/connectDB";
import { sortTodos } from "@/utils/sortTodos";
import Users from "models/Users";
import { getSession } from "next-auth/react";

function Home({ data }) {
  return (
    <div>
      <HomePage data={data} />
    </div>
  );
}

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  console.log(session);

  try {
    await connectDB();
  } catch (error) {
    return {
      notFound: true,
    };
  }

  const user = await Users.findOne({ email: session.user.email });
  const sortedData = sortTodos(user.todos);

  return {
    props: { data: JSON.parse(JSON.stringify(sortedData)) },
  };
}
