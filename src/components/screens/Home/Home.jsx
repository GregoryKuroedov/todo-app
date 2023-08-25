import React, { useState, useEffect } from 'react'
// Components
import TodoItem from './item/TodoItem'
import CreateTodoInput from './CreateTodoInput/CreateTodoInput'
// Data
import { commonData } from './commonData.js'

const Home = () => {
	const initialData = JSON.parse(localStorage.getItem('todos')) || commonData

	const [todos, setTodos] = useState(initialData)

	const sortedTodos = [...todos].sort((a, b) => {
		a.isCompleted !== b.isCompleted ? (a.isCompleted ? 1 : -1) : 0
	})

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(sortedTodos))
	}, [todos])

	const completeTodo = (id) => {
		const copy = [...todos]
		const current = copy.find((todo) => todo.id === id)
		current.isCompleted = !current.isCompleted
		setTodos(copy)
	}

	const changeTodo = (id, newValue) => {
		const copy = [...todos]
		const current = copy.find((todo) => todo.id === id)
		current.title = newValue
		setTodos(copy)
	}

	const removeTodo = (id) => {
		const copy = [...todos]
		setTodos(copy.filter((todo) => todo.id !== id))
	}

	let todosList = sortedTodos.map((todo) => {
		return (
			<TodoItem
				key={todo.id}
				todo={todo}
				changeTodo={changeTodo}
				completeTodo={completeTodo}
				removeTodo={removeTodo}
			/>
		)
	})

	return (
		<div className='text-black-color flex h-screen flex-col items-center justify-center gap-4'>
			<div className='flex w-1/2 flex-col gap-4'>
				<div className='flex w-full flex-col gap-1'>{todosList}</div>
				<CreateTodoInput setTodos={setTodos} todos={todos} />
			</div>
		</div>
	)
}

export default Home
