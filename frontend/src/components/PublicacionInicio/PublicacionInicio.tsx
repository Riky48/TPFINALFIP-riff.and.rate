import imagen from '../../assets/DALL_E-2025-04-25-16.46-removebg-preview.png'
import './PublicacionInicio.css'
import iconMultimedia from '../../assets/IconMultimedia.svg'
import iconEvento from '../../assets/IconEvento.svg'
import iconArticulo from '../../assets/iconArticulo.svg'
import type React from 'react'
import { useState } from 'react'
import { ContenedorNuevaPublicacion } from './ContenedorNuevaPublicacion/ContenedorNuevaPublicacion'

export const PublicacionInicio: React.FC = () => {
    
    const [mostrarComponente, setMostrarComponente] = useState(false);

    const handleClick = () => {
        setMostrarComponente(true);
    }
    return (
        <div className="publish">
            <div className="publish-top">
                <div id="publishusr">
                    <img src={imagen} alt="Usuario" />
                </div>
                <div className="inputPost">
                    <textarea name="" id="postinput" placeholder="Crear Publicacion" 
                    onClick={handleClick}></textarea>
                </div>
            </div>

            <div className="iconPost">
                <label htmlFor="fileInput" className="upload-btn imgpubli">
                    <img src={iconMultimedia} alt="" />
                </label>
                <input type="file" id="fileInput" accept="image/*,video/*,.pdf,image/gif" className="file-input" multiple />
                <a href="" className="imgpubli"><img src={iconEvento} alt="" /></a>
                <a href="" className="imgpubli"><img src={iconArticulo} alt="" /></a>
            </div>


            <div id="imagePreviewContainer" >
                <img id="imagePreview" />
            </div>
           {mostrarComponente && <ContenedorNuevaPublicacion />}
        </div>
    )
};
    
export default PublicacionInicio;