import React from "react";
import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.css'
import Rotas from "./rotas";
import '../custom.css'
import Navbar from '../components/navbar'
import 'toastr/build/toastr.css'
import 'primereact/resources/themes/nova/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import ProvedorAutenticacao from "./provedorAutenticacao";



class App extends React.Component {

    render(){
      return(
        <ProvedorAutenticacao>
          <Navbar />
          <div className="container">    
              <Rotas />
          </div>
        </ProvedorAutenticacao>
      )
    }
  }
  
  export default App
