import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';

const initialState = {
    token: null,
    role: '',
    isLoggedIn: false,
    profile: {},
    // mas categorias de datos...
}

export default class App extends Component {
    constructor(props: Object) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div className='app-container'>
                <Navbar />
            </div>
        )
    }
}
