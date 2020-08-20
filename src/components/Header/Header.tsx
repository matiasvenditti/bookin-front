import React from "react";
import UserStatus from "../UserStatus/UserStatus";
import AppBar from '@material-ui/core/AppBar'
import { InputBase, fade, Theme, makeStyles, createStyles } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import "./Header.module.css";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

type State = {
    username: string
}




export class Header extends React.Component<{}, State>{


  constructor(props: any) {
        super(props);
        this.state = {
          username: ""
        };
        
    }

    render(){
      

        return(
            <AppBar position='static' color='primary'>
                <h2 >Book in</h2>
              <div className='search'>
                <div className='searchIcon'>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: 'inputRoot',
                    input: 'inputInput',
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
            </div> 
            <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
              <Button>Log In</Button>
              <Button href='/signup'>Sign Up</Button>
            </ButtonGroup>         
          </AppBar> 
        )
    }

}

export default Header