import React from "react";
import UserStatus from "../UserStatus/UserStatus";
import AppBar from '@material-ui/core/AppBar'
import { InputBase, fade, Theme, makeStyles, createStyles, Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import "./Header.css";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

type State = {
  username: string,
  isLoggedIn: boolean,
  anchorEl: Element | null
}


export class Header extends React.Component<{}, State>{


  constructor(props: any) {
    super(props);
    this.state = {
        username: "",
        isLoggedIn: true,
        anchorEl: null
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setAnchorEl = this.setAnchorEl.bind(this);
  }

  handleMenu(event: React.MouseEvent<HTMLElement>) {
    this.setAnchorEl(event.currentTarget);
  }
  handleClose() {
    this.setAnchorEl(null);
  }
  setAnchorEl(anchorEl: Element | null) {
    this.setState((prevState: State) => ({
        ...prevState,
        anchorEl: anchorEl
    }))
  }



    
    render(){
      
            const button = (
              <div className='button'> 
                <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group" >
                  <Button>Log In</Button>
                  <Button href='/signup'>Sign Up</Button>
                </ButtonGroup>         
              </div>
            )

            const menu = (
              <div className="button">
                  <IconButton onClick={this.handleMenu}>
                      <AccountCircle/>
                  </IconButton>
                  <Menu
                      id="menu-appbar"
                      anchorEl={this.state.anchorEl}
                      onClose={this.handleClose}
                      anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                      }}
                      open={Boolean(this.state.anchorEl)}>
                      <MenuItem onClick={this.handleClose}>Perfil</MenuItem>
                      <MenuItem onClick={this.handleClose}>Autores</MenuItem>
                  </Menu>
              </div>
          )
      
  
            const navData = this.state.isLoggedIn ? menu : button

        return(
            <AppBar position='static' color='primary' className='header'>
              <Toolbar>
                <h2 >Book in</h2>
              <div className='search'>
                <div className='searchIcon'>
                  <SearchIcon className='iconLogo'/>
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
                    {navData}
            </Toolbar>
          </AppBar> 
        )
    }

}

export default Header