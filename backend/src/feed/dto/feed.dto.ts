import { _comment } from "../../database/entities/_comment.entity";
import { _comment_of_comment } from "../../database/entities/_comment_of_comment.entity";
import { _like } from"../../database/entities/_like.entity";
import { _multimedia } from "../../database/entities/_multimedia.entity";
import { _post } from "../../database/entities/_post.entity";
import { _profile } from "../../database/entities/_profile.entity";
import { _user } from "../../database/entities/_user.entity";

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
        type:string;
        content:string;
        createdAt:Date;
        multimedia:{
            id:number;
            src:string;
            title:string;
            type:string;
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