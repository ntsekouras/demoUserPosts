/**************** my core models for every app           *************************************************** */
export interface iHasId{
    _id: number;
}

export interface iHasTitle{
    title: string;
}

export interface iHasNotes{
    title: string;
}

//tracked entity
export interface iTrackedEntity extends iHasId{
    creationTime?: string;
    userCreatedId?: number;
    updateTime?: string;
    userUpdatedId?: number;
}

export interface iBaseEntity extends iTrackedEntity, iHasTitle, iHasNotes{
}



/**************** server response models           *************************************************** */

export enum serverResponseStatus{
    ok = 200,
    notFound = 404,
    error = 5
}

export interface serverResponse{
    status?: serverResponseStatus;
    message?: string;
}

export interface serverResponseG<T> extends serverResponse{
    data?: T;
}


/**************** auth core models           *************************************************** */

export interface usernamePassword{
    username?: string;
    password?: string;
}

export interface iCredsEntity{
    loginUrl?: string;
    //xm ............???
    usernamesPasswords?: usernamePassword[]; //readability in coding
    //usernamesPasswords?: [string, string][]; // more lightweight ??
}





/****************            *************************************************** */

export interface Searchable {
    [prop: string]: string;
}