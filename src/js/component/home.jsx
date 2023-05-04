import React, { useState, useEffect } from "react";

// const username=process.env.USERNAME

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [todos, setTodos] = useState([])
	const [todo, setTodo] = useState([])
	const apiUrl = "https://assets.breatheco.de/apis/fake/todos/user/mariabottinii"

	async function loadList() {
		let response = await fetch(apiUrl)
		if (response.ok) {
			let data = await response.json();
			setTodos(data)
			// console.log(data)
		}

		return response.status
	}
	useEffect(() => {
		loadList().then(async status => {
			if (status == 404) {
				let response = await fetch(apiUrl, {
					method: "POST",
					body: "[]",
					headers: {
						"Content-Type": "application/json"
					}
				}
				)
				if (response.ok) return loadList()

			}
		})
	}, [])




	async function addTodo(e) {
		if (e.key == "Enter") {


			let response = await fetch(apiUrl, {
				body: JSON.stringify([...todos, { label: e.target.value, done: false }]),
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				}
			});


			if (!response.ok) {

				console.log(response.status + ":" + response.statusText);
				return;
			} else {
				setTodos([...todos, { label: e.target.value, done: false }])
				loadList()

			}
		}
		// let data= await response.json()
		// if(e.key=="Enter") {
		// let newItem={label:e.target.value, done:false}
		// let newTodos=[...todos,newItem]
		// setTodos(newTodos)
		// e.target.value=""
		// }

	}

	async function deleteTodo(index) {

		let newTodos = [...todos]
		newTodos.splice(index, 1);
		console.log("todo")
		console.log(newTodos)
		setTodos(newTodos)
		// )
		// newTodos.splice(index,1)
		// setTodos(newTodos)
		// let e={}
		// e.key="Enter"
		// addTodo(todo)

		let response = await fetch(apiUrl, {
			method: "PUT",
			body: JSON.stringify(newTodos),
			headers: {
				"Content-Type": "application/json"
			}

		})
		if (response.ok) {
			// let newTodos= [...todos]
			// newTodos.splice(index,1)
			// setTodos(newTodos)
			loadList()
		} else {
			console.error(response.status + "/" + response.statusText)
		}

		// let newTodos=[...todos]
		// newTodos.splice(index,1)
		// setTodos(newTodos)

	}

	function checkTodo(index) {
		let newTodos = [...todos]
		newTodos[index].done = !newTodos[index].done
		setTodos(newTodos)
	}

	return (
		<div>
			<div className="d-flex container flex-column mx-auto border border-dark p-5">
				<h2 className="text-center text-uppercase">To Do List Fetch</h2>
				<input type="text p-3 mx-auto" name="" id="" value={todo} onKeyDown={(e) => addTodo(e)} onChange={(e) => setTodo(e.target.value)} />
				<ol className="list-group d-flex w-100 p-2 d-flex justify-content-center">
					{todos.map((todo, index) => <li key={index} className="list-group-item border border-dark rounded-3 p-2 mb-2">
						<div>
							<input className="form-check-input" type="checkbox" value="" onChange={(e) => checkTodo(index)} checked={todo.done} />{todo.label}
							<span onClick={() => deleteTodo(index)} className="btn btn-outline-danger btn-sm rounded-pill">X</span>
						</div>
					</li>)}
				</ol>
			</div>
		</div>
	);

}

export default Home;
