import React from "react";
import UserTable from "../../components/UserTable/UserTable";
import Person from "../../components/Person/Person";

// Our component state structure, only containing a user array.
// Stateful class component extending React Component class with our database users.
export class Menu extends React.Component<any, {}> {

    // Render knows how to display users information in table format.
    render() {
        return (
            <div>
                <Person name={"Matias"} surname={"Gayo"} />
                <UserTable/>
            </div>
        )
    }

    componentDidMount() {
        const params: string = this.props.match.params
        console.log(params);
    }

}

export default Menu;