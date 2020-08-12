import React from "react";
import {User} from "../../model/User";
import UserCell from "../../components/UserCell/UserCell";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {getAllUsers} from "../../services/UserService";
import {AxiosResponse} from "axios";

type State = {
    users: User[]
}

export class Menu extends React.Component<{}, State> {

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

    componentDidMount() {
        getAllUsers()
            .then((response: AxiosResponse<User[]>) => {
                this.setState({users: response.data})
            })
            .catch((e) => {
                console.error(e);
            })
    }

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