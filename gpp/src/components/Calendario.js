import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button, Grid } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  
}));

export default function ({ onEventAdded }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [coment, setComent] = useState("");
  const [url, setUrl] = useState("")
  const [open, setOpen] = useState(false);
  //console.log(onEventAdded)

  // limpa estado
  useEffect(() => {
    setTitle("novo texto");
    setStart(new Date());
    setEnd(new Date());
    setComent("");
    setUrl("");
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setComent(event.target.value);
  };

  const onSubmit = () => {
    let _calendaio = {
      title,
      start,
      end,
      coment,
      url,
    };
    onEventAdded(_calendaio);
    handleClose();
  };
  // tudo dentro da caixa de dialogo está aqui. escolha de nome, data inicio e fim
  const todoDialog = (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogActions>
        <input
          placeholder="Tittle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              margin="normal"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Data inicio"
              value={start}
              onChange={(e) => setStart(e)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              margin="normal"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Data fim"
              value={end}
              onChange={(e) => setEnd(e)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <TextField
              id="standard-multiline-static"
              label="Comentário"
              multiline
              rows={5}
              defaultValue="Default Value"
              value={coment}
              onChange={handleChange}
            />
            {/* <TextField
              id="standard-multiline-static"
              label="url foda-se"
              multiline
              rows={5}
              defaultValue="Default Value"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            /> */}
          </Grid>
        </MuiPickersUtilsProvider>

        <Button variant="contained" color="primary" onClick={onSubmit}>
          Finalizar
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Escolher uma data.
      </Button>
      {todoDialog}
    </div>
  );
}
