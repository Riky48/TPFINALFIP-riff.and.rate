import { useState } from "react";

export const CrearPublicacion = () => {
  const [post, setPost] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(e.target.value);
  };

  const handleSubmit = () => {
    // Acá hacés el posteo, envío a backend, etc.
    console.log("Publicación:", post);
  };

  return (
    <div>
      <input
        className="inputPost"
        id="postinput"
        type="text"
        value={post}
        onChange={handleChange}
        placeholder="Escribí tu publicación"
      />
      <button onClick={handleSubmit}>Publicar</button>
    </div>
  );
};