import {TableCell, TableRow} from "@material-ui/core";
import React from "react";
import {User} from "../../model/User";

type Prop = {
    user: User
    key: string
}

class UserCell extends React.Component<Prop, {}> {

    render() {
        const user: User = this.props.user;
        return <TableRow>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.username}</TableCell>
        </TableRow>
    }

}

export default UserCell