import { Component, NgZone, Input, OnDestroy, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from "@angular/core";
import { Router, ActivatedRoute, Params, ParamMap } from "@angular/router";
import { Observable, Subscription } from "rxjs/Rx";
import { Response } from "@angular/http";

import { CONFIG } from "../../config";


import { BaseService } from "../../core/services/base.service";
import { BaseComponent } from "../../core/components/base.component";
import { HttpWrapperClientService } from "../../core/services/http-wrapper-client.service";
import { HelperService } from "../../core";

import { User, Post, Comment } from "../../models";
import { UsersService } from "../shared/users.service";

declare var myAppOptions: any;

@Component({
    selector: "user",
    templateUrl: "./user.component.html?v="// + myAppOptions.VersionNumber
})
export class UserComponent extends BaseComponent implements OnInit, AfterViewInit { 
    // declare vars *************************************************************************************
   
    //basic models for binding stuff
    user: User;
    posts: Post[];
    comments: Comment[];

    fetchedUser: User;
    private closeOtherComments: boolean;

    //maybe go in an abstact class
    private pluginsInit: boolean = false;
    private dataloaded: boolean = false;
    
    // constructor *************************************************************************************
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        protected _helperService: HelperService,
        private _usersService: UsersService) {
        super(_helperService);
        this.entityLabel = "User";
    }

    //on init 
    ngOnInit(): void {
        //init params
        this.closeOtherComments = true;
        this.fetchedUser = null;

        this.entityId = +this._route.snapshot.paramMap.get('id');
        return this.loadComponentData(); //load the needed component data
    }

    ngAfterViewChecked() {
        //init plugins the correct time
        if (!this.pluginsInit && this.dataloaded) {
            //.....
            this.pluginsInit = true;
        }
    }

    ngOnDestroy(): void { }

    ngAfterViewInit(): void { }
    
    // component logic *************************************************************************************

    //load the needed component data
    private loadComponentData() {
        this._usersService.getUserWithPosts(this.entityId)
            .subscribe((data: any) => {
                if (data) {
                    this.user = <User>data[0];
                    this.user.posts = <Post[]>data[1];
                    this.comments = <Comment[]>data[2];
                    
                    this.user.posts.map((p: Post) => {
                        p.showComments = false;
                        p.comments = this.comments.filter((c: Comment) => c.postId === p.id);
                    });
                    this.dataloaded = true;
                } else // ??????????? handle differently
                    window.location.href = "/";
                    
            });
    }
    
    //fetch user dets again with ajax for demo puproses (data exist)
    fetchUserDets(){
        if(this.fetchedUser)
            return;

        this._usersService.get(`http://jsonplaceholder.typicode.com/users/${this.entityId}`)
            .subscribe((data: any) => {
                if (data)
                    this.fetchedUser = <User>data;
            });
    }
      
    // view logic methods *************************************************************************************
   
    showHideComments(p: Post):void {
        //check for close others functionality
        if(this.closeOtherComments)
            if(!p.showComments) //that means open it now
                this.user.posts.map((p: Post) => p.showComments = false);
            
        p.showComments = !p.showComments;
    }
}