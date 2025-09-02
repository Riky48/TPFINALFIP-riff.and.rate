import { useEffect, useState } from "react";
import type { InicioInterface } from "./Interface/InicioInterface";
import imagenGod from '../../../Frieren_Assembly_Language_For_x86_Processors.png'
import "./usuario.css"
import "./usuarioResponsive.css"

export const Axios = () => {
  const [data, setData] = useState<InicioInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/posts/all");
      const json = await response.json();
      console.log(json);
      setData(json);
    };
    fetchData();
  }, []);

  return (
    <>
      {data.map((usr, i) => (
        <div key={i}>
          <div className="user">
              <img src={imagenGod} alt={`Foto de ${usr.user.nombre ?? "Usuario"}`} />
            <div className="textdatauser">
              <h3>{usr.user.nombre}</h3>
              <p>{usr.user.username}</p>
            </div>
          </div>
          <div className="imagecontent">
            <p>{usr.descripcion}</p>
            <img src={`http://localhost:3000${usr.multimedia_url}`} alt={`Publicacion de ${usr.user.nombre}`} />
            <p>{usr.fecha_creacion}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Axios;