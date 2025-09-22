import { useEffect, useState } from "react";
import type { FeedDto } from "../../../backend/src/feed/dto/feed.dto";
import "./usuario.css";
import "./usuarioResponsive.css";
import defaultImage from "../../../Frieren_Assembly_Language_For_x86_Processors.png";
import menuEllipsis from "../assets/ellipsis-solid-full.svg";

export const Axios = () => {
  const [data, setData] = useState<FeedDto[]>([]);
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/feed/users/2");
      const json = await response.json();
      setData(json);
    };
    fetchData();
  }, []);

  const toggleMenu = (id: number) => {
    setActivePostId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (id: number) => {
    console.log("Se tendría que editar el post con id:", id);
  };

  const handleDelete = (id: number) => {
    setShowDeleteModal(id);
  };

  const asyncDeletePost = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setData((prev) =>
          prev.map((usr) => ({
            ...usr,
            posts: usr.posts?.filter((post) => post.id !== id),
          }))
        );
        setShowDeleteModal(null);
        setActivePostId(null);
      } else {
        console.error("Error al eliminar el post");
      }
    } catch (error) {
      console.error("Error en la petición DELETE:", error);
    }
  };

  return (
    <>
      {data.map((usr, i) => (
        <div key={i} className="usersDiv">
          <div className="user">
            <img
              src={usr.user?.profile?.image ?? defaultImage}
              alt={`Foto de ${usr.user?.name ?? "Usuario"}`}
            />
            <div className="textdatauser">
              <h3>{usr.user?.name}</h3>
              <p>{usr.user?.email}</p>
            </div>
          </div>

          {usr.posts?.flat().map((post, idx) => (
            <div key={post.id ?? idx} className="imagecontent">
              <div className="post-header">
                <p>{post.content}</p>
                <div className="menu-container">
                  <img
                    src={menuEllipsis}
                    alt="menu"
                    className="ellipsis"
                    onClick={() => toggleMenu(post.id)}
                  />
                  {activePostId === post.id && (
                    <ol className="menuOptions show">
                      <li onClick={() => handleEdit(post.id)}>Editar Publicación</li>
                      <li onClick={() => handleDelete(post.id)}>Eliminar Publicación</li>
                    </ol>
                  )}
                </div>
              </div>

              {post.multimedia?.map((m, j) => (
                <div key={j} className="multimedia">
                  <img
                    src={`http://localhost:3000${m.src}`}
                    alt={`Publicación de ${usr.user?.name ?? "Usuario"}`}
                  />
                </div>
              ))}

              <div className="social-interactions">
                <div className="likes comments shares">
                  <p>{post.likes} likes</p>
                  <p>{post.comments?.length} comments</p>
                </div>
                <div className="comments-interactions">
                  {post.comments?.map((c, u) => (
                    <div key={u}>
                      <p>{c.user}</p>
                      <p>{new Date(c.createdAt).toLocaleDateString()}</p>
                      <p>{c.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      {showDeleteModal !== null && (
        <div className="delete-modal" role="dialog" aria-modal="true">
          <h2>¿Estás seguro de que deseas eliminar este post?</h2>
          <button aria-label="Cancelar eliminación" onClick={() => setShowDeleteModal(null)}>
            Cancelar
          </button>
          <button aria-label="Confirmar eliminación" onClick={() => asyncDeletePost(showDeleteModal)}>
            Eliminar
          </button>
        </div>
      )}
    </>
  );
};

export default Axios;