import { useEffect, useState } from "react";
import type { InicioInterface } from "./Interface/InicioInterface";
import imagenGod from '../../../Frieren_Assembly_Language_For_x86_Processors.png'

export const Axios = () => {
  const [data, setData] = useState<InicioInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/inicio");
      const json = await response.json();
      setData(json);
    };
    fetchData();
  }, []);

  return (
    <>
      {data.map((usr, i) => (
        <div key={i}>
          <div className="user">
            <img src={imagenGod} alt={`Foto de ${usr.nombre ?? "Usuario"}`} />
            <p>{usr.username}</p>
          </div>
          <div className="imagecontent">
            <p>{usr.email}</p>
            <img src={imagenGod} alt="Imagen aleatoria" />
          </div>
        </div>
      ))}
    </>
  );
};
export default Axios;
