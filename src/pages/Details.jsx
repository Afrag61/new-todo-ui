import { Await, useRouteLoaderData } from "react-router";
import TodoDetails from "../components/TodoDetails";
import Loader from "../components/Loader";
import { Suspense } from "react";

const DetailsPage = () => {
  const { todo } = useRouteLoaderData("todo-details");

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Await resolve={todo}>
          {(loadedTodo) => <TodoDetails todo={loadedTodo} />}
        </Await>
      </Suspense>
    </>
  );
};

export default DetailsPage;

const todoLoader = async (todoId) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const response = await fetch(`${baseUrl}/todos/${todoId}`);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not get Details of todo" }),
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.todo;
  }
};

export const loader = ({ params }) => {
  const { todoId } = params;
  return {
    todo: todoLoader(todoId),
  };
};
