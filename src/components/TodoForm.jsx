import Submit from "./Submit";
import Reset from "./Reset";
import { Form, useActionData, Link, redirect } from "react-router";
import { isEmpty, isNotBetween } from "./../validation";
import log from "./../../Print";

const TodoForm = ({ type, method, todo }) => {
  const errors = useActionData();

  const errorStyle = errors && "error";

  return (
    <div className={`form-container ${errorStyle}`}>
      <h1>Enter {type === "subTodo" ? "Sub Todo" : "Todo"}</h1>
      <Form method={method}>
        <div className="input-container">
          <input
            className={`input`}
            type="text"
            id="title"
            name="title"
            placeholder="Todo title..."
            defaultValue={todo ? todo.title : ""}
          />
        </div>
        <div className="textarea-container">
          <textarea
            className={`textarea`}
            type="text"
            id="description"
            name="description"
            placeholder="Todo description..."
            defaultValue={todo ? todo.description : ""}
          />
        </div>
        <div className="date-container">
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            defaultValue={todo ? todo.dueDateTime : ""}
          />
        </div>
        {errors && (
          <ul className="errors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <div className="button-container">
          <Submit />
          <Reset />
          <Link className="back-button" relative="path" to="..">
            Back
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default TodoForm;

export const todoAction = async ({ request, params }) => {
  const id = params.todoId;
  const data = await request.formData();
  const method = request.method;
  let todoData = {
    title: data.get("title"),
    description: data.get("description"),
    dueDateTime: data.get("dueDate"),
    isChecked: false,
    subTodos: [],
  };
  let url = `http://192.168.1.3:3000/todos/add-todo`;

  if (method === "PATCH") {
    todoData = {
      title: data.get("title"),
      description: data.get("description"),
      dueDateTime: data.get("dueDate"),
    };

    url = `http://192.168.1.3:3000/todos/${id}`;
  }

  let errors = [];

  if (isEmpty(todoData.title)) {
    errors.push("You must provide todo title.");
  }

  if (isNotBetween(todoData.title, 5, 30)) {
    errors.push("Todo title must be between 5 and 30 characters long.");
  }

  if (isEmpty(todoData.description)) {
    errors.push("You must provide todo description.");
  }

  if (isNotBetween(todoData.description, 10, 300)) {
    errors.push("Todo description must be between 10 and 300 characters long.");
  }

  if (isEmpty(todoData.dueDateTime)) {
    errors.push("You must provide Due Date Time");
  }

  if (errors.length > 0) {
    return errors;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not save data!" }), {
      status: 500,
    });
  }

  if (method === "PATCH") {
    return redirect(`/${id}`);
  } else if (method === "POST") {
    return redirect("/");
  }
};

export const subTodoAction = async ({ request, params }) => {
  const { todoId, subTodoId } = params;
  const data = await request.formData();
  const method = request.method;

  let subTodoData = {
    title: data.get("title"),
    description: data.get("description"),
    dueDateTime: data.get("dueDate"),
    isChecked: false,
  };
  let url = `http://192.168.1.3:3000/todos/${todoId}/sub-todos/add-sub-todo`;

  if (method === "PATCH") {
    subTodoData = {
      title: data.get("title"),
      description: data.get("description"),
      dueDateTime: data.get("dueDate"),
    };

    url = `http://192.168.1.3:3000/todos/${todoId}/sub-todos/${subTodoId}`;
  }

  let errors = [];

  if (isEmpty(subTodoData.title)) {
    errors.push("You must provide todo title.");
  }

  if (isNotBetween(subTodoData.title, 5, 30)) {
    errors.push("Todo title must be between 5 and 30 characters long.");
  }

  if (isEmpty(subTodoData.description)) {
    errors.push("You must provide todo description.");
  }

  if (isNotBetween(subTodoData.description, 10, 300)) {
    errors.push("Todo description must be between 10 and 300 characters long.");
  }

  if (isEmpty(subTodoData.dueDateTime)) {
    errors.push("You must provide Due Date Time");
  }

  if (errors.length > 0) {
    return errors;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subTodoData),
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not save data!" }), {
      status: 500,
    });
  } else {
    if (method === "POST") {
      return redirect(`/${todoId}`);
    } else if (method === "PATCH") {
      return redirect(`/${todoId}/${subTodoId}`);
    }
  }
};
