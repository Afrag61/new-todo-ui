import { useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";

import ModalContext from "../store/ModalContext";

import showDown from "./../assets/show.svg";
import hideUp from "./../assets/hide.svg";
import nonCheckedIco from "./../assets/noneCheck.svg";
import checkedIco from "./../assets/checked.svg";
import deleteIco from "./../assets/delete.svg";

const SubTodo = ({ SubTodo }) => {
  const todoId = useParams().todoId;
  const navigate = useNavigate();
  const { openModal } = useContext(ModalContext);
  const { title, description, createdOn, dueDateTime, id, isChecked } = SubTodo;
  const [details, setDetails] = useState(false);
  const token = localStorage.getItem("token");

  const handleShowDetails = () => {
    details ? setDetails(false) : setDetails(true);
  };

  const checkSubTodo = async () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(
      `${baseUrl}/todos/${todoId}/sub-todos/${id}/toggle-check`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

  const handleDeleteModal = () => {
    openModal(todoId, title, id);
  };

  return (
    <>
      <li className="subtodo-item">
        <div className="subtodo-pref">
          <p className="subtodo-title">
            <Link to={`${id}`}>{title}</Link>
          </p>
          <div className="subtodo-buttons">
            <button onClick={handleShowDetails}>
              <img src={details ? hideUp : showDown} alt="details" />
            </button>
            <button onClick={handleCheckSubTodo}>
              <img src={isChecked ? checkedIco : nonCheckedIco} alt="Check" />
            </button>
            <button onClick={handleDeleteModal} className="delete">
              <img src={deleteIco} alt="delete" />
            </button>
          </div>
        </div>
        {details && (
          <div className="subtodo-details">
            <div className="details-item">
              <h3>Description: </h3>
              <span>{description}</span>
            </div>
            <div className="details-item">
              <h3>Created On: </h3>
              <span>{createdOn}</span>
            </div>
            <div className="details-item">
              <h3>Due Date: </h3>
              <span>{dueDateTime}</span>
            </div>
          </div>
        )}
      </li>
    </>
  );
};

export default SubTodo;
