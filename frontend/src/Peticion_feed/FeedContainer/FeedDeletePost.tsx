import { FeedDto } from "../Interface/InicioInterface";

export const asyncDeletePost = async (
    id: number,
    setData: React.Dispatch<React.SetStateAction<FeedDto[]>>,
    setShowDeleteModal: React.Dispatch<React.SetStateAction<number | null>>,
    setActivePostId: React.Dispatch<React.SetStateAction<number | null>>
): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setData((prev) => {
                const newData = structuredClone(prev);

                for (const usr of newData) {
                    if (usr.posts?.some((post) => post.id === id)) {
                        usr.posts = usr.posts.filter((post) => post.id !== id);
                        break;
                    }
                }

                return newData.filter((usr) => usr.posts && usr.posts.length > 0);
            });

            setShowDeleteModal(null);
            setActivePostId(null);
        } else {
            console.error("Error al eliminar el post");
        }
    } catch (error) {
        console.error("Error en la petición DELETE:", error);
    }
};
