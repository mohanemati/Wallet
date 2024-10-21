import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesWithAnimation from "./provider/RoutesWithAnimation";
import { theme } from "./theme/Theme";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <RoutesWithAnimation />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
