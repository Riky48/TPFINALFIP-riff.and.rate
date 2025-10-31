import './Inicio.css'
import './Inicioresponsive.css'
import Axios from '../../Peticion feed/Usuario'
import { PublicacionInicio } from '../../components/PublicacionInicio/PublicacionInicio'


export function Inicio() {
    return (
        <>
            <div className="main">
                <main>
                    <PublicacionInicio />
                    <div id="contentPosted">
                        <Axios />
                    </div>
                    
                </main>
                <div className="contacts">
                    <div className="suggContact">

                    </div>
                </div>
            </div>
        </>
    )


}