import React from "react";
import {
  Box,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import useStyles from "./pages/home/HomeStyles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

function Header({ darkMode, setDarkMode }) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  
const logado = () => {
  if(user == null || user == {}){
    navigate("/sign-in")
  } else {
    localStorage.removeItem('user')
    navigate("/sign-in")
  }
};

  const usuario = (
    <div>
      <Avatar className={classes.purple} >{user.name ? user.name.charAt().toUpperCase() : ""} </Avatar>
      <Typography variant="h7" color="textPrimary">
        {user.name}
      </Typography>
    </div>
  );

  return (
    <AppBar color="inherit" className={classes.AppBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h3" color="textPrimary">
          Projeto do GPP
        </Typography>
        {/* <FormControlLabel
            control={
              <Switch
                value={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                color="inherit"
              />
            }
            label="Modo Escurão"
            className={classes.formControlLabel}
          /> */}
        <div className={classes.grow} />
        <Button
          startIcon={<AddToQueueIcon />}
          onClick={() => logado()}
        >
          {user.name ? 'Logout' : 'Login' }
        </Button>
        <Button
          onClick={() => navigate("/cadastrar")}
        >
          CADASTRAR
        </Button>
        {usuario}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
