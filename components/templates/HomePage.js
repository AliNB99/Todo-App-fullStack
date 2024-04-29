import TaskCard from "@modules/TaskCard";
import React from "react";

function HomePage({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 *:bg-white *:min-h-44 *:rounded-md *:overflow-hidden">
      <div>
        <h1 className="bg-orange-300 text-center text-white p-1">Todo</h1>
        <TaskCard data={data.todo} next="inProgress" />
      </div>
      <div>
        <h1 className="bg-emerald-300 text-center text-white p-1">
          In Progress
        </h1>
        <TaskCard data={data.inProgress} next="review" back="todo" />
      </div>
      <div>
        <h1 className="bg-blue-600 text-center text-white p-1">Review</h1>
        <TaskCard data={data.review} next="done" back="inProgress" />
      </div>
      <div>
        <h1 className="bg-cyan-200 text-center text-white p-1">Done</h1>
        <TaskCard data={data.done} back="review" />
      </div>
    </div>
  );
}

export default HomePage;
