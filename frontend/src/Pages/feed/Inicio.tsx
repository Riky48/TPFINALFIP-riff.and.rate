import './Inicio.css';
import './Inicioresponsive.css';
import FeedContainer from "../../components/Peticion_feed/FeedContainer/FeedContainer";
import { PublicacionInicio } from '../../components/PublicacionInicio/PublicacionInicio';


export function Inicio() {
    return (
        <>
            <div className="main">
                <main>
                    <PublicacionInicio />
                    <div id="contentPosted">
                        <FeedContainer />
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