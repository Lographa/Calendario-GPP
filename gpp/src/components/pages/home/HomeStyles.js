import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      height: "100vh",
    },
    AppBar: {
      minHeight: 50,
      height: 80,
      boxShadow: "none",
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 190,
    },
    menuIcon: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(4),
    },
    grow: {
      flexGrow: "1",
    },
    toolbar: {
      minHeight: 90,
      alignItems: "flex-start",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
    },
    listIntemText: {
      fontSize: 14,
    },
    ListTamanho: {
      paddingBottom: theme.spacing(13),
    },
    formControlLabel: {
      paddingLeft: theme.spacing(2),
    },
    calendario: {
      paddingTop: theme.spacing(22)
    },
  }));

  export default useStyles;