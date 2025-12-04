import './ContenedorNuevoArticulo.css';
import { useEffect, useState, useRef } from 'react';
import iconMultimedia from '../../../assets/image-solid-full.svg';
import 'animate.css';
import iconUpload from '../../../assets/arrow-up-from-bracket-solid-full.svg'
import PostFeed from '../PostFeed/Postfeed'


type Props = {
  onClose: () => void;
};

export const ContenedorNuevoArticulo: React.FC<Props> = ({ onClose }) => {
  const ANIMATION_IN = 'animate__animated animate__zoomIn animate__faster';
  const ANIMATION_OUT = 'animate__animated animate__zoomOut animate__faster';


  const [isPublishing, setIsPublishing] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string[]>([]);
  const [descripcion, setDescripcion] = useState('');
  const [content, setContent] = useState('');
  const [animationClass, setAnimationClass] = useState(ANIMATION_IN);
  const [isClosing, setIsClosing] = useState(false);
  const userId = 2;


  const [activo, setActivo] = useState(false)
  const claseActiva = () => {
    setActivo(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };

  useEffect(() => {
    if (files.length > 0) {
      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrl(urls);
      return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [files]);

  const handlePublicar = async () => {
    if (isPublishing) return;
    setIsPublishing(true);
    try {
      const type = 'article';
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      formData.append('title', descripcion.toString());
      formData.append('id', userId.toString());
      formData.append('content', content.toString());
      formData.append('type', type.toString());
      await PostFeed({ formData, handleCloseClick })
    } catch (err) {
      console.error(err);
      handleCloseClick()
    }
    finally {
      setIsPublishing(false);
    }
  };

  const handleCloseClick = () => {
    if (isClosing) return;
    setIsClosing(true);
    setAnimationClass(ANIMATION_OUT);
  };

  return (
    <div id='componente-articulo'
      className={`componente-articulo ${animationClass}`}
      onAnimationEnd={() => {
        if (animationClass === ANIMATION_OUT) {
          onClose();
        }
      }}
      style={{ '--animate-duration': '0.9s' } as React.CSSProperties}
    >
      <div className="close-btn">
        <h3>Escribe tu publicación</h3>
        <p onClick={handleCloseClick}>X</p>
      </div>

      {previewUrl.length > 0 && (
        <div className={activo ? 'opcional opcional_img' : 'oculto'} >
          {files.map((file, i) => {
            const url = previewUrl[i];
            if (file.type.startsWith("image/")) {
              return <img key={i} src={url} alt="Preview" className="preview" />;
            } else if (file.type.startsWith("video/")) {
              return <video key={i} src={url} controls className="preview-video" />;
            } else if (file.type === "application/pdf") {
              return (
                <embed
                  key={i}
                  src={url}
                  type="application/pdf"
                  width="100%"
                  height="400px"
                  className="preview-pdf"
                />
              );
            } else {
              return (
                <div key={i} className="preview-file">
                  <p>📄 {file.name}</p>
                </div>
              );
            }
          })}
        </div>
      )}


      <div className={activo ? 'oculto' : 'opcional'}>
        <img src={iconMultimedia} alt="" className='img' />
        <p>Añade una imagen o un video de portada a tu articulo</p>
        <label id='upload-content button-content' onClick={claseActiva}>
          <img src={iconUpload} alt="" className='img' />
          <p>Subir imagen</p>
          <input
            type="file"
            id="fileInput"
            multiple
            accept="image/*,video/*,image/gif"
            className="file-input"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <textarea
        name="post"
        id="post"
        placeholder="Titulo 💬"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      ></textarea>

      <textarea
        name="content"
        id="content"
        placeholder="Escribe tu artículo aquí 🖊"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <button onClick={handlePublicar} id='btnpublish' disabled={isPublishing}>{isPublishing ? 'Publicando...' : 'Publicar'}</button>
     
     
    </div>
  );
};
