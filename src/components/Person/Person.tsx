import React from "react";
import { Redirect } from "react-router-dom";

type PersonProp = {
    name: string,
    surname: string
}

type PersonState = {
    time: Date
}

class Person extends React.Component<PersonProp, PersonState> {

    constructor(props: PersonProp) {
        super(props);
        this.state = {
            time: new Date()
        }
    }

    updateTime() {
        // Actualizo el tiempo de mi estado
        this.setState({
            time: new Date()
        })
    }

    componentDidMount() {
        setInterval(this.updateTime.bind(this), 1000)
    }

    render() {

        return (
            <div>
                <label>{this.props.name}</label>
                <label>{this.props.surname}</label>
                <label>{this.state.time.toString()}</label>
            </div>
        )
    }
}

export default Person;