import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { USERS_API_URL } from './src/constants/index.js';
const app = express();
const port = 3000;


// Middleware
//app.use(cors());
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(bodyParser.json());
app.use(express.json());

let users = [];


// Route for handling GET requests to /users
app.get('/users', (req, res) => {
  console.log('Received GET request to /users');
  res.status(200).json(users); // Send the users array as JSON with a 200 status
});




// Маршрут для создания нового пользователя
app.post( `/users`, (req, res) => {
  const { name, email, account, phone } = req.body;
  console.log('Received data:', { name, email, account, phone });
  const newUser = { id: users.length, name, email, account, phone };
  users.push(newUser);
    
  res.status(200).json(newUser);
});





app.put(`/users/:id`, (req, res) => {
  try {
  const { id } = req.params;
  const { name, email,  account, phone } = req.body;

  // Поиск пользователя по id
  const existingUser = users.find(user => user.id == id);

  if (existingUser) {
    // Обновление данных пользователя
    existingUser.name = name;
    existingUser.email = email;
    existingUser.account = account;
    existingUser.phone = phone;

    res.status(200).json(existingUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
} catch (error) {
  console.error('Error updating user:', error);
    res.status(404).json({ error: 'User not found' });
  }
});

// Маршрут для удаления пользователя
app.delete(`/users/:id`, (req, res) => {
  const { id } = req.params;
  const { confirmDelete } = req.body;

  if (!confirmDelete) {
    return res.status(400).json({ error: 'Deletion not confirmed' });
  }

  const index = users.findIndex(user => user.id == id);
  if (index !== -1) {
    users.splice(index, 1);
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Маршрут для обновления существующего пользователя
/*app.put( `users/:id`, (req, res) => {
  const { id } = req.params;
  const { name, email, account, phone } = req.body;
  const index = users.findIndex(user => user.id == id);
  if (index !== -1) {
    users[index] = { id, name, email, account, phone };
    res.json(users[index]);
  } else {
    res.status(408).json({ error: 'User not found' });
  }
});*/


app.listen(port, '0.0.0.0', () => {
    console.log(`Сервер запущен на порту ${port}`);
  });


