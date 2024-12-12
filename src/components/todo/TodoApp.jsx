import TodoData from "./TodoData";
import TodoNew from "./TodoNew";
import reactLogo from "../../assets/react.svg";
import { useState } from "react";
import "./todo.css";


const TodoApp = () => {
    const [todoList, setTodoList] = useState([])

    const addTodo = (name) => {
        const newTodoList = {
            id: handleId(1, 10000),
            name: name,
        };
        setTodoList([...todoList, newTodoList])
    }
    const handleId = (max, min) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const handleDeleteId = (id) => {
        const newTodoList = todoList.filter((item) => item.id !== id)
        setTodoList(newTodoList)
    }
    return (
        <>
            <div className="todo-title">Todo List</div>
            <TodoNew
                addTodo={addTodo}
            />
            {todoList.length > 0 ?
                <TodoData
                    todoList={todoList}
                    handleDeleteId={handleDeleteId}
                />
                :
                <div className="todo-image">
                    <img src={reactLogo} className="logo" />
                </div>}
        </>
    )
}

export default TodoApp