import Menu from "../../assets/ellipsis-solid-full.svg";
import "./MenuEllipsis.css";

type Props = {
    postId: number;
    post: { title: string; content: string };
    activePostId: number | null;
    setActivePostId: React.Dispatch<React.SetStateAction<number | null>>;
    setShowDeleteModal: React.Dispatch<React.SetStateAction<number | null>>;
    setShowEditModal: React.Dispatch<React.SetStateAction<number | null>>;
    setEditTitle: React.Dispatch<React.SetStateAction<string>>;
    setEditContent: React.Dispatch<React.SetStateAction<string>>;
};

export const MenuEllipsis: React.FC<Props> = ({
    postId,
    post,
    activePostId,
    setActivePostId,
    setShowDeleteModal,
    setShowEditModal,
    setEditTitle,
    setEditContent,
}) => {
    const toggleMenu = (id: number) => {
        setActivePostId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="menu-container">
            <img
                src={Menu}
                alt="menu"
                className="ellipsis"
                onClick={() => toggleMenu(postId)}
            />
            {activePostId === postId && (
                <ol className="menuOptions show">
                    <li
                        onClick={() => {
                            setShowEditModal(postId);
                            setEditTitle(post.title);
                            setEditContent(post.content);
                        }}
                    >
                        Editar Publicación
                    </li>
                    <li onClick={() => setShowDeleteModal(postId)}>
                        Eliminar Publicación
                    </li>
                </ol>
            )}
        </div>
    );
};
