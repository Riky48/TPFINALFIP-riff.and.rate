import { _comment } from "../entities/_comment.entity";
import { _comment_of_comment } from "../entities/_comment_of_comment.entity";
import { _like } from "../entities/_like.entity";
import { _multimedia } from "../entities/_multimedia.entity";
import { _post } from "../entities/_post.entity";
import { _profile } from "../entities/_profile.entity";
import { _user } from "../entities/_user.entity";

export interface FeedDto {
    user:{
        id: number;
        name:string;
        lastName:string;
        email:string;
        profile:{
            bio:string,
            image:string,
            isPremium:boolean,
        };
    };
    posts:{
        id:number;
        title:string;
        content:string;
        createdAt:Date;
        multimedia:{
            id:number;
            src:string;
            title:string;
            createdAt:Date;
        }[];
    likes:number;
    comments:{
        id:number;
        content:string;
        user:string;
        createdAt:Date;
        likes:number;
        replies:{
            id:number;
            content:string;
            user:string;
            createdAt:Date;
            likes:number;
        }[];
    }[];
    }[];
}