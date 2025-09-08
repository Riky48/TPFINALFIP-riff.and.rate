import { useRef, useState } from 'react';
import './Perfil.css';

function Perfil() {
  const profileImageUploadRef = useRef<HTMLInputElement>(null);
  const backgroundUploadRef = useRef<HTMLInputElement>(null);

  const [profileImageSrc, setProfileImageSrc] = useState('');
  const [backgroundSrc, setBackgroundSrc] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(1234);

  const handleImageClick = () => {
    profileImageUploadRef.current?.click();
  };

  const handleBackgroundClick = () => {
    backgroundUploadRef.current?.click();
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
            id="profileImageUpload"
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
  );
}

export default Perfil;
