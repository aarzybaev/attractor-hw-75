import express, {Request, Response} from 'express';
import cors from 'cors';
const Vigenere = require('caesar-salad').Vigenere;


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post('/encode', (request: Request, response: Response) => {
  try {
    const password: string = request.body.password;
    const message: string = request.body.message;
    const encoded: string = Vigenere.Cipher(password).crypt(message);
    response.json({encoded});
  } catch (e) {
    console.error(e);
  }
});

app.post('/decode', (request: Request, response: Response) => {
  try {
    const password: string = request.body.password;
    const message: string = request.body.message;
    const decoded: string = Vigenere.Decipher(password).crypt(message);
    response.json({decoded});
  } catch (e) {
    console.error(e);
  }
});

app.listen(port, () => {
  console.log(`Server started on ${port} port!`)
});