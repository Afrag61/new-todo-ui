import { Outlet, redirect, useNavigate } from "react-router";
import { lazy, Suspense, useContext, useEffect } from "react";

import ModalContext from "../store/ModalContext";
import MainNav from "../components/MainNav";
import Loader from "../components/Loader";
// import DeleteModal from "../components/DeleteModal";

const DeleteModal = lazy(() => import("./../components/DeleteModal"));

const RootLayout = () => {
  const { modalIsVisible } = useContext(ModalContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   if (!token) {
  //     navigate("login");
  //   }
  // }, [token]);

  return (
    <>
      {/* {token && ( */}
      <>
        <MainNav />
        {modalIsVisible && (
          <Suspense fallback={<Loader />}>
            <DeleteModal />
          </Suspense>
        )}
      </>
      {/* )} */}
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
