import { Comment } from './comment.interfaces';

export interface Post{
    userId: number;
    id: number;
    title?: string;
    body?: string;
    comments?: Comment[];
    showComments?: boolean;
}