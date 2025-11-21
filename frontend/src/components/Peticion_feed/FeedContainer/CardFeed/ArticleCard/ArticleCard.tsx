import { FeedDto } from "../../../Interface/InicioInterface";
import "./ArticleCard.css";
import { useNavigate } from "react-router-dom";

type Props = {
    post: FeedDto["posts"][number];
};

export const ArticleCard: React.FC<Props> = ({ post }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Redirige a una página específica
        navigate(`/article/${post.id}`, { state: { post } });
        // Envía los datos del post en la navegación (sin tener que volver a pedirlos)
    };

    return (
        <div className="userArticlePostDiv" onClick={handleClick} role="button">
            <article>
                <img
                    src={
                        post.multimedia.length > 0
                            ? `http://localhost:3000/${post.multimedia[0].src}`
                            : ""
                    }
                    alt="article"
                />
                <div>
                    <h2>{post.title}</h2>
                    <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                </div>
            </article>
        </div>
    );
};
