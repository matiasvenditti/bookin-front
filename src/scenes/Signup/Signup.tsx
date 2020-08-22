import React from "react";

type State = {
    name: string,
    surname: string,
    username: string
}
//tengo todo esto de referencia, no tiene funcion alguna. Si me olvido de borrarlo a la hora de hacer el push y causa problemas, por favor borrarlo
export class Signup extends React.Component<{}, State>{

    constructor(props: any) {
        super(props);
        this.state = {
          name: "",
          surname: "",
          username: ""
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
      }
    
      handleInputChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = event.name;
        this.setState((prevState: State) => ({
            ...prevState,
            [name]: value
        }))
    }

      render(){
          return(
              <div>
                  estas en la creacion de cuenta
              </div>
          )
      }

}

export default Signup