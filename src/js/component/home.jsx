import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [task, setTask] = useState("")
	const [todos, setTodos] = useState(["Tarea 1", "tarea 2"])
	
	function addTask(e) {
		if(e.code=="Enter") {
			setTodos([...todos, task])
			setTask("")
		}
		
	}

	function delTask(index) {
		// let newTodos= [...todos]
		// newTodos.splice(index,1)
		// setTodos(newTodos)
		setTodos([
			...todos.slice(0,index),
			...todos.slice(index+1)
		])
	}

	return (
		<>
	<div className="card">
 	<div className="card-header">
  	<input 
	type="text" 
	className="form-control border-0" 
	placeholder="Escriba la nueva tarea"
	value={task}
	onChange={(e)=>setTask(e.target.value)}
	onKeyDown={addTask}
	/>
	
  </div>
  </div>
  <div>
  <ul className="list-group list-group-flush">
	{todos.map((todo, index)=> (
 	<li  key={index}  className="list-group-item d-flex justify-content-between align item">{todo}
 	<button onClick={()=>delTask(index)} className="btn btn-outline-danger btn-sm rounded-pill">X</button>
 	</li>
	))}
  </ul>
</div>
<div className="card-footer">{todos.length}item left</div>
   
  
		
</>
		

	);
};

export default Home;
