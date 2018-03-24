import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";


declare var cookieHelper: any;
declare var jQuery: any;
declare var moment: any;

@Injectable()
export class HelperService {
    constructor(
        private _http: Http
    ) { }

    getId() {
        var winLoc = window.location.href;
        return parseInt(winLoc.substring(winLoc.lastIndexOf("/") + 1));
    }

    getCurrentDate() {
        var currentDate = new Date();
        //currentDate.getDate();
        return currentDate;
        //return currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();
    }

    changeUrlWithoutReload(urlPath: string) {
        window.history.pushState({}, "", urlPath);
    }

    toDateString(date: Date): string {
        return (date.getFullYear().toString() + "-"
            + ("0" + (date.getMonth() + 1)).slice(-2) + "-"
            + ("0" + (date.getDate())).slice(-2))
            + "T" + date.toTimeString().slice(0, 5);
    }

    //remove greek accent from input
    removeAccent(text: string) {
        let cleanText = text.replace(/Ά|ά/g, 'α')
            .replace(/Έ|έ/g, 'ε')
            .replace(/Ή|ή/g, 'η')
            .replace(/Ό|ό/g, 'ο')
            .replace(/Ύ|ύ/g, 'υ')
            .replace(/Ώ|ώ/g, 'ω')
            .replace(/Ί|ί/g, 'ι');
        return cleanText;
    }


    // form validation check + messages + lock *********************************************************************************************
    //check if form is valid by ng-invalid class
    isFormValid() {
        return document.getElementsByClassName("ng-invalid").length === 0;
    }

    //show where the errors are on hover(cause of tabs)
    showWhereErrors() {
        let errors = document.getElementsByClassName("ng-invalid");
        let htmAr: string[] = [];
        let htm: string = "There are errors in the following fields: ";
        [].forEach.call(errors, (el:any) => {
            let placeholder = el.getAttribute("data-placeholder");
            if (typeof placeholder !== typeof undefined)
                htmAr.push(placeholder);
        });

        htm += htmAr.join(", ");
        htm += '<i class="fa fa-flag errorFa" data-placement="top" data-toggle="tooltip" title="Υπάρχουν σφάλματα στα δεδομένα.."></i>';

        document.getElementById("sesErrorsCont").innerHTML = htm;
    }

    //hide where the errors are on mouse out
    hideErrors() {
        document.getElementById("sesErrorsCont").innerHTML = "";
    }

    //lock a form
    lockForm(lockClass: string) {
        let locks = document.getElementsByClassName(lockClass);
        for (var i = -1, l = locks.length; ++i < l;) {
            var el = locks[i];
            el.setAttribute("disabled", "disabled");
            el.removeEventListener("click", e => {
                return false;
            });
            this.addClass(el.parentElement, "notClickable");

            jQuery(".summernote." + lockClass).summernote("disable");
        }
    }

    //unlock a form
    unlockForm(lockClass: string) {
        let locks = document.getElementsByClassName(lockClass);
        for (var i = -1, l = locks.length; ++i < l;) {
            var el = locks[i];
            el.removeAttribute("disabled");
            //this.removeClass(el.parentElement, "notClickable");
            jQuery(el.parentElement).removeClass("notClickable");
            jQuery(".summernote." + lockClass).summernote("enable");
        }
    }

    // end of form validation check + messages + lock *********************************************************************************************

    setEqualHeights(setToCont: string, setFromCont: string, minusPx?: number) {
        if (setFromCont && setToCont) {
            let setFromContHeight = document.getElementById(setFromCont).offsetHeight;
            let setToContHeight = document.getElementById(setToCont).offsetHeight;
            if (minusPx)
                setFromContHeight = setFromContHeight - minusPx;
            if (setToContHeight > setFromContHeight)
                document.getElementById(setToCont).style.height = setFromContHeight + "px";
        }
    }

    hasClass(el: any, name: string) {
        return new RegExp("(?:^|\s+)" + name + "(?:\s+|$)").test(el.className);
    }

    addClass(el: any, name: string) {
        if (!this.hasClass(el, name)) {
            el.className = el.className ? [el.className, name].join(" ") : name;
        }
    }

    removeClass(el: any, name: string) {
        if (this.hasClass(el, name)) {
            el.className = el.className.replace(new RegExp("(?:^|\s+)" + name + "(?:\s+|$)", "g"), "");
        }
    }

    //find ancestor with specific class with js
    findAncestor(el:any, cls:any) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

    //set single date for view
    public _setSingleDateForView(d: any, dateFormatBasic: string) {
        if (d !== null && d)
            return moment(moment(new Date(d))).format(dateFormatBasic);
        return null;
    }
    //set single date for view
    public _setSingleDateForSave(d: any, dateFormatBasic: string) {
        if (d !== null && d)
            return  moment(d, dateFormatBasic).format();
        return null;
    }
}