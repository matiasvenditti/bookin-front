import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../Home/Home'
import './Routes.css';
import Login from '../../session/Login/Login';

interface RoutesState {
    
}

interface RoutesProps {
    isLoggedIn: boolean,
}

export default class Routes extends Component<RoutesProps, RoutesState> {
    render() {
        const { isLoggedIn } = this.props;
        if (isLoggedIn) {
            return (
                <Switch>
                    <div className='routes-container'>
                        <Route exact path='/' component={Home}/>
                        
                    </div>
                </Switch>
            );
        } else {
            return (
                <Switch>
                    <div className='routes-container'>
                        <Route exact path='/' component={Home}/>
                        <Route path='/login' component={Login}/>
                        {/* <Route path='/register' component={Home}/> */}
                    </div>
                </Switch>
            );
        }
    }
}
