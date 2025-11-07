import defaultImage from "../../assets/Frieren_Assembly_Language_For_x86_Processors.png";
import { FeedDto } from "../Interface/InicioInterface";
import { PostCard } from "./CardFeed/PostCard/PostCard";
import { EventCard } from "./CardFeed/EventCard/EventCard";
import { ArticleCard } from "./CardFeed/ArticleCard/ArticleCard";
import "./FeedList.css";

interface FeedListProps {
    data: FeedDto[];
    activePostId: number | null;
    setActivePostId: React.Dispatch<React.SetStateAction<number | null>>;
    setShowDeleteModal: React.Dispatch<React.SetStateAction<number | null>>;
}

export const FeedList: React.FC<FeedListProps> = ({
    data,
    activePostId,
    setActivePostId,
    setShowDeleteModal,
}) => {
    const renderPostType = (post: FeedDto["posts"][number]) => {
        switch (post.type) {
            case "post":
                return (
                    <PostCard
                        post={post}
                        activePostId={activePostId}
                        setActivePostId={setActivePostId}
                        setShowDeleteModal={setShowDeleteModal}
                    />
                );
            case "event":
                return <EventCard />
            case "article":
                return <ArticleCard post={post} />
            default:
                return <p>Tipo desconocido: {post.type}</p>;
        }
    };

    return (
        <>
            {data.map((usr, index) => (
                <div key={`${usr.user?.id}-${index}`} className="usersDiv">
                    <div className="user">
                        <img
                            src={usr.user?.profile?.image ?? defaultImage}
                            alt={usr.user?.name ?? "Usuario"}
                        />
                        <div className="textdatauser">
                            <h3>{usr.user?.name}</h3>
                            <p>{usr.user?.email}</p>
                        </div>
                    </div>

                    {usr.posts?.map((post) => (
                        <div key={`${usr.user?.id || usr.user?.name}-${post.id}-${post.createdAt}`} className="post-wrapper">
                            {renderPostType(post)}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};
