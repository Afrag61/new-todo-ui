import { useRouteLoaderData, useParams, useNavigate, Link } from "react-router";
import { useContext } from "react";

import ModalContext from "../store/ModalContext";

import nonCheckedIco from "./../assets/noneCheck.svg";
import checkedIco from "./../assets/checked.svg";
import log from "../../Print";

const SubTodoDetails = ({ subTodo }) => {
  log(subTodo);
  const { title, description, dueDateTime, createdOn, isChecked, id } = subTodo;
  const todoId = useParams().todoId;
  const navigate = useNavigate();

  const { modalIsVisible, openModal } = useContext(ModalContext);

  const checkSubTodo = async () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    const response = await fetch(
      `${baseUrl}/todos/${todoId}/sub-todos/${id}/toggle-check`,
      {
        method: "PATCH",
      }
    );

    if (!response.ok) {
      throw new Response(
        JSON.stringify({ message: "Could not check SubTodo!" }),
        {
          status: 500,
        }
      );
    } else {
      return navigate();
    }
  };

  const handleCheckSubTodo = () => {
    checkSubTodo();
  };

  const handleDelete = () => {
    openModal(todoId, title, id);
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
            <button className="check-button" onClick={handleCheckSubTodo}>
              <img src={isChecked ? checkedIco : nonCheckedIco} alt="Check" />
            </button>
          </div>
          <div className="control-details">
            <Link className="back-button" relative="path" to="..">
              Back
            </Link>
            <button className="delete" onClick={handleDelete}>
              Delete
            </button>
            <button onClick={handleNavigateToEdit} className="edit">
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubTodoDetails;
