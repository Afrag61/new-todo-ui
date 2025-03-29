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
  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  if (token) {
    const response = await fetch(`${baseUrl}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Response(JSON.stringify({ message: "Could not load todos!" }), {
        status: 500,
      });
    } else {
      const resData = await response.json();
      const { status, length, data } = resData;
      return data;
    }
  }
};

export const loader = async () => {
  return {
    todos: loadTodos(),
  };
};
