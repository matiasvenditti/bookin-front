import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import React from "react";
import {User} from "../../model/User";
import {getAllUsers} from "../../services/UserService";
import {AxiosResponse} from "axios";

// Our component state structure, only containing a user array.
type State = {
    users: User[]
}

// Stateful class component extending React Component class with our database users.
class UserTable extends React.Component<{}, State> {

    // Our table headers for user information.
    headers: string[] = [
        "ID",
        "FirstName",
        "LastName",
        "UserName"
    ];

    constructor(props: any) {
        super(props);
        this.state = {
            users: []
        };
    }

    // After component mount we fetch user data from backend API via exported function getAllUsers.
    componentDidMount() {
        getAllUsers()
            .then((response: AxiosResponse<User[]>) => {
                this.setState({users: response.data})
            })
            .catch((e) => {
                console.error(e);
            })
    }

    // Render user table with header data and users retrieved from backend.
    render() {
        const users = this.state.users.map((user: User) => (
          <TableRow key={user.id.toString()}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.username}</TableCell>
          </TableRow>
        ));

        const headers = this.headers.map((header: string) => <TableCell key={header}>{header}</TableCell>);
        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {users}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default UserTable;