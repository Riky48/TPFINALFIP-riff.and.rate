import { useRef, useState } from 'react';
import './Perfil.css';
import './PerfilResponsive.css';

function Perfil() {
  const profileImageUploadRef = useRef<HTMLInputElement>(null);
  const backgroundUploadRef = useRef<HTMLInputElement>(null);
  const bioImageUploadRef = useRef<HTMLInputElement>(null);

  const [profileImageSrc, setProfileImageSrc] = useState('');
  const [backgroundSrc, setBackgroundSrc] = useState('');
  const [bioImageSrc, setBioImageSrc] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(1234);

  const handleImageClick = () => {
    profileImageUploadRef.current?.click();
  };

  const handleBackgroundClick = () => {
    backgroundUploadRef.current?.click();
  };

  const handleBioImageClick = () => {
    bioImageUploadRef.current?.click();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: (src: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setState(result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecciona un archivo de imagen válido.');
    }
  };

  const handleFollowClick = () => {
    const newCount = isFollowing ? followersCount - 1 : followersCount + 1;
    setFollowersCount(newCount);
    setIsFollowing(!isFollowing);
  };

  return (
    <>
      {/* Contenedor del perfil */}
      <div
        className="container"
        style={{
          backgroundImage: backgroundSrc
            ? `url(${backgroundSrc})`
            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))',
        }}
      >
        <section className="profile-card">
          <div className="profile-header">
            <img
              id="profileImage"
              src={profileImageSrc}
              alt="Foto de perfil del usuario"
              title="Haz clic para cambiar la foto de perfil"
              onClick={handleImageClick}
            />
            <input
              type="file"
              ref={profileImageUploadRef}
              accept="image/*"
              onChange={(e) => handleFileChange(e, setProfileImageSrc)}
              className="hidden-input"
            />

            <div className="profile-info">
              <h1>Juan Pérez</h1>
              <p className="username">@guitarrista</p>
              <div className="profile-stats">
                <div>
                  <span id="followersCount" className="number">
                    {followersCount.toLocaleString()}
                  </span>
                  <span className="label">Seguidores</span>
                </div>
                <div>
                  <span id="followingCount" className="number">567</span>
                  <span className="label">Siguiendo</span>
                </div>
              </div>
              <p className="profile-description">
                Entusiasta de la tecnología y la innovación. Desarrollador web apasionado por crear experiencias únicas. Amante de los viajes y la naturaleza. ¡Compartamos conocimientos!
              </p>
              <button
                id="followBtn"
                onClick={handleFollowClick}
                className={`btn ${isFollowing ? 'following' : ''}`}
              >
                {isFollowing ? 'Siguiendo' : 'Seguir'}
              </button>
              <button
                className="btn background-btn"
                onClick={handleBackgroundClick}
              >
                Cambiar Fondo
              </button>
              <input
                type="file"
                ref={backgroundUploadRef}
                accept="image/*"
                onChange={(e) => handleFileChange(e, setBackgroundSrc)}
                className="hidden-input"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Biografía */}
      <section className="bio-card">
        <h2>Biografía</h2>

        {/* Imagen opcional de la biografía */}
        <div className="bio-image-container">
          {bioImageSrc ? (
            <img
              src={bioImageSrc}
              alt="Foto de la biografía"
              className="bio-image"
              onClick={handleBioImageClick}
              title="Haz clic para cambiar la imagen"
            />
          ) : (
            <button
              className="btn background-btn"
              onClick={handleBioImageClick}
            >
              Agregar foto
            </button>
          )}
          <input
            type="file"
            ref={bioImageUploadRef}
            accept="image/*"
            onChange={(e) => handleFileChange(e, setBioImageSrc)}
            className="hidden-input"
          />
        </div>

        {/* Sobre mí */}
        <h3>Sobre mí</h3>
        <p>
          Juan Pérez es un guitarrista y cantautor argentino que fusiona rock y
          sonidos latinoamericanos. Con más de 10 años de experiencia en escenarios,
          su música busca transmitir emociones profundas a través de letras sinceras
          y arreglos innovadores.
        </p>
        <p>
          Su pasión por la música se refleja en cada presentación y composición. Además,
          da talleres de guitarra y composición, y colabora con otros artistas
          emergentes de la región.
        </p>

        {/* Logros */}
        <h3>Logros destacados</h3>
        <ul>
          <li>Ganador del Festival Nacional de Rock 2022</li>
          <li>Colaboración con artistas reconocidos de Latinoamérica</li>
          <li>Más de 100 conciertos en vivo en los últimos 5 años</li>
        </ul>

        {/* Música y redes */}
        <h3>Música y redes</h3>
        <p>
          Escuchá su música en 
          <a href="https://spotify.com" target="_blank" rel="noreferrer"> Spotify</a>, 
          <a href="https://youtube.com" target="_blank" rel="noreferrer"> YouTube</a> 
          o seguí su trabajo en 
          <a href="https://instagram.com" target="_blank" rel="noreferrer"> Instagram</a>.
        </p>

        {/* Frase inspiradora */}
        <blockquote>
          "La música es mi forma de hablar con el mundo."
        </blockquote>
      </section>
    </>
  );
}

export default Perfil;



