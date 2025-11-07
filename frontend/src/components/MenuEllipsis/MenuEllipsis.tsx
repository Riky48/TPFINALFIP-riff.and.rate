import Menu from "../../assets/ellipsis-solid-full.svg";
import "./MenuEllipsis.css";

type Props = {
    postId: number;
    activePostId: number | null;
    setActivePostId: React.Dispatch<React.SetStateAction<number | null>>;
    setShowDeleteModal: React.Dispatch<React.SetStateAction<number | null>>;
};

export const MenuEllipsis: React.FC<Props> = ({
    postId,
    activePostId,
    setActivePostId,
    setShowDeleteModal,
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
                    <li>Editar Publicación</li>
                    <li onClick={() => setShowDeleteModal(postId)}>
                        Eliminar Publicación
                    </li>
                </ol>
            )}
        </div>
    );
};
