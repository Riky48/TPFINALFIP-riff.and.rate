import { FeedDto } from "./dto/feed.dto";
import { _comment } from "../database/entities/_comment.entity";
import { _comment_of_comment } from "../database/entities/_comment_of_comment.entity";
import { _like } from "../database/entities/_like.entity";
import { _multimedia } from "../database/entities/_multimedia.entity";
import { _post } from "../database/entities/_post.entity";
import { _profile } from "../database/entities/_profile.entity";
import { _user } from "../database/entities/_user.entity";

export function mappingFeed(user: _user, profile: _profile, post: _post, likeCount: number, multimedia: _multimedia[], comment: (_comment & { replies: _comment_of_comment[] })[]): FeedDto {
    return {
        user: {
            id: user?.id_user ?? null,
            name: user?.name_ ?? 'El nombre del usuario no se pudo encontrar',
            lastName: user?.last_name ?? 'El apellido del usuario no se pudo encontrar',
            email: user?.email ?? 'El email del usuario no se pudo encontrar',
            profile: {
                bio: profile?.bio ?? 'El usuario no tiene biografia',
                image: profile?.image_ ?? 'El usuario no tiene imagen',
                isPremium: profile.is_premium,
            }
        },
        posts: [{
            id: post.id_post,
            title: post.title,
            content: post.content,
            createdAt: post.created_at,
            multimedia: multimedia.map(m => ({
                id: m.id_multimedia,
                src: m.src,
                type: m.type,
                title: m.title,
                createdAt: m.created_at,
            })),
            likes: likeCount,
            comments: comment.map(comment => ({
                id: comment.id_comment,
                content: comment.content,
                user: user.name_,
                createdAt: comment.created_at,
                likes: likeCount,
                replies: comment.replies.map(r => ({
                    id: r.id_comment_of_comment,
                    content: r.content,
                    user: user?.name_ ?? 'El usuario no existe',
                    createdAt: r?.created_at ?? 'fecha no encontrada',
                    likes: likeCount,
                }))
            }))
        }]

    }
}