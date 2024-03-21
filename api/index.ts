import express from 'express';
import cors from 'cors';
const Vigenere = require('caesar-salad').Vigenere;


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post('/encode', (request, response) => {
  const password = request.body.password;
  const message = request.body.message;
  const encoded = Vigenere.Cipher(password).crypt(message);
  response.json({encoded});
});

app.post('/decode', (request, response) => {
  const password = request.body.password;
  const message = request.body.message;
  const decoded = Vigenere.Decipher(password).crypt(message);
  response.json({decoded});
});

app.listen(port, () => {
  console.log(`Server started on ${port} port!`)
});