import { useContext } from "react";
import { useNavigate } from "react-router";

import ModalContext from "../store/ModalContext";

const DeleteModal = () => {
  const { closeModal, selectedTodo } = useContext(ModalContext);
  const { title, id, subTodoId } = selectedTodo;
  const navigate = useNavigate();

  let url = `http://192.168.1.3:3000/todos/${id}`;
  let resConfig = {
    method: "DELETE",
  };

  if (subTodoId) {
    url = `http://192.168.1.3:3000/todos/${id}/sub-todos/${subTodoId}`;
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
      if(subTodoId){
        navigate(`${id}`)
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
