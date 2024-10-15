import express from "express"
import { createTodo, deleteTodo, getSharedTodoById, getTodosById, getUserByEmail, getUserById, shareTodo, toggleComplete } from "./database.js"

import cors from "cors";

const app = express()

const corsOptions = {
  origin: "http://localhost:2173", // specify the allowed origin
  methods: ["POST", "GET"], // specigy the allowed methods
  credentials: true, // allow sending credentials (cookies, authentication)

}

// json formated 
app.use(express.json())
app.use(cors())
// GET to-dos by user id
app.get("/todos/:id", async (req, res)=>{
  const todos = await getTodosById(req.params.id)

  res.status(200).send(todos)
})

// GET users from to-do shared
app.get("/todos/shared_todos/:id", async (req, res) => {
  const todo = await getSharedTodoById(req.params.id)
  const author = await getUserById(todo.user_id)
  const sharedWith = await getUserById(todo.shared_with_id)

  res.status(200).send({ author, sharedWith})
})

// GET user by id
app.get("/users/:id", async (req, res) => {
  const user = await getUserById(req.params.id)

  res.status(200).send(user)
})

// UPDATE to-do 
app.put("/todos/:id", async (req, res) => {
  const {value} = req.body
  const todo = await toggleComplete(req.params.id, value)

  res.status(200).send(todo)
})

// DELETE to-do by id
app.delete("/todos/:id", async (req, res) => {
  await deleteTodo(req.params.id)

  res.send({message: "Todo deleted succesfully"})
})

// SHARE to-do to a user
app.post("/todos/shared_todos", async (req, res) => {
  const {todo_id, user_id, email} = req.body
  const userToShare = await getUserByEmail(email)
  const sharedTodo = await shareTodo(todo_id, user_id, userToShare.id)

  res.status(201).send(sharedTodo)
})

// CREATE new todo
app.post("/todos", async (req, res) => {
  const {user_id, title} = req.body
  const todo = await createTodo(user_id, title)

  res.status(201).send(todo)
})

//? parte del video "57:46 / 1:44:25"

app.listen(8080,()=>{
  console.log("Server running on http://localhost:8080");
})