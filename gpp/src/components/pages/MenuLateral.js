import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CollapsibleTable from './TabelaTodo';
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper, TableBody } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

 function createData(lista) {
   let novaArray = [];
  lista.forEach(element => {
    var comentario = element.extendedProps.coment;
    novaArray.push({
      id: element.id,
      title: element.title,
      url: element.url,
      coment: comentario,
      start: element.startStr,
      end: element.endStr,
    })
  });  
  return (
   novaArray
  )
};

export default function MenuLateral({lista, calendarRef}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [novaLista, setNovaLista] = useState(createData(lista));
// console.log(lista)
// console.log(calendarRef)
createData(lista)
console.log(novaLista)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const rows = [

  ];

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Abrir lista
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Lista com as datas
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Aqui vai ficar a lista com todas as datas salvas. Nessa List */}
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
          {/* <CollapsibleTable /> */}
        </List>
        <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Titulos das marcações</TableCell>
            <TableCell>comentario</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))} */}
          {novaLista.map((row) => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              {/* <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Dialog>
    </div>
  );
}