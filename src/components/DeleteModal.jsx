import { useContext } from "react";
import { useNavigate, useParams } from "react-router";

import ModalContext from "../store/ModalContext";

const DeleteModal = () => {
  const { closeModal, selectedTodo } = useContext(ModalContext);
  const { title, todoId, subTodoId } = selectedTodo;
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  let url = `${baseUrl}/todos/${todoId}`;
  let resConfig = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (subTodoId) {
    url = `${baseUrl}/todos/${todoId}/sub-todos/${subTodoId}`;
  }

  const deleteTodo = async () => {
    const response = await fetch(url, resConfig);

    if (!response.ok) {
      throw new Response(
        JSON.stringify({ Message: "Could not Delete Todo!" }),
        { status: 500 }
      );
    }
  };

  const confirmDelete = (identifier) => {
    if (identifier === "yes") {
      deleteTodo();
      closeModal();
      if (subTodoId !== undefined) {
        navigate(`${todoId}`);
      }
      navigate(`/`);
    } else {
      closeModal();
    }
  };

  return (
    <div className="backdrop">
      <div className="modal">
        <p className="delete-text">Are you sure delete ?</p>
        <h1 className="todo-delete">{title}</h1>
        <div className="delete-confirm">
          <button className="delete-no" onClick={() => confirmDelete("no")}>
            No
          </button>
          <button className="delete-yes" onClick={() => confirmDelete("yes")}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
