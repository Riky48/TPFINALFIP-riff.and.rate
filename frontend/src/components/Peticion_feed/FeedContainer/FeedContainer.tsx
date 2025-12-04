import { useEffect, useState } from "react";
import type { FeedDto } from "../Interface/InicioInterface";
import { FeedList } from "./FeedList";
import "./FeedContainer.css";

export const FeedContainer = () => {
  const [data, setData] = useState<FeedDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Estados globales
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:3000/feed/users", {
          headers: {
            "Authorization": `Bearer ${token}`
          },
        });

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
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/feed/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      if (!response.ok) throw new Error("Error al eliminar el post");

      setData((prev) =>
        prev.map((usr) => ({
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

  const asyncEditPost = async (id_post: number, title: string, content: string) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3000/feed/${id_post}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }), // Enviamos id
      });

      if (!response.ok) throw new Error(`Error ${response.status} al editar el post`);

      // Actualizar el estado local
      setData((prev) =>
        prev.map((usr) => ({
          ...usr,
          posts: usr.posts.map((post) =>
            post.id === id_post ? { ...post, title, content } : post
          ),
        }))
      );

      setShowEditModal(null);
      console.log("Post actualizado correctamente");
    } catch (error) {
      console.error("Error al editar el post:", error);
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
          setShowEditModal={setShowEditModal}
          setEditTitle={setEditTitle}
          setEditContent={setEditContent}
        />
      )}

      {/* Modal para eliminar la publicación */}
      {showDeleteModal !== null && (
        <div className="delete-modal" role="dialog" aria-modal="true">
          <h2>¿Estás seguro de que deseas eliminar este post?</h2>
          <button onClick={() => setShowDeleteModal(null)}>Cancelar</button>
          <button onClick={() => asyncDeletePost(showDeleteModal)}>
            Eliminar
          </button>
        </div>
      )}

      {/* Modal para editar la publicación */}
      {showEditModal !== null && (
        <div className="edit-modal" role="dialog" aria-modal="true">
          <h2>Editar Publicación</h2>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button onClick={() => setShowEditModal(null)}>Cancelar</button>
          <button onClick={() => asyncEditPost(showEditModal, editTitle, editContent)}>
            Guardar cambios
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedContainer;
