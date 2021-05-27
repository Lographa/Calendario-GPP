import React from "react";
import {
  Box,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import useStyles from './pages/home/HomeStyles';
import { useSelector } from "react-redux";



function Header({ darkMode, setDarkMode }) {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    

    return (
        <AppBar color="inherit" className={classes.AppBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuIcon}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" color="textPrimary">
            Teste site do GPP
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
          {/* <Button startIcon={<AddToQueueIcon />}>Login</Button> */}
        </Toolbar>
      </AppBar>
    )
};

export default Header;