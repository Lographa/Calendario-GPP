import React, { useState } from "react";
import {
  makeStyles,
  TextField,
  Typography,
  Button,
  Link,
  FormHelperText,
} from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import LockOutLineIcon from "@material-ui/icons/LockOutlined";
import { useNavigate } from "react-router-dom";
//import axios from '../../../utils/axios';

import { useDispatch, useSelector } from "react-redux";
import signIn from "../../../actions/accountActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  avatar: {
    background: theme.palette.primary.main,
  },
}));

function CadastroForm() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();
  const [usuario, setUsuario] = useState({});

  const account = useSelector((state) => state);

  // console.log(account);

  async function handleLogar() {
    //axios.post('/api/home/login').then(response => console.log(response))
    try {
      // await dispatch(signIn(email, password));
      if (password === password2) {
        const user = {
          email: email,
          senha: password,
          nome: nome,
        };
        console.log(user);
      } else {
        alert("Senhas tem ser iguais.");
      }

      setUsuario({ email, password });
      // navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  }

  return (
    <Grid container>
      <Box display="flex" flexDirection="column" alignItems="center" m={8}>
        <Avatar>
          <LockOutLineIcon className={classes.avatar} />
        </Avatar>
        <Typography variant="h5">Tela de cadastro</Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nome"
            label="Nome"
            name="nome"
            autoComplete="nome"
            autoFocus
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Repete a senha"
            name="password"
            autoComplete="current-password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <div className={classes.root}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogar}
            >
              Criar conta
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
            >
              Cancelar
            </Button>
            {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
          </div>
        </form>
      </Box>
    </Grid>
  );
}

export default CadastroForm;
