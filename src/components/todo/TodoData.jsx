const TodoData = (props) => {



    const { todoList, handleDeleteId } = props;

    return (
        <div className="todo-data">
            {todoList.map((item, index) => {
                return (
                    <div className={"todo-item"} key={item.id}>
                        <div>{item.name}</div>
                        <div>{item.id}</div>
                        <button onClick={() => { handleDeleteId(item.id) }}>Delete</button>
                    </div>
                )
            })}

        </div>
    )
}

export default TodoData;