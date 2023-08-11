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



class App extends React.Component {
    render() {
        return (
            <>
            <Navbar />
            <div className="container">
                <Rotas/>
            </div>
            </>
        )

    }

}

export default App;
