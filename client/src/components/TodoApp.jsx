import "../styles/css/TodoApp.css";
import { useReducer, useRef } from "react";

// init state
const initState = {
  task: "",
  tasksList: [],
};

//actions
const SET_TASK = "set_task";
const ADD_TASK = "add_task";
const REMOVE_TASK = "remove_task";

const setTask = (payload) => {
  return {
    type: SET_TASK,
    payload,
  };
};

const addTask = (payload) => {
  return {
    type: ADD_TASK,
    payload,
  };
};

const removeTask = (payload) => {
  return {
    type: REMOVE_TASK,
    payload,
  };
};

// reducer
const reducer = (state, action) => {
  // console.log(action);
  // console.log("prev state: " + state);

  let newState;

  switch (action.type) {
    case SET_TASK:
      newState = {
        ...state,
        task: action.payload,
      };
      break;
    case ADD_TASK:
      newState = {
        ...state,
        tasksList: [...state.tasksList, action.payload],
      };
      break;
    case REMOVE_TASK:
      const newTasksList = [...state.tasksList];

      newTasksList.splice(action.payload, 1);

      newState = {
        ...state,
        tasksList: newTasksList,
      };
      break;
    default:
      throw new Error(`Invalid action ${action.type}`);
  }

  console.log(newState);

  return newState;
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const { task, tasksList } = state;

  const inputRef = useRef();

  const submitHandler = () => {
    if (task === "") {
      alert("please enter the name of the task!!");
      inputRef.current.focus();
      return;
    }

    dispatch(addTask(task));
    dispatch(setTask(""));

    inputRef.current.focus();
  };

  return (
    <div className='"grid h-screen place-items-center"'>
      <div>
        <div style={{ padding: "30px" }}>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="max-w-sm"
          >
            <input
              ref={inputRef}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              value={task}
              placeholder="enter task"
              onChange={(e) => {
                dispatch(setTask(e.target.value));
              }}
            />

            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold px-8 pt-6 pb-8 mb-4 rounded focus:outline-none focus:shadow-outline"
              onClick={submitHandler}
            >
              {" "}
              Add{" "}
            </button>
          </div>

          <ul>
            {tasksList.map((task, index) => (
              <li key={index}>
                <div
                  key={index}
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="flex rounded overflow-hidden shadow-lg"
                >
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{task}</div>
                    <p className="text-gray-700 text-sm">task added!</p>
                  </div>
                  <div style={{}} className="px-6 py-4">
                    <button
                      onClick={() => dispatch(removeTask(index))}
                      className="bg-red-700 hover:bg-red-800 text-white font-bold px-8 pt-6 pb-8 mb-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default TodoApp;
