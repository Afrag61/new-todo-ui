import { Await, useLoaderData, useRouteLoaderData } from "react-router";
import TodoForm from "../components/TodoForm";
import { Suspense } from "react";
import Loader from "../components/Loader";

const EditPage = () => {
  const { todo } = useRouteLoaderData('todo-details');

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Await resolve={todo}>
          {(loadedTodo) => <TodoForm todo={loadedTodo} method="PATCH" />}
        </Await>
      </Suspense>
    </>
  );
};

export default EditPage;

const todoLoader = async (id) => {
  const response = await fetch(`http://192.168.1.3:3000/todos/${id}`);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not get Details of todo" }),
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.todo;
  }
}

export const loader = ({ params }) => {
  const id = params.todoId;

  return{
    todo: todoLoader(id)
  }
};
