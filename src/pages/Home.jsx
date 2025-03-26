import { useLoaderData, Await } from "react-router";
import { Suspense } from "react";

import Todos from "./../components/Todos";
import Loader from "../components/Loader";

const HomePage = () => {
  const { todos } = useLoaderData();

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Await resolve={todos}>
          {(loadedTodos) => <Todos todos={loadedTodos} />}
        </Await>
      </Suspense>
    </>
  );
};

export default HomePage;

const loadTodos = async () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const response = await fetch(`${baseUrl}/todos`);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not load todos!" }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.todos;
  }
};

export const loader = async () => {
  return {
    todos: loadTodos(),
  };
};
