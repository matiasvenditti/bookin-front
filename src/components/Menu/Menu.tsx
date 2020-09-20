import React from "react";
import Header from "../Header/Header";
import "./Menu.css"

interface MenuProps {
    logoutCallback(): void,
    nowIsLogged: boolean,
    roles: string[]
}
// Our component state structure, only containing a user array.
// Stateful class component extending React Component class with our database users.
export class Menu extends React.Component<MenuProps, {}> {

    // Render knows how to display users information in table format.
    render() {
        return (
            <div>
                <Header logoutCallback={this.props.logoutCallback} nowIsLogged={this.props.nowIsLogged} roles={this.props.roles} />
            </div>
        )
    }

}

export default Menu;