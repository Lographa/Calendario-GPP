import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Toolbar,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
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
import {INITIAL_STATE} from "../../../utils/utlis";

function handleSubmit(event) {
  //console.log(event)
  fetch("https://8cg22.sse.codesandbox.io/calendar", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: event.title,
      start: event.start,
      end: event.end,
      coment: event.coment,
    }),
  }).then((response) => response.json());
  // .then((response) => {
  //   console.log(event);
  // });
}

function handleSubmitGet(event) {
  // const request = new XMLHttpRequest()

  // request.open("GET", "https://8cg22.sse.codesandbox.io/calendar")
  // console.log(request)

  fetch("https://8cg22.sse.codesandbox.io/calendar?id=1", {
    method: "GET",
    mode: "cors",
    cache: "default",
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.resposta);
      return (event = response.data);
    });
}

function Home() {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selecionado, setSelecionado] = useState("");
  //console.log(selecionado);
  console.log(calendarRef)
const [lista, setlista] = useState([])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   handleGetEvent();
  // }, [])

  // teste para ve se o events do calendar recebe uma arrays
  // const valorqualquer = [
  //   { id: "100", title: "event 1", start: "2021-05-12", end: "2021-05-13" },
  //   {
  //     title: "event 2",
  //     start: "2021-05-14",
  //     end: "2021-05-16",
  //     coment: "qualquer texto visivel",
  //   },
  //   {
  //     title: "event com url",
  //     start: "2021-05-16",
  //     end: "2021-05-17",
  //     url: "https://www.youtube.com/",
  //   },
  // ];

  // metodo de API do calendario
  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    handleSubmit(event);
    calendarApi.addEvent(event);
    //console.log(event);
  };

  const handleGetEvent = async () => {
    const response = await axios.get(
      "https://8cg22.sse.codesandbox.io/calendar"
    );
    setEvents(response.data.resposta);
    //console.log(events);
  };

  // metodo teste para criar evento ao clicar na data escolhida
  const handleDateSelect = (selectInfo) => {
    let title = prompt("De um nome para o evento ");
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // limpa data selecionada

    if (title) {
      calendarApi.addEvent({
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  // eventsSet={handleEvents} EVENTSSET
  const handleEvents = (events) => {
    setlista(events)
    // console.log(events);
    // setLista(events)
  };

  // função para remover uma data
  const dialogEventClickDelete = (clickInfo) => {
    var infoObj = clickInfo.event;
    console.log(clickInfo.event.extendedProps);
    var comentario = infoObj.extendedProps.coment;
    const eventsss = {
      id: infoObj.id,
      title: infoObj.title,
      url: infoObj.url,
      coment: comentario,
      start: infoObj.startStr,
      end: infoObj.endStr,
    };
    //console.log(eventsss);
    clickInfo.jsEvent.preventDefault();
    setSelecionado(eventsss);
    handleClickOpen();
    clickInfo.jsEvent.preventDefault();
  };

  const handleEventClickDelete = () => {
    let calendarApi = calendarRef.current.getApi();
    const novos = calendarApi.getEvents();
    let retorna = novos.find((element) => element.id == selecionado.id);
    retorna.remove();
    handleClose();
    //retorna.jsEvent.preventDefault();
  };

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
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        </DialogContent>
        <Typography variant="h7" color="textPrimary">
          Marcado: {selecionado.start} {selecionado.end}
        </Typography>
        <Typography variant="h7" color="textPrimary">
          Informação: {selecionado.coment}
        </Typography>
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
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            
          >
            {/* butao sendo testado para obter evento por id */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateEvent}
            >
              visualizar por id
            </Button>
            {/* comando de fetch para puxar do backend */}
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
            </Button>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            
          >
            <MenuLateral lista={lista} calendarRef={calendarRef} />
            <Calendario onEventAdded={(event) => onEventAdded(event)} />
          </Grid>

          {/* ABAIXO ESTÁ TODO FULLCALENDAR */}
          <div style={{ position: "relative", zIndex: 0 }}>
            <FullCalendar
              header={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
              }}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                momentPlugin,
              ]}
              locale={ptLocale}
              eventClick={dialogEventClickDelete}
              ref={calendarRef}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              select={handleDateSelect}
              // events={valorqualquer}
              eventsSet={handleEvents}
              // eventsAdd={(e) =>console.log(e.coment)}
            />
          </div>

          {CaixaDeInfo}
        </section>
      </Grid>
    </div>
  );
}

export default Home;
