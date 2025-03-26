import { createContext, useState } from "react";

const ModalContext = createContext({
  selectedTodo: {},
  modalIsVisible: false,
  openModal: () => {},
  closeModal: () => {},
});

export default ModalContext;

export const ModalContextProvider = ({ children }) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({
    title: undefined,
    id: undefined,
    subTodoId: undefined,
  });

  const openModal = (id, title, subTodoId) => {
    setSelectedTodo({ id, title, subTodoId });
    setModalIsVisible(true);
  };

  const closeModal = () => {
    setModalIsVisible(false);
    setSelectedTodo({ title: undefined, id: undefined, subTodoId: undefined });
  };

  const ctxValues = {
    selectedTodo,
    modalIsVisible,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={ctxValues}>{children}</ModalContext.Provider>
  );
};
