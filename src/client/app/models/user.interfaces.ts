import { Post } from './post.interfaces';

export interface User extends UserListItemProperties{
    id: number;
    name?: string;
    email?: string;
    address?: Address;
    geo?: Geo;
    phone?: string;
    website?: string;
    company?: Company;
    posts?: Post[];
}

export interface UserListItemProperties{
    postsCount?: number;
    commentsCount?: number;
    commentsPerPost?: number;
}

export interface Address{
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
}

export interface Geo{
    lat?: string;
    lng?: string;
}

export interface Company{
    name?: string;
    catchPhrase?: string;
    bs?: string;
}


