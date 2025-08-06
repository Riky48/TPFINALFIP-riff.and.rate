import './Inicio.css'
import Axios from '../api/Axios'
import { PublicacionInicio } from '../components/PublicacionInicio/PublicacionInicio'


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
                    <div className="contacts">

                    </div>
                </div>
            </div>
        </>
    )


}