import vid from "./assets/vid.mp4";
import "./hero.css";
import plus from "./assets/plus.svg";
// import chevDown from "./assets/down.svg";
import trash from "./assets/trash.svg";
import edit from "./assets/edit.svg";
import { useState } from "react";

function Hero() {
  const [todo, setTodo] = useState([]);
  const [masterTodo, setMasterTodo] = useState([]); // stores all todos
  const [editState, setEditState] = useState({ id: null, text: "" });

  function itemArr(todoList) {
    setTodo((prev) => [...prev, todoList]);
    setMasterTodo((prev) => [...prev, todoList]);
  }

  function handleDelete(id) {
    const updated = todo.filter((item) => item.id !== id);
    setTodo(updated);
    setMasterTodo((prev) => prev.filter((item) => item.id !== id));
  }

  function handleToggle(id) {
    const toggled = masterTodo.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setMasterTodo(toggled);
    setTodo(toggled); // keep in sync
  }

  function handleEdit(id, currentText) {
    setEditState({ id, text: currentText });
  }

  function handleUpdate(id) {
    const updated = masterTodo.map((item) =>
      item.id === id ? { ...item, text: editState.text } : item
    );
    setMasterTodo(updated);
    setTodo(updated);
    setEditState({ id: null, text: "" });
  }

  function handleCatigories(category) {
    if (category === "All") {
      setTodo(masterTodo);
    } else if (category === "completed") {
      setTodo(masterTodo.filter((todo) => todo.completed));
    } else if (category === "Inprogress") {
      setTodo(masterTodo.filter((todo) => !todo.completed));
    }
  }

  function handleClearAll() {
    setTodo([]);
    setMasterTodo([]);
  }

  return (
    <>
      <div className="hero flex justify-center items-center flex-col relative p-5">
        <video
          className="vid"
          preload="auto"
          src={vid}
          autoPlay
          loop
          muted
          playsInline
        />
        <Title />
        <Form onitem={itemArr} onSort={handleCatigories} />
        <List
          todo={todo}
          onToggle={handleToggle}
          onDel={handleDelete}
          onEdit={handleEdit}
          onUpdate={handleUpdate}
          editState={editState}
          setEditState={setEditState}
        />
      </div>
      <ClearAll onClearAll={handleClearAll} />
    </>
  );
}

function Title() {
  return (
    <div className="Header-wrapper">
      <h1 className="heading--primary">To-Do List</h1>
    </div>
  );
}

function Form({ onitem, onSort }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    onitem(newTodo);
    setInputValue("");
  }

  return (
    <form
      className="form flex justify-center items-center"
      onSubmit={handleSubmit}
    >
      <div className="input-wrapper flex justify-center items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input"
        />
        <button className="btn" type="submit">
          <img className="w-20 h-20" src={plus} alt="plus" />
        </button>
      </div>
      <Catigories onsort={onSort} />
    </form>
  );
}

function Catigories({ onsort }) {
  const [category, setCategory] = useState("All");

  function handleChange(e) {
    const selected = e.target.value;
    setCategory(selected);
    onsort(selected);
  }

  return (
    <select className="select" value={category} onChange={handleChange}>
      <option value="All" className="option">
        All
      </option>
      <option value="completed" className="option">
        Completed
      </option>
      <option value="Inprogress" className="option">
        In Progress
      </option>
    </select>
  );
}

function List({
  todo,
  onToggle,
  onDel,
  onEdit,
  onUpdate,
  editState,
  setEditState,
}) {
  return (
    <ul className="list--wrapper">
      {todo.map((item) => {
        const isEditing = editState.id === item.id;

        return (
          <li
            key={item.id}
            className={
              item.completed
                ? "done list list--item flex justify-between items-center"
                : "list list--item flex justify-between items-center"
            }
          >
            {isEditing ? (
              <input
                type="text"
                value={editState.text}
                onChange={(e) =>
                  setEditState({ ...editState, text: e.target.value })
                }
                className="input edit-input"
              />
            ) : (
              <p className="list--item--text">{item.text}</p>
            )}

            <div className="list--item--btns flex gap-3 justify-center items-center">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  onChange={() => onToggle(item.id)}
                  checked={item.completed}
                />
                <span className="checkmark"></span>
              </label>

              {isEditing ? (
                <button className="btn" onClick={() => onUpdate(item.id)}>
                  ✅
                </button>
              ) : (
                <button
                  className="btn"
                  onClick={() => onEdit(item.id, item.text)}
                >
                  <img src={edit} className="w-9" alt="edit" />
                </button>
              )}

              <button className="btn" onClick={() => onDel(item.id)}>
                <img src={trash} alt="delete" />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ClearAll({ onClearAll }) {
  return (
    <div className="clear-all" onClick={onClearAll}>
      <button className="btn">
        <img src={trash} alt="delete" />
      </button>
      <p className="clear-text">Clear All</p>
    </div>
  );
}
export default Hero;
