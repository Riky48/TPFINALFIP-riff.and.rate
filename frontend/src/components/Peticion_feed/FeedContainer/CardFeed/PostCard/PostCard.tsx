import { FeedDto } from "../../../Interface/InicioInterface";
import { MenuEllipsis } from "../../../../MenuEllipsis/MenuEllipsis";
import { GalleriaFeed } from "../../../galleria/GalleriaFeed";
import "./PostCard.css";
import "./PostCardResponsive.css";

type Props = {
    post: FeedDto["posts"][number];
    activePostId: number | null;
    setActivePostId: React.Dispatch<React.SetStateAction<number | null>>;
    setShowDeleteModal: React.Dispatch<React.SetStateAction<number | null>>;
    setShowEditModal: React.Dispatch<React.SetStateAction<number | null>>;
    setEditTitle: React.Dispatch<React.SetStateAction<string>>;
    setEditContent: React.Dispatch<React.SetStateAction<string>>;
};

export const PostCard: React.FC<Props> = ({
    post,
    activePostId,
    setActivePostId,
    setShowDeleteModal,
    setShowEditModal,
    setEditTitle,
    setEditContent,
}) => {
    const getMediaType = (src: string): "image" | "video" | "file" => {
        const ext = src.split(".").pop()?.toLowerCase();
        if (!ext) return "file";
        if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
        if (["mp4", "webm", "ogg"].includes(ext)) return "video";
        return "file";
    };

    return (
        <div key={post.id} className="imageContent">
            <div className="post-header">
                <p className="post-text">{post.content}</p>
                <MenuEllipsis
                    postId={post.id}
                    activePostId={activePostId}
                    setActivePostId={setActivePostId}
                    setShowDeleteModal={setShowDeleteModal}
                    setShowEditModal={setShowEditModal}
                    setEditTitle={setEditTitle}
                    setEditContent={setEditContent}
                    post={post}
                />
            </div>

            <div className="multimedia">
                {post.multimedia?.length > 0 ? (
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
                                            alt={post.title}
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
                ) : null}
            </div>
        </div>
    );
};
