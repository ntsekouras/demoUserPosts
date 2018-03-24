import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HttpWrapperClientService } from './http-wrapper-client.service';
import { MessageService } from './message.service';
import { ExceptionService } from './exception.service';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable()
export class BaseService {
    protected headers: any;
    protected options: any;
    protected baseUrl:string = null;

    constructor(
        protected _http: Http,
        protected _httpWrapperClient: HttpWrapperClientService,
        protected _exceptionService: ExceptionService,
        protected _messageService: MessageService,
        protected _spinnerService: SpinnerService) {
        this.headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        this.options = new RequestOptions({ headers: this.headers }); // Create a request option
    }

    //get 
    get(url: string) {
        //this._spinnerService.show();
        return this._http.get(url)
            .map((response: Response) => response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => {
                //this._spinnerService.hide();
            });
    }

    //get stream for files
    getStream(url: string) {
        this._spinnerService.show();
        return this._http.get(url)
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }
    
    //get Fork join
    getFork(url: string) {
        return this._http.get(url).map((response: Response) => response.json()).catch(this._exceptionService.catchBadResponse);
    }

    getApiSingleEntity(id: number | string) {
        this._spinnerService.show();
        return this._http.get(`${this.baseUrl}/${id}`)
            .map((response: Response) => response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }
        
    post(url: string, entity: any) {
        let body = JSON.stringify(entity);
        this._spinnerService.show();
        return this._http.post(`${url}`, body, this.options)
            .map((response: Response) => response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => { this._spinnerService.hide() });
    }

    //create entity
    add(url: string, entity: any) {
        return this.post(url, entity);
    }

    addEntityApi(entity: any) {
        return this.add(`${this.baseUrl}/Create`, entity);
    }

    //update entity
    update(url: string, entity: any, id: number) {
        let body = JSON.stringify(entity);
        this._spinnerService.show();
        return this._http.put(`${url}/${id}`, body, this.options)
            .map((response: Response) => response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => { this._spinnerService.hide() });
    }

    updateEntityApi(entity: any) {
        return this.update(this.baseUrl, entity, entity.Id);
    }

    //with changes in base service, we always return a response -- to go
    updateWithResponse(url: string, entity: any, id: number) {
        return this.update(url, entity, id);
    }

    updateWithUrl(url: string) {
        this._spinnerService.show();
        return this._http.put(`${url}`, null, this.options)
            .map((response: Response) => response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => { this._spinnerService.hide() });
    }
 
    //delete entity
    delete(url: string, id: number) {
        this._spinnerService.show();
        return this._http
            .delete(`${url}/${id}`)
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }

    deleteEntityApi(entity: any) {
        return this.delete(this.baseUrl, entity.Id);
    }

    //delete entity with url
    deleteWithUrl(url: string) {
        this._spinnerService.show();
        return this._http
            .delete(`${url}`)
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }
}