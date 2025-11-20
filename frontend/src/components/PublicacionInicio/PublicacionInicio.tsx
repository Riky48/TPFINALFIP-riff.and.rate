import imagen from '../../assets/DALL_E-2025-04-25-16.46-removebg-preview.png'
import './PublicacionInicio.css'
import iconMultimedia from '../../assets/IconMultimedia.svg'
import iconEvento from '../../assets/IconEvento.svg'
import iconArticulo from '../../assets/iconArticulo.svg'
import type React from 'react'
import { useState } from 'react'
import { ContenedorNuevaPublicacion } from './ContenedorNuevaPublicacion/ContenedorNuevaPublicacion'
import { ContenedorNuevoArticulo } from './ContenedorNuevoArticulo/ContenedorNuevoArticulo'


export const PublicacionInicio: React.FC = () => {

    const [mostrarComponente, setMostrarComponente] = useState(false);

    const [mostrarComponenteArticle, setMostrarComponenteArticle] = useState(false);

    const handleClickArticle = () => {
        if (!mostrarComponenteArticle) {
            setMostrarComponenteArticle(true);
        }
    }

    const handleCloseArticle = () => {
        setMostrarComponenteArticle(false);
    };


    const handleClick = () => {
        if (!mostrarComponente) {
            setMostrarComponente(true);
        }
    }

        const handleClose = () => {
        setMostrarComponente(false);
    };

    return (
        <div className="publish">
            <div className="publish-top">
                <div id="publishusr">
                    <img src={imagen} alt="Usuario" />
                </div>
                <div className="inputPost">
                    <textarea name=""  id="postinput" placeholder="Di tu opinion sobre 💬... "
                        onClick={handleClick} onFocus={handleClick}
                    ></textarea>
                </div>
            </div>

            <div className="iconPost">
                <label onClick={handleClick}  className="upload-btn imgpubli">
                    <img src={iconMultimedia} alt="" />
                </label>
                
                <a href="" className="imgpubli"><img src={iconEvento} alt="" /></a>
                <label className='imgpubli' onClick={handleClickArticle}><img src={iconArticulo} alt="" /></label>
            </div>


            <div id="imagePreviewContainer" >
                <img id="imagePreview" />
            </div>
            {mostrarComponente && <ContenedorNuevaPublicacion onClose={handleClose} />}
            {mostrarComponenteArticle && <ContenedorNuevoArticulo onClose={handleCloseArticle} />}
        </div>
    )
};

export default PublicacionInicio;