
import { useState, useRef } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    const name = todoNameRef.current.value;

    if (name === "") return; //もしテキストが空欄なら処理がここで終了
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];  //コピーしている
    const todo = newTodos.find((todo) => todo.id === id)  //findは選んだidと同じidを選ぶ
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);  //trueだけ残す
    setTodos(newTodos);
  };

  return (
    <div>
      <TodoList todos = {todos} toggleTodo = {toggleTodo}/> {/* コンポーネント */}
      <input type="text" ref = {todoNameRef}/>
      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={handleClear}>完了したタスクの削除</button>
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>   {/* falseだけ残す */}
    </div>
  );
}

export default App;
