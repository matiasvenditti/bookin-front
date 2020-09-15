import React, { Component } from 'react';
import Router from "../Router/Router";
import { MuiThemeProvider } from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ResultsMenu } from '../../scenes/main/Results/ResultsMenu/ResultsMenu';


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
        },
        error: {
            main: '#ef476f',
            light: '#ff7c9d',
            dark: '#b70044'
        },
        warning: {
            main: '#ffd166',
            light: '#ffff97',
            dark: '#c9a036'
        },
        success: {
            main: '#06d6a0',
            light: '#63ffd1',
            dark: '#00a371'
        },
    }
});

interface AppProps {

}

interface AppState {

}

class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router />
            </MuiThemeProvider>
        );
    }
}

export default App;
