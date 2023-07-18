import { render } from "@testing-library/react";
import React from "react";


    class App extends React.Component{
state = {
  numero1: '',
  numero2: '',
  resultado: ''
}

      render(){
        return (
          <div>
            <label>
              Primeiro Numero:
            </label>
            <input type ="text" value = {this.state.numero1} 
            onChange ={(e) => this.setState({numero1: e.target.value})}/>
             <label>
              Primeiro Numero:
            </label>
             <input type ="text" value = {this.state.numero2} 
            onChange ={(e) => this.setState({numero2: e.target.value})}/>
            <button onClick={() => this.setState({resultado: parseInt(this.state.numero1) + parseInt(this.state.numero2)})}>Somar </button>

            O resultado é: {this.state.resultado}
          </div>
        )
      }
    }

export default App;
