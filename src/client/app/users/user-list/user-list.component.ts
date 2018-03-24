import { Component, NgZone, Input, OnDestroy, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Observable, Subscription } from "rxjs/Rx";
import { Response } from "@angular/http";
import { LazyLoadEvent, SelectItem, DataTable } from 'primeng/primeng';


import { BaseService } from "../../core/services/base.service";
import { BaseListComponent } from "../../core/components/base.list.component";
import { HelperService } from "../../core";

import { User, Post, Comment } from "../../models";
import { UsersService } from "../shared/users.service";

declare var myAppOptions: any;

@Component({
    selector: "users-list",
    templateUrl: "./user-list.component.html?v="// + myAppOptions.VersionNumber
})
export class UsersListComponent extends BaseListComponent implements OnInit, AfterViewInit {
    // declare vars *************************************************************************************
    users: User[];
    posts: Post[];
    comments: Comment[];

    userTableLoading: boolean;
    userCols: any[];
    totalRecords: number;

    //maybe go in an abstact class
    private pluginsInit: boolean = false;
    private dataloaded: boolean = false;

    // constructor *************************************************************************************
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _zone: NgZone,
        protected _helperService: HelperService,
        private _usersService: UsersService) {
        super(_helperService);
    }
     
    //on init 
    ngOnInit(): void {
        //init params
        this.title = "All Users";
        this.userTableLoading = true;
        this.userCols = [
            { field: 'name', header: 'Name' },
            { field: 'postsCount', header: 'Posts' },
            { field: 'commentsPerPost', header: 'Comments/Post' }
        ];

        this.loadComponentData(); //load the component data
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
    //load the component data
    private loadComponentData() {
        this._usersService.getUsersWithPosts().subscribe((data: any) => {
            if(data){
                //i load all data and filter them with js, 
                //due to lack of proper/advanced entry points in (http://jsonplaceholder.typicode.com/)
                this.users = <User[]>data[0];
                this.posts = <Post[]>data[1];
                this.comments = <Comment[]>data[2];
                
                this.users.map((u: User) => {
                    u.posts = this.posts.filter((p: Post) => p.userId === u.id);
                    u.postsCount = u.posts.length;
                    u.commentsCount = 0;
                    u.posts.map((p: Post) => {
                        p.comments = this.comments.filter((c: Comment) => c.postId === p.id);
                        u.commentsCount += p.comments.length;
                    })
                    u.commentsPerPost = u.commentsCount / u.postsCount;
                })
                this.userTableLoading = false;
                this.dataloaded = true;
                //this.users[8].posts[3].comments.map((s: Comment) => console.log(s.postId + " // id: " + s.id + " // title: " + s.name));
            }
        })
    }
}