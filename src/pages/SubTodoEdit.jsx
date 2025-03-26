import { Await, useRouteLoaderData } from "react-router";
import TodoForm from "../components/TodoForm";
import { Suspense } from "react";
import Loader from "../components/Loader";

const SubTodoEditPage = () => {
  const {subTodo} = useRouteLoaderData("subTodo-details");

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Await resolve={subTodo}>
          {(loadedSubTodo) => <TodoForm type="subTodo" method="PATCH" todo={loadedSubTodo} />}
        </Await>
      </Suspense>
    </>
  );
};

export default SubTodoEditPage;
