import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import { CONFIG } from "../../config";
import { MessageService } from "../../core/services/message.service";
import { BaseService } from "../../core/services/base.service";
import { HttpWrapperClientService } from "../../core/services/http-wrapper-client.service";
import { ExceptionService } from "../../core/services/exception.service";
import { SpinnerService } from "../../core/spinner/spinner.service";

/*
let aa= CONFIG.baseUrls.;
*/

//Api/Erga/151
@Injectable()
export class UsersService extends BaseService {
    constructor(
        protected _http: Http,
        protected _httpWrapperClient: HttpWrapperClientService,
        protected _exceptionService: ExceptionService,
        protected _messageService: MessageService,
        protected _spinnerService: SpinnerService) {

        super(_http, _httpWrapperClient, _exceptionService, _messageService, _spinnerService);
        this.baseUrl = "/api/users";
    }

    //get users with posts and comments for list users
    getUsersWithPosts() {
        //this._spinnerService.show();
        return Observable.forkJoin(
            this.get("http://jsonplaceholder.typicode.com/users"),
            this.get("http://jsonplaceholder.typicode.com/posts"),
            this.getFork("http://jsonplaceholder.typicode.com/comments").finally(() => this._spinnerService.hide())
        );
    }

    //get users with posts and comments for list users
    getUserWithPosts(userId: number,  ) {
        //this._spinnerService.show();
        return Observable.forkJoin(
            this.get(`http://jsonplaceholder.typicode.com/users/${userId}`),
            this.get(`http://jsonplaceholder.typicode.com/users/${userId}/posts`),
            this.getFork("http://jsonplaceholder.typicode.com/comments").finally(() => this._spinnerService.hide())
        );
    }
}