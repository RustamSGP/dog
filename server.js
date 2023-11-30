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
  const { name, email, document, phone } = req.body;
  console.log('Received data:', { name, email, document, phone });
  const newUser = { id: users.length, name, email, document, phone };
  users.push(newUser);
    
  res.status(200).json(newUser);
});







// Маршрут для обновления существующего пользователя
app.put( `${USERS_API_URL}/:id`, (req, res) => {
  const { id } = req.params;
  const { name, email, document, phone } = req.body;
  const index = users.findIndex(user => user.id == id);
  if (index !== -1) {
    users[index] = { id, name, email, document, phone };
    res.json(users[index]);
  } else {
    res.status(408).json({ error: 'User not found' });
  }
});


app.listen(port, '0.0.0.0', () => {
    console.log(`Сервер запущен на порту ${port}`);
  });

/*app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});*/
