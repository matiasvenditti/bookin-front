import React from "react";
import {User} from "../../model/User";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {getAllUsers} from "../../services/UserService";
import {AxiosResponse} from "axios";
import {UserCell} from "../../components/UserCell/UserCell";

// Our component state structure, only containing a user array.
type State = {
    users: User[]
}

// Stateful class component extending React Component class with our database users.
export class Menu extends React.Component<{}, State> {

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

    // Render knows how to display users information in table format.
    render() {
        const cells = this.state.users.map((user: User) => <UserCell key={user.id.toString()} user={user}/>);
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
                        {cells}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

}

export default Menu;