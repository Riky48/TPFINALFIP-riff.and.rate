import imagen from '../../assets/DALL_E-2025-04-25-16.46-removebg-preview.png'
import './PublicacionInicio.css'


export const PublicacionInicio = () => {


    return (
        <div className="publish">
            <div className="publish-top">
                <div id="publishusr">
                    <img src={imagen} alt="Usuario" />
                </div>
                <div className="inputPost">
                    <textarea name="" id="postinput" placeholder="Crear Publicacion"></textarea>
                </div>
            </div>

            <div className="iconPost">
                <label htmlFor="fileInput" className="upload-btn imgpubli">
                    <img src="assets/Icon3.svg" alt="" />
                    <p>Contenido Multimedia</p>
                </label>
                <input type="file" id="fileInput" accept="image/*,video/*,.pdf,image/gif" className="file-input" multiple />
                <a href="" className="imgpubli"><img src="assets/Icon4.svg" alt="" /><p>Evento</p></a>
                <a href="" className="imgpubli"><img src="assets/icon5.svg" alt="" /><p>Artículo</p></a>
            </div>


            <div id="imagePreviewContainer" >
                <img id="imagePreview" />
            </div>
            <button id="publishBtn">Publicar</button>
        </div>
    )
};
    
export default PublicacionInicio;