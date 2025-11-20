import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./ArticlePage.css";

export const ArticlePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { post } = location.state || {}; // obtiene el post pasado por navigate()

    // Si refrescan la página, el state se pierde, podés recuperar con useParams()
    const { id } = useParams();

    if (!post) {
        return <p>No se encontró el artículo con id {id}.</p>;
    }

    return (
        <div className="articlePage" >
            <button onClick={() => navigate(-1)} className="back-btn">⬅ Volver</button>
            <article>
                {post.multimedia?.length > 0 && (
                    <div className="imageArticle">
                        <img
                            src={`http://localhost:3000${post.multimedia[0].src}`}
                            alt={post.title}
                            className="article-image"
                        />
                    </div>
                )}
                <div className="textArticle">
                    <h1>{post.title}</h1>
                    <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                    <p className="article-content">{post.content}</p>
                </div>
            </article>
        </div>
    );
};
