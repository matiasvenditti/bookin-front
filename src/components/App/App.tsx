import React from 'react';
import Router from "../Router/Router";
import { MuiThemeProvider } from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f71735',
            light: '#ff5f5f',
            dark: '#bb000e',
            contrastText: '#000000'
        },
        secondary: {
            main: '#5d566b',
            light: '#8a8399',
            dark: '#332d40',
            contrastText: '#ffffff'
        }
    }
});

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            {/* <Navbar/> <-- navbar component here */}
            <Router />
        </MuiThemeProvider>
    );
}

export default App;