import express from 'express';
import {
  createTodo,
  deleteTodo,
  getSharedTodoById,
  getTodosById,
  getUserByEmail,
  getUserById,
  shareTodo,
  toggleComplete,
} from './database.js';

import cors from 'cors';

const app = express();

// const allowedOrigins = [
//   'http://localhost:5173',
//   'http://localhost:8081',
//   'http://192.168.18.24:5173',
//   'http://192.168.18.24:8081',
// ]; // lista de orígenes permitidos

const corsOptions = {
  // origin: function (origin, callback) {
  //   // Verifica si el origen está en la lista de orígenes permitidos o si no hay origen (en caso de apps como Postman)
  //   if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
  origin: '*',
  // origin: [
  //   'http://localhost:5173',
  //   'http://localhost:8081',
  //   'http://192.168.18.24:5173',
  //   'http://192.168.18.24:8081',
  // ], // Lista de orígenes permitidos

  methods: ['POST', 'GET'], // métodos permitidos
  // credentials: true, // permite enviar credenciales (cookies, autenticación)
};

// json formated
app.use(express.json());
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  next();
});

// GET to-dos by user id
app.get('/todos/:id', async (req, res) => {
  const todos = await getTodosById(req.params.id);

  res.status(200).send(todos);
});

// GET users from to-do shared
app.get('/todos/shared_todos/:id', async (req, res) => {
  try {
    // Buscar el todo compartido por ID
    const todo = await getSharedTodoById(req.params.id);

    // Si no se encuentra el todo, enviar un error 404
    if (!todo) {
      return res.status(404).send({message: 'To-do not found'});
    }

    // Buscar el autor y el usuario con quien se compartió
    const author = await getUserById(todo.user_id);
    const shared_with = await getUserById(todo.shared_with_id);

    // Verificar si el autor o el usuario compartido no existen
    if (!author) {
      return res.status(404).send({message: 'Author not found'});
    }

    if (!shared_with) {
      return res.status(404).send({message: 'Shared user not found'});
    }

    // Si todo está correcto, enviar los datos del autor y el usuario compartido
    res.status(200).send({author, shared_with});
  } catch (error) {
    // Manejar errores del servidor
    console.error(error);
    res.status(500).send({message: 'Server error'});
  }
});

// GET user by id
app.get('/users/:id', async (req, res) => {
  const user = await getUserById(req.params.id);

  res.status(200).send(user);
});

// UPDATE to-do
app.put('/todos/:id', async (req, res) => {
  const {value} = req.body;
  const todo = await toggleComplete(req.params.id, value);

  res.status(200).send(todo);
});

// DELETE to-do by id
app.delete('/todos/:id', async (req, res) => {
  await deleteTodo(req.params.id);

  res.send({message: 'Todo deleted succesfully'});
});

// SHARE to-do to a user
app.post('/todos/shared_todos', async (req, res) => {
  try {
    const {todo_id, user_id, email} = req.body;

    const userToShare = await getUserByEmail(email);

    if (!userToShare) {
      // Si no se encuentra el usuario, enviamos un 404 (no encontrado)
      return res.sendStatus(404).send({message: 'User not found'});
    }

    const sharedTodo = await shareTodo(todo_id, user_id, userToShare.id);

    res.status(201).send({index: sharedTodo}); // 201 indica que se creó exitosamente
  } catch (error) {
    // Si hay algún error en el proceso, enviamos un 500 (error del servidor)
    res.sendStatus(500).send({message: 'Server error'});
  }
});

// CREATE new todo
app.post('/todos', async (req, res) => {
  const {user_id, title} = req.body;
  const todo = await createTodo(user_id, title);

  res.status(201).send(todo);
});

//? parte del video "57:46 / 1:44:25"

app.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
