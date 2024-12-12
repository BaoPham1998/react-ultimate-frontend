import { useState } from "react";

const TodoNew = (props) => {

    //useState hook
    // const valueInput = "baopham";

    const [valueInput, setValueInput] = useState("")
    const { addTodo } = props;



    const handleOnChange = (name) => {
        setValueInput(name);
    }

    const handleClick = () => {
        addTodo(valueInput);
        setValueInput("");
    }
    return (
        <div className="todo-new">
            <input type="text" className="todo-input" placeholder="Enter your task"
                onChange={(event) => {
                    handleOnChange(event.target.value)
                }}
                value={valueInput}
            />
            <button className="todo-button"
                onClick={handleClick}>Add</button>

        </div>
    )
}
export default TodoNew;