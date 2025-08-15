import './ContenedorNuevaPublicacion.css'
import { useState } from 'react'
import iconMultimedia from '../../../assets/IconMultimedia.svg'

type Props = {
  onClose: () => void;
};
export const ContenedorNuevaPublicacion: React.FC<Props> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [descripcion, setDescripcion] = useState('');
  const userId = 2; //Es de ejemplo, se puede cambiar por el usuario logueado

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handlePublicar = async () => {
    if (!descripcion) return alert('Escribí algo!');
    if (!file) return alert('Seleccioná un archivo');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('descripcion', descripcion);
    formData.append('userId', userId.toString());

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
        <p onClick={onClose}>-</p>
        <h3>Escribe tu publicación</h3>
        <button onClick={handlePublicar}>Publicar</button>
      </div>
      <textarea name="post" id="post" placeholder="Di tu opinion sobre 💬... " value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
      <div className="opciones">
        <label  className="upload-btn imgpubli">
          <img src={iconMultimedia} alt="" />
        <input type="file" id="fileInput" accept="image/*,video/*,.pdf,image/gif" className="file-input" onChange={handleFileChange} />
        </label>
        <p className='opcion'>2</p>
        <p className='opcion'>3</p>
        <p className='opcion'>4</p>
      </div>
    </div>

  )
}
