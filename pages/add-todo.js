import AddTodoPage from "@templates/AddTodoPage";
import React from "react";
import { GrAddCircle } from "react-icons/gr";

function AddTodo() {
  return (
    <div>
      <h2 className="text-2xl mb-8 font-semibold flex items-center gap-2">
        <GrAddCircle />
        Add New Todo
      </h2>
      <AddTodoPage />
    </div>
  );
}

export default AddTodo;
