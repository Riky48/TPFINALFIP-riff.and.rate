import { useRef, useState, useEffect } from 'react';
import './Perfil.css';
import './PerfilResponsive.css';

type AvailabilityOption = 'Clases' | 'Colaboraciones' | 'Conciertos';

interface SavedData {
  genres: string[];
  instrument: string;
  experienceYears: number;
  skillLevel: string;
  influences: string;
  projects: string;
  availability: AvailabilityOption[];
  musicLink: string;
  equipment: string;
}

function Perfil() {
  const profileImageUploadRef = useRef<HTMLInputElement>(null);
  const backgroundUploadRef = useRef<HTMLInputElement>(null);

  const [profileImageSrc, setProfileImageSrc] = useState('');
  const [backgroundSrc, setBackgroundSrc] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  // Usuario autenticado (datos reales)
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<number | null>(null);

  // Perfil musical
  const [genres, setGenres] = useState<string[]>([]);
  const [instrument, setInstrument] = useState('');
  const [experienceYears, setExperienceYears] = useState<number>(0);
  const [skillLevel, setSkillLevel] = useState('');
  const [influences, setInfluences] = useState('');
  const [projects, setProjects] = useState('');
  const [availability, setAvailability] = useState<AvailabilityOption[]>([]);
  const [musicLink, setMusicLink] = useState('');
  const [equipment, setEquipment] = useState('');
  const [savedData, setSavedData] = useState<SavedData | null>(null);

  const [feedback, setFeedback] = useState('');
  const token = localStorage.getItem('token');

  // ------------------ OBTENER USUARIO REAL ------------------
  useEffect(() => {
    if (!token) return;

    fetch('http://localhost:3000/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setUserId(data.id); // <--- EL ID REAL DEL USUARIO
      })
      .catch((err) => console.error('Error cargando usuario:', err));
  }, []);

  // ------------------ CARGAR PERFIL MUSICAL ------------------
  const fetchMusicianProfile = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/perfil/musical/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        setFeedback('❌ Tu sesión expiró. Volvé a iniciar sesión.');
        return;
      }

      if (!response.ok) throw new Error('Error al obtener perfil musical');

      const data = await response.json();

      const loadedGenres = data.genres ? data.genres.split(', ') : [];
      const loadedAvailability = data.availability
        ? data.availability.split(', ')
        : [];

      setGenres(loadedGenres);
      setInstrument(data.instrument || '');
      setExperienceYears(data.experience_years || 0);
      setSkillLevel(data.skill_level || '');
      setInfluences(data.influences || '');
      setProjects(data.projects || '');
      setAvailability(loadedAvailability);
      setMusicLink(data.music_link || '');
      setEquipment(data.equipment || '');

      setSavedData({
        genres: loadedGenres,
        instrument: data.instrument,
        experienceYears: data.experience_years,
        skillLevel: data.skill_level,
        influences: data.influences,
        projects: data.projects,
        availability: loadedAvailability,
        musicLink: data.music_link,
        equipment: data.equipment,
      });

      setFeedback('🎵 Perfil musical cargado correctamente.');
    } catch (err) {
      console.error(err);
      setFeedback('❌ No se pudo cargar el perfil musical.');
    }
  };

  useEffect(() => {
    if (userId) fetchMusicianProfile(userId);
  }, [userId]);

  // ------------------ GUARDAR PERFIL MUSICAL ------------------
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !userId) {
      setFeedback('❌ Error: no se encontró el usuario autenticado.');
      return;
    }

    const payload = {
      instrument,
      experience_years: experienceYears,
      skill_level: skillLevel,
      influences,
      projects,
      availability: availability.join(', '),
      music_link: musicLink,
      equipment,
      genres: genres.join(', '),
    };

    try {
      const response = await fetch(`http://localhost:3000/perfil/musical/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        setFeedback('❌ Sesión expirada. Iniciá sesión otra vez.');
        return;
      }

      if (!response.ok) throw new Error('Error al guardar perfil musical');

      await fetchMusicianProfile(userId);
      setFeedback('✅ Perfil musical guardado correctamente.');
    } catch (err) {
      console.error(err);
      setFeedback('❌ Error al guardar el perfil musical.');
    }
  };

  // ------------------ MANEJO DE IMÁGENES ------------------
  const handleImageClick = () => profileImageUploadRef.current?.click();
  const handleBackgroundClick = () => backgroundUploadRef.current?.click();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: (src: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result;
        if (typeof result === 'string') setState(result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, seleccioná una imagen válida.');
    }
  };

  // ------------------ FOLLOW ------------------
  const handleFollowClick = () => {
    setFollowersCount(isFollowing ? followersCount - 1 : followersCount + 1);
    setIsFollowing(!isFollowing);
  };

  // ------------------ CHECKBOXES ------------------
  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGenres((prev) =>
      prev.includes(value) ? prev.filter((g) => g !== value) : [...prev, value]
    );
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as AvailabilityOption;
    setAvailability((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  // ------------------ RENDER ------------------
  return (
    <div className="main-content">
      {/* TARJETA DE PERFIL */}
      <section
        className="profile-card"
        style={{
          backgroundImage: backgroundSrc ? `url(${backgroundSrc})` : 'none',
        }}
      >
        <div className="profile-header">
          <img
            id="profileImage"
            src={profileImageSrc}
            alt="Foto de perfil"
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
            <h1>{user ? `${user.nombre} ${user.apellido}` : 'Usuario'}</h1>
            <p className="username">@{user ? user.username : 'usuario'}</p>

            <div className="profile-stats">
              <div>
                <span className="number">{followersCount}</span>
                <span className="label">Seguidores</span>
              </div>
              <div>
                <span className="number">0</span>
                <span className="label">Siguiendo</span>
              </div>
            </div>

            <p className="profile-description">
              Entusiasta de la tecnología y la música.
            </p>

            <button
              id="followBtn"
              onClick={handleFollowClick}
              className={`btn ${isFollowing ? 'following' : ''}`}
            >
              {isFollowing ? 'Siguiendo' : 'Seguir'}
            </button>

            <button className="btn background-btn" onClick={handleBackgroundClick}>
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

      {feedback && (
        <section className="music-card" style={{ marginTop: '1rem' }}>
          <p style={{ margin: 0 }}>{feedback}</p>
        </section>
      )}

      {/* FORMULARIO MUSICAL */}
      <section className="music-card">
        <h2>Perfil Musical</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Géneros musicales:</label>
            <div className="checkbox-group">
              {['Rock', 'Jazz', 'Pop', 'Clásico', 'Metal'].map((genre) => (
                <label key={genre}>
                  <input
                    type="checkbox"
                    value={genre}
                    checked={genres.includes(genre)}
                    onChange={handleGenreChange}
                  />
                  {genre}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label>Instrumento principal:</label>
            <input
              type="text"
              value={instrument}
              onChange={(e) => setInstrument(e.target.value)}
              placeholder="Ej: Guitarra"
              required
            />
          </div>

          <div>
            <label>Nivel de habilidad:</label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              required
            >
              <option value="">Selecciona...</option>
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
              <option value="Profesional">Profesional</option>
            </select>
          </div>

          <div>
            <label>Años de experiencia:</label>
            <input
              type="number"
              value={experienceYears}
              onChange={(e) => setExperienceYears(Number(e.target.value))}
              min={0}
            />
          </div>

          <div>
            <label>Influencias musicales:</label>
            <input
              type="text"
              value={influences}
              onChange={(e) => setInfluences(e.target.value)}
              placeholder="Ej: The Beatles, Paco de Lucía"
            />
          </div>

          <div>
            <label>Proyectos actuales / bandas:</label>
            <input
              type="text"
              value={projects}
              onChange={(e) => setProjects(e.target.value)}
              placeholder="Ej: Banda de rock local"
            />
          </div>

          <div>
            <label>Disponibilidad:</label>
            <div className="checkbox-group">
              {(['Clases', 'Colaboraciones', 'Conciertos'] as AvailabilityOption[]).map(
                (opt) => (
                  <label key={opt}>
                    <input
                      type="checkbox"
                      value={opt}
                      checked={availability.includes(opt)}
                      onChange={handleAvailabilityChange}
                    />
                    {opt}
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <label>Link a tu música:</label>
            <input
              type="url"
              value={musicLink}
              onChange={(e) => setMusicLink(e.target.value)}
              placeholder="Ej: https://soundcloud.com/usuario"
            />
          </div>

          <div>
            <label>Equipamiento:</label>
            <input
              type="text"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              placeholder="Ej: Fender Stratocaster, Ableton Live"
            />
          </div>

          <button type="submit" className="btn save-btn">
            Guardar
          </button>
        </form>
      </section>

      {savedData && (
        <section className="music-card">
          <h2>Información Musical</h2>

          <p>
            <strong>Géneros:</strong>{' '}
            {savedData.genres.length ? savedData.genres.join(', ') : 'Ninguno'}
          </p>
          <p>
            <strong>Instrumento:</strong> {savedData.instrument || 'No especificado'}
          </p>
          <p>
            <strong>Nivel:</strong> {savedData.skillLevel || 'No especificado'}
          </p>
          <p>
            <strong>Años de experiencia:</strong> {savedData.experienceYears}
          </p>
          <p>
            <strong>Influencias:</strong> {savedData.influences || 'No especificado'}
          </p>
          <p>
            <strong>Proyectos:</strong> {savedData.projects || 'No especificado'}
          </p>

          <p>
            <strong>Disponibilidad:</strong>{' '}
            {savedData.availability.length
              ? savedData.availability.join(', ')
              : 'No especificado'}
          </p>

          <p>
            <strong>Link:</strong>{' '}
            {savedData.musicLink ? (
              <a href={savedData.musicLink} target="_blank" rel="noreferrer">
                {savedData.musicLink}
              </a>
            ) : (
              'No especificado'
            )}
          </p>

          <p>
            <strong>Equipamiento:</strong> {savedData.equipment || 'No especificado'}
          </p>
        </section>
      )}
    </div>
  );
}

export default Perfil;
