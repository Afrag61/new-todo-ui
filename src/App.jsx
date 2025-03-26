import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";

import { ModalContextProvider } from "./store/ModalContext";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import ErrorPage from "./pages/Error";

import LoginPage, { SignupPage } from "./pages/Authenticate";
import Loader from "./components/Loader";

// const ModalContextProvider = () =>
//   import("./store/ModalContext").then((module) => module.ModalContextProvider);

const NewTodoPage = lazy(() => import("./pages/NewTodo"));
const DetailsPage = lazy(() => import("./pages/Details"));
const EditPage = lazy(() => import("./pages/Edit"));
const NewSubTodoPage = lazy(() => import("./pages/NewSubTodo"));
const SubTodoDetailsPage = lazy(() => import("./pages/SubDetails"));
const SubTodoEditPage = lazy(() => import("./pages/SubTodoEdit"));

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <HomePage />,
          loader: (meta) =>
            import("./pages/Home").then(({ loader }) => loader(meta)),
        },
        {
          path: "new",
          element: (
            <Suspense fallback={<Loader />}>
              <NewTodoPage />
            </Suspense>
          ),
          action: (meta) =>
            import("./components/TodoForm").then((module) =>
              module.todoAction(meta)
            ),
        },
        {
          path: ":todoId",
          id: "todo-details",
          loader: (meta) =>
            import("./pages/Details").then((module) => module.loader(meta)),
          children: [
            {
              path: "",
              element: (
                <Suspense fallback={<Loader />}>
                  <DetailsPage />
                </Suspense>
              ),
            },
            {
              path: "edit",
              element: (
                <Suspense fallback={<Loader />}>
                  <EditPage />
                </Suspense>
              ),
              action: (meta) =>
                import("./components/TodoForm").then((module) =>
                  module.todoAction(meta)
                ),
            },
            {
              path: "new",
              element: (
                <Suspense fallback={<Loader />}>
                  <NewSubTodoPage />
                </Suspense>
              ),
              action: (meta) =>
                import("./components/TodoForm").then((module) =>
                  module.subTodoAction(meta)
                ),
            },
            {
              path: ":subTodoId",
              id: "subTodo-details",
              loader: (meta) =>
                import("./pages/SubDetails").then((module) =>
                  module.loader(meta)
                ),
              children: [
                {
                  path: "",
                  element: (
                    <Suspense fallback={<Loader />}>
                      <SubTodoDetailsPage />
                    </Suspense>
                  ),
                },
                {
                  path: "edit",
                  element: (
                    <Suspense fallback={<Loader />}>
                      <SubTodoEditPage />
                    </Suspense>
                  ),
                  action: (meta) =>
                    import("./components/TodoForm").then((module) =>
                      module.subTodoAction(meta)
                    ),
                },
              ],
            },
          ],
        },
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignupPage /> },
      ],
    },
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <ModalContextProvider>
        <RouterProvider router={router} />
      </ModalContextProvider>
    </Suspense>
  );
};

export default App;
