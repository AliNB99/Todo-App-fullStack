import { RiMastodonLine } from "react-icons/ri";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { colorList } from "constants/statusColorList";
import { useRouter } from "next/router";

function TaskCard({ data, next, back }) {
  const router = useRouter();

  const changeStatus = async (id, status) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      router.replace(router.asPath);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-3">
      {!data?.length && (
        <h1 className="text-zinc-400 font-semibold text-2xl text-center mt-10">
          Empty
        </h1>
      )}
      {data?.map((i) => (
        <div className="shadow-normal p-4 space-y-8" key={i._id}>
          <div
            style={{ backgroundColor: colorList[i.status] }}
            className="h-0.5 w-1/2"
          ></div>
          <div>
            <RiMastodonLine />
            <h4 className="font-semibold">{i.title}</h4>
          </div>
          <div className="flex items-center justify-between">
            {back ? (
              <button
                className="bg-orange-100 text-orange-600 flex items-center gap-1 px-2 py-1 rounded-md"
                onClick={() => changeStatus(i._id, back)}
              >
                <BiLeftArrow />
                Back
              </button>
            ) : null}
            {next ? (
              <button
                className="bg-green-100 text-green-600 flex items-center gap-1 px-2 py-1 rounded-md"
                onClick={() => changeStatus(i._id, next)}
              >
                Next
                <BiRightArrow />
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskCard;
