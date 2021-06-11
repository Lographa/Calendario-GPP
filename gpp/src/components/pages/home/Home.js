import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Toolbar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Slide,
  Typography,
  Grid,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import useStyles from "./HomeStyles"; //  CSS AQUI

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Header from "../../Header";
import Calendario from "../../Calendario";
import momentPlugin from "@fullcalendar/moment";
import ptLocale from "@fullcalendar/core/locales/pt-br";
import MenuLateral from "../MenuLateral";

import axios from "axios";

function Home() {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selecionado, setSelecionado] = useState("");

  const [lista, setlista] = useState([]);
  const [Rsposta, setRsposta] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleGetEvent();
  }, []);

  // metodo de API do calendario
  const onEventAdded = async (event) => {
    const responsePost = {
      title: event.title,
      start: event.start,
      end: event.end,
      coment: event.coment,
    };
    JSON.stringify(responsePost);
    const response = await axios.post(
      "https://8cg22.sse.codesandbox.io/calendar",
      responsePost
    );
    setEvents(response.data.resposta);
  };

  const handleGetEvent = async () => {
    let novaArray = [];
    const response = await axios.get(
      "https://8cg22.sse.codesandbox.io/calendar"
    );
    setEvents(response.data.resposta);
    events.forEach((element) => {
      novaArray.push({
        id: element.id,
      });
    });
    setRsposta(novaArray);
  };

  // metodo teste para criar evento ao clicar na data escolhida
  const handleDateSelect = (selectInfo) => {
    let title = prompt("De um nome para o evento ");
    let calendarApi = selectInfo.view.calendar;
    let coment = prompt("Comente esse evento ");
    calendarApi.unselect(); // limpa data selecionada

    if (title) {
      calendarApi.addEvent({
        title: title,
        coment: coment,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  // eventsSet={handleEvents} EVENTSSET
  const handleEvents = (events) => {
    setlista(events);
  };

  let urls = null;
  // função para remover uma data
  const dialogEventClickDelete = (clickInfo) => {
    var infoObj = clickInfo.event;
    console.log(infoObj.start)
    var comentario = infoObj.extendedProps.coment;
    const eventsss = {
      id: infoObj.id,
      title: infoObj.title,
      url: infoObj.url,
      coment: comentario,
      start: infoObj.start,
      end: infoObj.end,
    };
    setSelecionado(eventsss);
    handleClickOpen();
    clickInfo.jsEvent.preventDefault();
  };

  if (selecionado.url) {
    urls = (
      <Typography variant="h7" color="textPrimary">
        Algum site: {selecionado.url}
      </Typography>
    );
  }
  
  const handleEventClickDelete = async () => {
    try {
      let calendarApi = calendarRef.current.getApi();
      const novos = calendarApi.getEvents();
      let retorna = novos.find((element) => element.id == selecionado.id);
      console.log(retorna);

      console.log(selecionado.id);
      const resposta = await axios.delete(
        "https://8cg22.sse.codesandbox.io/calendar" + "?id=" + selecionado.id
      );
      retorna.remove();
      handleClose();
    } catch (erro) {}
  };
  // caixa que abre ao selecionar uma data ja criada
  const CaixaDeInfo = (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {selecionado.title}
        </DialogTitle>
        
        <Typography variant="button" color="textPrimary">
          Marcado: {selecionado.start ? ((selecionado.start.getDate() )) + "/" + ((selecionado.start.getMonth() + 1)) + "/" + selecionado.start.getFullYear() : ""}
        </Typography>
        <Typography variant="button" color="textPrimary">
          Marcado: {selecionado.end ? ((selecionado.end.getDate() )) + "/" + ((selecionado.end.getMonth() + 1)) + "/" + selecionado.end.getFullYear() : ""}
        </Typography>
        <Typography variant="h7" color="textPrimary">
          Informação: {selecionado.coment}
        </Typography>
        {urls}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEventClickDelete} color="primary">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  const handleUpdateEvent = () => {
    var id = prompt("escreve id");
    let calendarApi = calendarRef.current.getApi();
    calendarApi.getEventById(id);
    alert(`Excluido ${calendarApi.title}`);
  };

  return (
    <div>
      <Header />
      <Grid className={classes.calendario}>
        {/* <div className={classes.root}>
      {/*  
    </div> */}

        <section>
          <Grid container direction="row" justify="center" alignItems="center">
            {/* butao sendo testado para obter evento por id */}
            {/* <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateEvent}
            >
              visualizar por id
            </Button>
            {/* comando de fetch para puxar do backend 
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => handleSubmitGet(event)}
            >
              Testar o fetch
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleGetEvent()}
            >
              Testar o axios
            </Button> */}
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <div className={classes.root1} >
            <MenuLateral lista={lista} calendarRef={calendarRef} />
            <Calendario onEventAdded={(event) => onEventAdded(event)} />
            </div>
          </Grid>

          {/* ABAIXO ESTÁ TODO FULLCALENDAR */}
          <div style={{ position: "relative", zIndex: 0 }}>
            {" "}
            {/*  para colocar o tamanho  width: "1300px" */}
            <FullCalendar
              headerToolbar={{
                left: "prevYear prev,next nextYear today",
                center: "title",
                right: "dayGridMonth timeGridWeek timeGridDay",
              }}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                momentPlugin,
              ]}
              contentHeight={650} // altura dos quadrados das datas
              locale={ptLocale}
              eventClick={dialogEventClickDelete}
              ref={calendarRef}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              select={handleDateSelect}
              events={events}
              eventsSet={handleEvents}
            />
          </div>

          {CaixaDeInfo}
        </section>
      </Grid>
    </div>
  );
}

export default Home;
