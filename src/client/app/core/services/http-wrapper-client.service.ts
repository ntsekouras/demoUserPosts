import { Http, RequestOptions, RequestMethod, Headers } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HttpWrapperClientService {
    private http: any;
    constructor(http: Http) {
        this.http = http;
    }

    createAuthorizationHeader(headers: Headers) {
        headers.append("Authorization", "Basic " +
            btoa("username:password"));
    }


    //set aplication/json
    setDefaultHeaders(headers: Headers) {
        headers.append("Content-Type", "application/json;charset=UTF-8");
        //headers.append('')
    }
    
    put(url: string, data: any) {
        let headers = new Headers();
        //this.createAuthorizationHeader(headers);
        this.setDefaultHeaders(headers);
        return this.http.put(url, data, {
            headers: headers
        });
    }

    putWithoutEntity(url: string) {
        let headers = new Headers();
        //this.createAuthorizationHeader(headers);
        this.setDefaultHeaders(headers);
        return this.http.put(url, {
            headers: headers
        });
    }

    //get(url: string) {
    //    let headers = new Headers();
    //    this.createAuthorizationHeader(headers);
    //    return this.http.get(url, {
    //        headers: headers
    //    });
    //}

    post(url: string, data: any) {
        let headers = new Headers();
        //this.createAuthorizationHeader(headers);
        this.setDefaultHeaders(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }
}