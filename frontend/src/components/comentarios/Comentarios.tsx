import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";

type Comment = {
    id_comment: number;
    content: string;
    created_at: string;
    user: {
        id: number;
        name_: string; // ajustado a tu entidad real
        last_name: string;
    };
};

type Props = {
    postId: number;
};

export const Comentarios = ({ postId }: Props) => {
    const { token } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    // === Obtener comentarios ===
    const fetchComments = async () => {
        try {
            const res = await fetch(`http://localhost:3000/comentarios/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                console.error("Error cargando comentarios:", await res.text());
                return;
            }

            const data = await res.json();
            setComments(data);
        } catch (err) {
            console.error("Error cargando comentarios:", err);
        }
    };

    // === Enviar comentario ===
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("CLICK EN COMENTAR");

        // validación básica
        if (!token) {
            alert("Debes iniciar sesión");
            return;
        }

        if (!content.trim()) {
            alert("El comentario no puede estar vacío");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/comentarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_post: postId,
                    content
                })
            });

            if (!res.ok) {
                const error = await res.json().catch(() => null);
                console.error("STATUS:", res.status);
                console.error("BODY:", error);
                alert("Error al publicar el comentario");
                setLoading(false);
                return;
            }

            setContent(""); // limpiar caja
            fetchComments(); // recargar lista
        } catch (err) {
            console.error("Fallo de red:", err);
            alert("No se pudo conectar con el servidor");
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Comentarios</h3>

        
            <div className="space-y-3">
                {comments.map(comment => (
                    <div key={comment.id_comment} className="p-3 border rounded">
                        <b>
                            {comment.user
                                ? `${comment.user.name_} ${comment.user.last_name}
                                `
                                : "Usuario"}
                        </b>

                        <p>{comment.content}</p>

                        <small className="text-gray-500">
                            {new Date(comment.created_at).toLocaleString()}
                        </small>
                    </div>
                )
                )}

                {comments.length === 0 && (
                    <p className="text-gray-500">No hay comentarios aún.</p>
                )}
            </div>

            {/* Formulario */}
            {token && (
                <form onSubmit={handleSubmit} className="mt-4 space-y-2">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Escribe un comentario..."
                        className="w-full p-2 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Publicando..." : "Comentar"}
                    </button>
                </form>

            )}
        </div>
    );
};

export default Comentarios;
