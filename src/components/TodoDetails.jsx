import { useNavigate } from "react-router";
import { useContext } from "react";

import SubTodos from "./SubTodos";
import nonCheckedIco from "./../assets/noneCheck.svg";
import checkedIco from "./../assets/checked.svg";
import ModalContext from "../store/ModalContext";

const TodoDetails = ({ todo }) => {
  const {
    title,
    description,
    isChecked,
    createdOn,
    dueDateTime,
    subTodos,
    history,
    id,
  } = todo;

  const { openModal, modalIsVisible } = useContext(ModalContext);

  const navigate = useNavigate();

  const checkTodo = async () => {
    const response = await fetch(
      `http://192.168.1.3:3000/todos/${id}/toggle-check`,
      {
        method: "PATCH",
      }
    );

    if (!response.ok) {
      throw new Response(JSON.stringify({ message: "Could not check todo!" }), {
        status: 500,
      });
    } else {
      return navigate();
    }
  };

  const handleCheckTodo = () => {
    checkTodo();
  };

  const handleDelete = () => {
    openModal(id, title);
  };

  const handleNavigateToEdit = () => {
    navigate(`edit`);
  };

  return (
    <>
      <div
        className="details-container"
        style={{ backdropFilter: modalIsVisible ? "none" : "blur(50px)" }}
      >
        <h1>Details of {title}</h1>
        <div className="details-item">
          <h3>Description: </h3>
          <span>{description}</span>
        </div>
        <div className="details-item">
          <h3>Completed: </h3>
          {isChecked ? "Yes" : "No"}
        </div>
        <div className="details-item">
          <h3>Created On: </h3>
          {createdOn}
        </div>
        <div className="details-item">
          <h3>Due Date: </h3>
          {dueDateTime}
        </div>
        <div className="details-buttons">
          <div className="check-container">
            <button className="check-button" onClick={handleCheckTodo}>
              <img src={isChecked ? checkedIco : nonCheckedIco} alt="Check" />
            </button>
          </div>
          <div className="control-details">
            <button className="delete" onClick={handleDelete}>
              Delete
            </button>
            <button onClick={handleNavigateToEdit} className="edit">
              Edit
            </button>
          </div>
        </div>
      </div>
      <SubTodos todoTitle={title} subTodos={subTodos} />
      {/* <History todoTitle={title} history={history}/> */}
    </>
  );
};

export default TodoDetails;
