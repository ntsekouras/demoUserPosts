import { Injectable } from '@angular/core';

@Injectable()
export class FilterTextService {
    constructor() { }

    filter(data: string, props: Array<string>, originalList: Array<any>) {
        let filteredList: any[];
        if (data && props && originalList) {
            data = data.toLowerCase();
            let filtered = originalList.filter(item => {
                let match = false;
                for (let prop of props) {
                    let patt = new RegExp(data, "g");
                    if (patt.test(item[prop].toString().toLowerCase())) {
                        match = true;
                        break;
                    }
                };
                return match;
            });
            filteredList = filtered;
        }
        else {
            filteredList = originalList;
        }
        return filteredList;
    }
}
