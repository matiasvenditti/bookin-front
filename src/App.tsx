import Menu from './scenes/Menu/Menu'
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact><Menu/></Route>
            </Switch>
        </BrowserRouter>
    );
  }
  
  export default App;