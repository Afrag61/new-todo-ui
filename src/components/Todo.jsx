import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

import ModalContext from "../store/ModalContext";
import showDown from "./../assets/show.svg";
import hideUp from "./../assets/hide.svg";
import nonCheckedIco from "./../assets/noneCheck.svg";
import checkedIco from "./../assets/checked.svg";
import deleteIco from "./../assets/delete.svg";

const Todo = ({ todo }) => {
  const {
    id,
    title,
    description,
    dueDateTime,
    createdOn,
    isChecked,
    subTodos,
    history,
  } = todo;
  const [details, setDetails] = useState(false);
  const navigate = useNavigate();
  const { openModal } = useContext(ModalContext);

  const handleShowDetails = () => {
    details ? setDetails(false) : setDetails(true);
  };

  const checkTodo = async () => {
    const token = localStorage.getItem("token");
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${baseUrl}/todos/${id}/toggle-check`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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

  const handleDeleteModal = () => {
    openModal(id, title);
  };

  return (
    <>
      <li className="todo-item">
        <div className="todo-pref">
          <p className="todo-title">
            <Link to={`/${id}`}>{title}</Link>
          </p>
          <div className="buttons">
            <button onClick={handleShowDetails}>
              <motion.img
                src={hideUp}
                alt="details"
                animate={{ rotate: details ? 180 : 0 }}
              />
            </button>
            <button onClick={handleCheckTodo}>
              <img src={isChecked ? checkedIco : nonCheckedIco} alt="Check" />
            </button>
            <button onClick={handleDeleteModal} className="delete">
              <img src={deleteIco} alt="delete" />
            </button>
          </div>
        </div>
        {details && (
          <div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            className="todo-details"
          >
            {description ? <p>Description: {description}</p> : undefined}
            {createdOn ? (
              <p>Created on: {new Date(createdOn).toLocaleString()}</p>
            ) : undefined}
            {dueDateTime ? (
              <p>Due Date: {new Date(dueDateTime).toLocaleString()}</p>
            ) : undefined}
          </div>
        )}
      </li>
    </>
  );
};

export default Todo;
