import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "../feature/todoSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../components/Modal";

const Home = () => {
  const { todos, loading } = useSelector((state) => state.todo);
  const { user } = useSelector((state) => state.auth);
  const [isExpanded, setIsExpanded] = useState(null);
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos(user.id));
  }, [dispatch, user.id]);

  const open = () => setIsModelOpen(true);
  const close = () => setIsModelOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormdata) => ({ ...prevFormdata, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isEdit) await dispatch(updateTodo(formData));
    else await dispatch(addTodo({ ...formData, user_id: user.id }));
    close();

    setFormData({
      id: "",
      title: "",
      description: "",
    });
    dispatch(fetchTodos(user.id));
    setIsEdit(false);
  };

  const toggleExpand = (id) => {
    setIsExpanded(isExpanded === id ? null : id);
  };

  const handleDeleteTodo = async (id) => {
    await dispatch(deleteTodo(id));
    dispatch(fetchTodos(user.id));
  };

  const handleEdit = (todo) => {
    setIsEdit(true);
    setFormData({
      title: todo.title,
      description: todo.description,
      id: todo.id,
    });
    open();
  };

  return (
    <div className={styles["card-container"]}>
      <div className={styles.header}>
        <h1>Todo Application</h1>
        <button className={styles["add-btn"]} onClick={open}>
          Add Todo
        </button>
      </div>
      <div className={styles["card-grid"]}>
        {todos.map((todo, index) => (
          <div key={index} className={styles["card"]}>
            <div className={styles["card-headers"]}>
              <h2>{todo.title}</h2>
              <div className={styles["card-icons"]}>
                <FaEdit
                  className={styles["edit-icon"]}
                  onClick={() => handleEdit(todo)}
                />
                <FaTrash
                  className={styles["delete-icon"]}
                  onClick={() => handleDeleteTodo(todo.id)}
                />
              </div>
            </div>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={close}
        buttonText={isEdit ? "Update Todo" : "Add Todo"}
      >
        <h2>{isEdit ? "Update Todo" : "Add Todo"}</h2>
        <form onSubmit={submitHandler}>
          <div className={styles["model-box"]}>
            <label>Title</label>
            <input
              name="title"
              placeholder="Enter Title"
              onChange={handleInputChange}
              value={formData.title}
              required
            />
          </div>
          <div className={styles["model-box"]}>
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Enter Description"
              onChange={handleInputChange}
              value={formData.description}
              required
            />
            <button className={styles["btn"]}>
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default Home;
