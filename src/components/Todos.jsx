import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ModalContext from "../store/ModalContext";

import Todo from "./Todo";

const Todos = ({ todos }) => {
  const { modalIsVisible } = useContext(ModalContext);

  return (
    <AnimatePresence>
      {todos.length === 0 ? (
        <p
          style={{
            backdropFilter: "blur(50px)",
            display: "flex",
            flexDirection: "column",
            justifySelf: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            border: "1px solid #006fee",
            borderRadius: "8px",
            padding: "30px",
            width: "50%",
          }}
          
        >
          No Todos Here!
        </p>
      ) : (
        <div
          className="todos-container"
          style={{
            backdropFilter: modalIsVisible ? "none" : "blur(50px)",
          }}
        >
          <h1 className="todos-header">Todos</h1>
          <ul className="todos-list">
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Todos;
