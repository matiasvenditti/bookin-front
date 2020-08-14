import React from "react";
import UserTable from "../../components/UserTable/UserTable";

// Our component state structure, only containing a user array.
// Stateful class component extending React Component class with our database users.
export class Menu extends React.Component<{}, {}> {

    // Render knows how to display users information in table format.
    render() {
        return (
            <UserTable/>
        )
    }

}

export default Menu;