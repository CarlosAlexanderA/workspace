
CREATE DATABASE todo_tutorial;

USE todo_tutorial;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255)
);

CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  completed BOOLEAN DEFAULT false,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- DROP TABLE shared_todos;
CREATE TABLE shared_todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  todo_id INT,
  user_id INT,
  shared_with_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
  FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE

);

-- insert two users into the users table
INSERT INTO users (name, email, password) VALUES ('Beto', 'user1@example.com','password1');
INSERT INTO users (name, email, password) VALUES ('Alberto', 'user2@example.com','password2');

-- insert todos into the todos table, asociated with the first user
INSERT INTO todos (title, user_id) VALUES 
('🏃‍♂️ Go for morning run 🌄',1),
('💻 Work on project presentation 📷',1),
('🛒 Go grocery shoping 🛍️',1),
('📚 Read 30 áges of book 📖',1),
('👨‍🦼 Ride bike to the park 🌳',1),
('🍲 Cook dinner for family 🍴',1),
('🙇 Practtice yoga 🧘',1),
('🎧 Listen to a podcast 🎤',1),
('🧹 Clean the house🧃',1),
('🛌 Get 8 hours of sleep 💤',1);

-- slect all todos from user 1 
SELECT * FROM todos WHERE user_id = 1;

-- shared todo 1 of user with user 2
INSERT INTO shared_todos (todo_id, user_id, shared_with_id) VALUES (1, 1, 2);

-- get todos including shared todos by id 
--* replace [user_id] by number of shared user
SELECT todos.*, shared_todos.shared_with_id 
FROM todos 
LEFT JOIN shared_todos 
ON todos.id = shared_todos.todo_id 
WHERE todos.user_id = [user_id] OR shared_todos.shared_with_id = [user_id];
