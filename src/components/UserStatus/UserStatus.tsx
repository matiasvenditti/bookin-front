import React from 'react';

type State = {
    username: string,
}

export class UserStatus extends React.Component<{}, State> {

    constructor(props: any){
        super(props);
        var u = this.getUsername
        this.state = {
            username: ""
        }
    }

    //tengo que ver si la persona ya esta logeada o no, para eso le pido el nombre de usuario de algun lado
    getUsername(){
        
    }

    //si la persona esta logueada, el boton de la barra de navegacion lo va a llevar a su perfil, de lo contrario el boton lo va a llevar a el inicio de sesion
    retrieveStatus(){
        if(this.state.username != ""){
            return(
                <button>Mi perfil</button>
            )
        }
        return(
            <button>Iniciar sesion</button>
        )
    }
    
    render(){
        return (
            <div>
            {this.retrieveStatus}
            </div>
        );
    }
}

export default UserStatus;