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
        type: "post" | "article" | "event";
        title:string;
        content:string;
        createdAt:Date;
        multimedia:{
            id:number;
            src:string;
            title:string;
            type:"image"| "video" | "file";
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