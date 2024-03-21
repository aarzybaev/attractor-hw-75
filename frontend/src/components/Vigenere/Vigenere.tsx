import { Grid, IconButton, TextField } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import React, { useState } from 'react';
import { Message } from '../../types';
import axiosApi from '../../../axiosApi';
const Vigenere = () => {
  const [message, setMessage] = useState<Message>({
    encoded: '',
    decoded: '',
    password: '',
  });
  const inputChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
      setMessage(prevState => (
      {...prevState,
        [name]: value,
      }
    ))
  };

  const toEncode = async () => {
    const password = message.password;
    const decodedMessage = message.decoded;

    if (password.trim() && decodedMessage.trim()) {
      const {data: response, statusText} = await axiosApi.post(
        '/encode',
        {password, message: decodedMessage});
      if (statusText === 'OK') {
        setMessage(prevState => ({
          ...prevState,
          encoded: response.encoded
        }));
      } else {
        console.error('Error: ', statusText);
      }
    } else {
      window.alert('Decoded message && password must be provided');
    }
  };

  const toDecode =  async () => {
    const password = message.password;
    const encodedMessage = message.encoded;

    if (password.trim() && encodedMessage.trim()) {
      const {data: response, statusText} = await axiosApi.post('/decode', {password, message: encodedMessage});
      if (statusText === 'OK') {
        setMessage(prevState => ({
          ...prevState,
          decoded: response.decoded
        }));
      } else {
        console.error('Error: ', statusText);
      }
    } else {
      window.alert('Encoded message && password must be provided');
    }
  };

  return (
    <Grid container direction="column" gap={2}>
      <Grid item xs>
        <TextField
          multiline rows={3}
          id="decoded" label="Decoded message"
          name="decoded"
          value={message.decoded}
          onChange={inputChangeHandler}
        />
      </Grid>

        <Grid item xs>
          <Grid container justifyContent="space-between" spacing={2} >
            <Grid item xs>
              <TextField
                id="password" label="Password"
                name="password"
                value={message.password}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs>
              <IconButton onClick={toEncode}>
                <ArrowDownwardIcon />
              </IconButton>
              <IconButton onClick={toDecode}>
                <ArrowUpwardIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

      <Grid item xs>
        <TextField
          multiline rows={3}
          id="encoded" label="Encoded message"
          name="encoded"
          value={message.encoded}
          onChange={inputChangeHandler}
        />
      </Grid>
    </Grid>
  );
};

export default Vigenere;