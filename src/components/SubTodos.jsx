import { useContext } from "react";
import { Link } from "react-router";

import ModalContext from "../store/ModalContext";
import SubTodo from "./SubTodo";
import addIco from "./../assets/Add.svg";


const SubTodos = ({ todoTitle, subTodos }) => {
  const { modalIsVisible } = useContext(ModalContext);

  let isSubTodoEmpty = subTodos.length === 0;

  return (
    <>
      <div
        className="subtodos-container"
        style={{ backdropFilter: modalIsVisible ? "none" : "blur(50px)" }}
      >
        {isSubTodoEmpty ? (
          <h2 style={{ alignSelf: "center" }}>No sub todos in {todoTitle}</h2>
        ) : (
          <>
            <h1>Sub-Todos of {todoTitle}</h1>
            <ul className="subtodos-list">
              {subTodos.map((subTodo) => (
                <SubTodo key={subTodo.id} SubTodo={subTodo} />
              ))}
            </ul>
          </>
        )}
        <div className="create-container">
          <Link to='new'>
            <button className="create-button">
              <img src={addIco} alt="add" />
              {isSubTodoEmpty ? "Create" : "Add"}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SubTodos;
