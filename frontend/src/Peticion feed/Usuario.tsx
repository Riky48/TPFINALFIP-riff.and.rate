import { useEffect, useState } from "react";
import type { FeedDto } from "../../../backend/src/feed/dto/feed.dto";
import "./usuario.css";
import "./usuarioResponsive.css";
import defaultImage from "../../../Frieren_Assembly_Language_For_x86_Processors.png";
import menuEllipsis from "../assets/ellipsis-solid-full.svg";
import { GalleriaFeed } from '../Peticion feed/galleria/GalleriaFeed'

export const Axios = () => {
  const [data, setData] = useState<FeedDto[]>([]);
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/feed/users/2");
      const json = await response.json();
      setData(json);
      console.log(json);

    };
    fetchData();
  }, []);

  const toggleMenu = (id: number) => {
    setActivePostId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (id: number) => {
    console.log("Editar post con id:", id);
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
        setData((prev) => {
          const newData = structuredClone(prev);

          for (const usr of newData) {
            if (usr.posts?.some((post) => post.id === id)) {
              usr.posts = usr.posts.filter((post) => post.id !== id);
              break;
            }
          }

          //  Filtramos usuarios sin posts
          return newData.filter((usr) => usr.posts && usr.posts.length > 0);
        });

        setShowDeleteModal(null);
        setActivePostId(null);
      } else {
        console.error("Error al eliminar el post");
      }
    } catch (error) {
      console.error("Error en la petición DELETE:", error);
    }
  };

  const getMediaType = (src: string): "image" | "video" | "file" => {
    const ext = src.split(".").pop()?.toLowerCase();
    if (!ext) return "file";

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
    if (["mp4", "webm", "ogg"].includes(ext)) return "video";

    return "file";
  };

  return (
    <>

      {data.length === 0 ? (
        <p className="no-posts">No hay publicaciones.</p>
      ) : (
        data
          // 👇 Filtramos usuarios con posts válidos antes del render
          .filter((usr) => usr.posts && usr.posts.length > 0)
          .map((usr) => (

            <div key={usr.user?.id} className="usersDiv">
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

              {usr.posts.map((post) => (

                <div key={post.id} className="imagecontent">
                  <div className="post-header">
                    {post.content && post.content.trim().length > 0 ? (
                      <p>{post.content}</p>
                    ) : (
                      <p className="menu-container"></p>
                    )}

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

                  <div className="multimedia">
                    {post.multimedia && post.multimedia.length > 0 && (
                      post.multimedia.length > 1 ? (
                        <GalleriaFeed multimedia={post.multimedia} />
                      ) : (
                        (() => {
                          const m = post.multimedia[0];
                          const type = getMediaType(m.src);

                          switch (type) {
                            case "image":
                              return (
                                <img
                                  src={`http://localhost:3000${m.src}`}
                                  alt={`Publicación de ${usr.user?.name ?? "Usuario"}`}
                                  className="rounded-2xl shadow-md"
                                />
                              );
                            case "video":
                              return (
                                <video
                                  src={`http://localhost:3000${m.src}`}
                                  controls
                                  className="rounded-2xl shadow-md"
                                />
                              );
                            default:
                              return (
                                <a
                                  href={`http://localhost:3000${m.src}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Descargar archivo ({m.title ?? "Archivo"})
                                </a>
                              );
                          }
                        })()
                      )
                    )}
                  </div>



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
          ))
      )}

      {showDeleteModal !== null && (
        <div className="delete-modal" role="dialog" aria-modal="true">
          <h2>¿Estás seguro de que deseas eliminar este post?</h2>
          <button onClick={() => setShowDeleteModal(null)}>Cancelar</button>
          <button onClick={() => asyncDeletePost(showDeleteModal)}>Eliminar</button>
        </div>
      )}
    </>
  );
};

export default Axios;
