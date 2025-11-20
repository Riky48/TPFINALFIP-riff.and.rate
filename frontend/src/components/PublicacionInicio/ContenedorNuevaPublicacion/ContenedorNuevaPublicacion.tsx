import './ContenedorNuevaPublicacion.css';
import { useEffect, useState } from 'react';
import iconMultimedia from '../../../assets/IconMultimedia.svg';
import 'animate.css';
import PostFeed from '../PostFeed/Postfeed'
import iconPDF from '../../../assets/pdf.png'

type Props = {
  onClose: () => void;
};

export const ContenedorNuevaPublicacion: React.FC<Props> = ({ onClose }) => {
  const ANIMATION_IN = 'animate__animated animate__zoomIn animate__faster';
  const ANIMATION_OUT = 'animate__animated animate__zoomOut animate__faster';

  const [isPublishing, setIsPublishing] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string[]>([]);
  const [descripcion, setDescripcion] = useState('');
  const [animationClass, setAnimationClass] = useState(ANIMATION_IN);
  const [isClosing, setIsClosing] = useState(false);
  const userId = 2;

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
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      formData.append('content', descripcion);
      formData.append('id_user', userId.toString());
      formData.append('type', 'post');

      await PostFeed({ formData, handleCloseClick })
    }
    catch (err) {
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
    <div
      className={`componente-extra ${animationClass}`}
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

      <textarea
        name="post"
        id="post"
        placeholder="Di tu opinión sobre 💬... "
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      ></textarea>

      {previewUrl.length > 0 && (
        <div className="preview-container">
          {files.map((file, i) => {
            const url = previewUrl[i];

            if (file.type.startsWith("image/")) {
              return <img key={i} src={url} alt="Preview" className="preview-img" />;
            }
            else if (file.type.startsWith("video/")) {
              return <video key={i} src={url} controls className="preview-video" />;
            }
            else if (file.type === "application/pdf") {
              return (
                <div key={i} className="preview-file">
                  <img src={iconPDF} alt="PDF File" className="icon-pdf" />
                  {/* <p>{file.name}</p> */}
                </div>
              );
            }
            else {
              return (
                <div key={i} className="preview-file">
                  <p>📄 {file.name}</p>
                </div>
              );
            }
          })}
        </div>
      )}


      <div className="opciones">
        <label className="upload-btn imgpubli">
          <img src={iconMultimedia} alt="" />
          <input
            type="file"
            id="fileInput"
            multiple
            accept="image/*,video/*,.pdf,image/gif"
            className="file-input"
            onChange={handleFileChange}
          />
        </label>
        <p className="opcion"></p>
        <p className="opcion"></p>
        <p className="opcion"></p>
      </div>

      <button onClick={handlePublicar} id='btnpublish' disabled={isPublishing}>{isPublishing ? 'Publicando...' : 'Publicar'}</button>


    </div >
  );
};
