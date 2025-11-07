import { useEffect, useState } from "react";
import type { FeedDto } from "../Interface/InicioInterface";
import { FeedList } from "./FeedList";
import "./FeedContainer.css";

export const FeedContainer = () => {
  const [data, setData] = useState<FeedDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 👇 Estados globales
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/feed/users/");
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error("Error al obtener el feed:", err);
        setError("Error al cargar las publicaciones.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const asyncDeletePost = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar el post");

      setData((prev) =>
        prev
          .map((usr) => ({
            ...usr,
            posts: usr.posts.filter((post) => post.id !== id),
          }))
          .filter((usr) => usr.posts.length > 0)
      );

      setShowDeleteModal(null);
      setActivePostId(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Cargando publicaciones...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="feed-container">
      {data.length === 0 ? (
        <p>No hay publicaciones.</p>
      ) : (
        <FeedList
          data={data}
          activePostId={activePostId}
          setActivePostId={setActivePostId}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {/* 🔥 Modal global controlado desde acá */}
      {showDeleteModal !== null && (
        <div className="delete-modal" role="dialog" aria-modal="true">
          <h2>¿Estás seguro de que deseas eliminar este post?</h2>
          <button onClick={() => setShowDeleteModal(null)}>Cancelar</button>
          <button onClick={() => asyncDeletePost(showDeleteModal)}>
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedContainer;
