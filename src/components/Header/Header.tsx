import React from "react";
import UserStatus from "../UserStatus/UserStatus";
import AppBar from '@material-ui/core/AppBar'
import { InputBase, fade, Theme, makeStyles, createStyles, Toolbar, IconButton, Menu, MenuItem, Typography, withStyles } from "@material-ui/core";
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

const styles = (theme: Theme) => ({
  root: {
      flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  menuButton: {
      marginRight: theme.spacing(2),
  },
  search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
      },
  },
  searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  inputRoot: {
      color: 'inherit',
  },
  inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
              width: '20ch',
          },
      },
  },
});

export class Header extends React.Component<any, State>{


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

            const { classes } = this.props;
      
            const button = (
              <div className='button'> 
                <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group" >
                  <Button>Iniciar Sesión</Button>
                  <Button href='/signup'>Registrarte</Button>
                </ButtonGroup>         
              </div>
            )

            const menu = (
              <div className="button">
                  <IconButton onClick={this.handleMenu}>
                      <AccountCircle fontSize='large'/>
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
                      <MenuItem onClick={this.handleClose}>Ver Perfil</MenuItem>
                      <MenuItem onClick={this.handleClose}>Ver Riseñas</MenuItem>
                      <MenuItem onClick={this.handleClose}>Crear Autor</MenuItem>
                      <MenuItem onClick={this.handleClose}>Cerrar Sesión</MenuItem>

                  </Menu>
              </div>
          )
      
  
            const navData = this.state.isLoggedIn ? menu : button

        return(
            <AppBar position='static' color='primary' className={classes.title}>
              <Toolbar>
                <Typography variant='h6'>
                    Book in
                </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon/>
                </div>
                  <InputBase
                    placeholder="Buscar"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
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

// @ts-ignore
export default withStyles(styles)(Header);