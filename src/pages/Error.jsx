import MainNav from "../components/MainNav";
import PageContent from "../components/PageContent";
import { useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "An error occurred !";
  let message = "Something went wring !";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "404 Not Found";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <MainNav />
      <PageContent title={title}>
        <p style={{ color: "red" }}>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
