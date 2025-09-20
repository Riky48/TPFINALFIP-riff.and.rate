import { useEffect, useState } from "react";
import type { FeedDto } from "../../../backend/src/feed/dto/feed.dto";
import "./usuario.css"
import "./usuarioResponsive.css"
import defaultImage from "../../../Frieren_Assembly_Language_For_x86_Processors.png"
import menuEllipsis from "../assets/ellipsis-solid-full.svg"

export const Axios = () => {
  const [data, setData] = useState<FeedDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/feed/users/2");
      const json = await response.json();

      setData(json);
    };
    fetchData();
  }, []);

  return (
    <>
      {data.map((usr, i) => (
        
        
        <div key={i}>
          {/* Datos del usuario */}
          <div className="user">
            <img
              src={usr.user?.profile?.image ?? defaultImage}
              alt={`Foto de ${usr.user?.name ?? "Usuario"}`}
            />
            <div className="textdatauser">
              <h3>{usr.user?.name}</h3>
              <p>{usr.user?.email}</p>
            </div>
            <div>
              <img src={menuEllipsis} alt="menu" className="ellipsis" onClick={() => console.log("hola")} />
              <Menu />
            </div>
          </div>

          {/* Posts del usuario */}
          {usr.posts?.flat().map((post, idx) => (
            <div key={idx} className="imagecontent">
              <p>{post.content}</p>




              {/* Multimedia del post */}
              {post.multimedia?.map((m, j) => (

                <div key={j} className="multimedia">
                  <img
                    src={`http://localhost:3000${m.src}`}
                    alt={`Publicación de ${usr.user?.name ?? "Usuario"}`}
                  />
                </div>

              ))
              }
              <div className="social-interactions">
                <div className="likes comments shares">
                  <p>{post.likes} likes</p>
                  <p>{post.comments?.length} comments</p>
                </div>
                <div className="comments-interactions">
                  {post.comments?.map((c,u)=>{
                    return(
                      <div key={u}>
                        <p>{c.user}</p>
                        <p>{c.createdAt?.toDateString()}</p>
                        <p>{c.content}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Axios;

