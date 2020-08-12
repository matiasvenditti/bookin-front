import {TableCell, TableRow} from "@material-ui/core";
import React from "react";
import {User} from "../../model/User";

// Our component props structure.
type Prop = {
    user: User
    key: string
}

// Functional component, for stateless components we can define components as a simple function.
export const UserCell = (props: Prop) => {
    return (
        <TableRow>
            <TableCell>{props.user.id}</TableCell>
            <TableCell>{props.user.firstName}</TableCell>
            <TableCell>{props.user.lastName}</TableCell>
            <TableCell>{props.user.username}</TableCell>
        </TableRow>
    );
}