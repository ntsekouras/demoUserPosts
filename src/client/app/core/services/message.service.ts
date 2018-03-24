import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable, Subject } from "rxjs/Rx";


export interface IResetMessage {
    message: string
}

@Injectable()
export class MessageService {
    private _subject = new Subject();

    state: any = null; 
    
    constructor(private _http: Http) {
    }
}
