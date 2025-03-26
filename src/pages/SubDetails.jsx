import { Await, useRouteLoaderData } from "react-router";
import SubTodoDetails from "./../components/SubTodoDetails";
import { Suspense } from "react";
import Loader from "../components/Loader";
import log from "../../Print";

const SubTodoDetailsPage = () => {
  const { subTodo } = useRouteLoaderData("subTodo-details");

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Await resolve={subTodo}>
          {(loadedSubTodo) => <SubTodoDetails subTodo={loadedSubTodo} />}
        </Await>
      </Suspense>
    </>
  );
};

export default SubTodoDetailsPage;

const loadSubTodo = async (todoId, subTodoId) => {
  const response = await fetch(
    `http://localhost:3000/todos/${todoId}/sub-todos/${subTodoId}`
  );

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not get Details of todo" }),
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.data;
  }
};

export const loader = async ({ params }) => {
  const { todoId, subTodoId } = params;
  // const subTodoId = params.subTodoId;

  return {
    subTodo: await loadSubTodo(todoId, subTodoId),
  };
};
