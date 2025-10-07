import './ContenedorNuevaPublicacion.css'
import { useEffect, useState } from 'react'
import iconMultimedia from '../../../assets/IconMultimedia.svg'

type Props = {
  onClose: () => void;
};
export const ContenedorNuevaPublicacion: React.FC<Props> = ({ onClose }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string[]>([]);
  const [descripcion, setDescripcion] = useState('');
  const userId = 2; //Es de ejemplo, se puede cambiar por el usuario logueado

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

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('content', descripcion);
    formData.append('id_user', userId.toString());

    try {
      const res = await fetch('http://localhost:3000/posts/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log('Post creado:', data);
      alert('¡Post subido correctamente!');
      onClose(); // cerrar el contenedor después de subir
    } catch (err) {
      console.error(err);
      alert('Error al subir el post');
    }
  };
  return (
    <div className="componente-extra">
      <div className="close-btn" onClick={onClose}>
        <p>x</p>
        <h3>Escribe tu publicación</h3>
      </div>
      <textarea name="post" id="post" placeholder="Di tu opinion sobre 💬... " value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
      <div className="opciones">
        <label className="upload-btn imgpubli">
          <img src={iconMultimedia} alt="" />
          <input type="file" id="fileInput" multiple accept="image/*,video/*,.pdf,image/gif" className="file-input" onChange={handleFileChange} />
        </label>
        <p className='opcion'>2</p>
        <p className='opcion'>3</p>
        <p className='opcion'>4</p>
        <button onClick={handlePublicar}>Publicar</button>
      </div>
      {/* PREVISUALIZACIÓN */}
    
      {previewUrl.length > 0 && (
        <div className="preview-container">
          {files.map((file, i) => {
            const url = previewUrl[i];
            if (file.type.startsWith("image/")) {
              return <img key={i} src={url} alt="Preview" className="preview-img" />;
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
    </div>

  )
}
