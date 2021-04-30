import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0a4e9b",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#FF0000",
    },
    background: {
      default: "#ebebeb",
    },
    grey: {
      "700": "#fff0",
    },
  },
});

export default theme;
