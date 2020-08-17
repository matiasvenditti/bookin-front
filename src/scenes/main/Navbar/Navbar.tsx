import React, { Component } from 'react';
import {AppBar, Typography, Button, Toolbar} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import SearchInput from '../../../components/SearchInput/SearchInput';
import './Navbar.css';

interface NavbarState {
    location: any,
}

interface NavbarProps {
    isLoggedIn: boolean,
    locationPathname: string,
}

export default class Navbar extends Component<NavbarProps, NavbarState> {
    constructor(props: NavbarProps) {
        super(props);
        this.state = {
            location: props.locationPathname,
        };
    }

    render() {
        const { 
            isLoggedIn,
        } = this.props;
        // TODO delegar a LoggedInRoutes y NotLoggedInRoutes
        if (isLoggedIn) {
            return (
                <AppBar position='static'>
                    <Toolbar>
                        <Button><NavLink exact to='/'>Home</NavLink></Button>
                    </Toolbar>
                </AppBar>
            );
        } else {
            return (
                <AppBar position='static'>
                    <Toolbar>
                        <Typography>Book In</Typography>
                        <div className='search-input-container'>
                            <SearchInput />
                        </div>
                        <div>    
                            <Button component={NavLink} exact to='/'>Creá tu cuenta</Button>
                            <Button component={NavLink} to='/login'>Ingresá</Button>
                        </div>
                    </Toolbar>
                </AppBar>
            );
        }
    }

    getCurrentRoute() {
        const location = this.state.location;
        console.log(location);
        switch (location) {
            case '/': return 'Home';
            case '/login': return 'Sign In';
            case '/register': return 'Sign Up';
            
            default: return 'getCurrentRoute(' + location + ')?'
        };
    }
}
