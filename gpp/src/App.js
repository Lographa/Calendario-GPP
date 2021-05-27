//import './App.css';
import React, { useState } from "react";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
  CssBaseline,
  useMediaQuery,
} from "@material-ui/core";
import Home from "./components/pages/home/Home";
import Header from "./components/Header";
import SignIn from "./components/pages/SignIn";
import GuestRoute from "./routes/GuestRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

import './mock';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createMuiTheme({
    spacing: 4,
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#f44336",
      },
      secondary: {
        main: "#3EA6FF",
      },
      background: {
        default: darkMode ? "#232323" : "#FFF",
        dark: darkMode ? "#181818" : "#f4f6f8",
        paper: darkMode ? "#232323" : "#FFF",
      },
    },
  });

  return (
    <Provider store={store}>
<ThemeProvider theme={theme}>
      {/* <Header darkMode={darkMode} setDarkMode={setDarkMode}/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <GuestRoute path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<h1>nenhuma pagina</h1>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </Provider>
  );
}

export default App;
