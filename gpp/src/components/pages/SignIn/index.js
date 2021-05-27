import React, { useState } from "react";
import { makeStyles, TextField, Typography, Button, Link, FormHelperText } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import LockOutLineIcon from "@material-ui/icons/LockOutlined";
import { useNavigate } from "react-router-dom";
//import axios from '../../../utils/axios';

import { useDispatch, useSelector } from "react-redux";
import signIn from '../../../actions/accountActions';

const useStyles = makeStyles((theme) => ({
  root: {},

  avatar: {
    background: theme.palette.primary.main,
  },
}));

function SignIn() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();

  const account = useSelector(state => state);
  console.log(account)
  async function handleLogar() {

    //axios.post('/api/home/login').then(response => console.log(response))
    try {
      await dispatch(signIn(email, password));
       navigate('/');

    } catch(error){
      setErrorMessage(error.response.data.message)
    }
  }

  return (
    <Grid container>
      <Box display="flex" flexDirection="column" alignItems="center" m={8}>
        <Avatar>
          <LockOutLineIcon className={classes.avatar} />
        </Avatar>
        <Typography variant="h5">Acesso</Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="e-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Senha"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button fullWidth variant='contained' color="primary"
          onClick={handleLogar}  >
              Entrar
          </Button>
          {
            errorMessage && 
            <FormHelperText>
              {errorMessage}
            </FormHelperText>
          }
          <Grid container>
              <Grid item>
                  <Link>Esqueceu a senha?</Link>
              </Grid>
              <Grid item>
                  <Link>Criar conta</Link>
              </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
}

export default SignIn;
