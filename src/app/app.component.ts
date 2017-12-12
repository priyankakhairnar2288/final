import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { OrderByPipe } from './order-by.pipe';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as _ from 'underscore';


import { PagerService } from './_services/index';

@Component({
    moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

    constructor(private http: Http, private pagerService: PagerService) { }

    // array of all items to be paged
    private allItems: any[];

    // pager object
    pager: any = {};
    private selectedList: any[];
    // paged items
    pagedItems: any[];
    // Declare local variable
direction: number;
column: string;
isDesc = false;
    ngOnInit() {

        // get dummy data
        this.http.get('https://themanojshukla.github.io/mockdata.json')
            .map((response: Response) => response.json())
            .subscribe(data => {
                // set items to json response
                this.allItems = data;

                // initialize to page 1
                this.setPage(1);
            });
    }

sort(property) {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
}
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    expandToggle(index: number) {
        // if ($('#table tr.parent').eq(index).find('.salary-details').hasClass('hide')) {
        //     $('#table tr.parent').eq(index).find('.expand').html('-');
        // }else{
        //      $('#table tr.parent').eq(index).find('.expand').html('+');
        // }
         $('*[data-index=' + index + ']').hasClass('hide') ?
           $('*[data-expand=' + index + ']').html('-') : $('*[data-expand=' + index + ']').html('+') ;
        $('*[data-index=' + index + ']').toggleClass('hide');
    }
    // delete record

    deleteUser(id: any) {
        const url = `${'https://themanojshukla.github.io/mockdata.json'}/${id}`;
        return this.http.delete(url)
            .map(res => res.json());
    }
    deleteItem(data: any) {
        if (confirm('Are you sure?')) {
            const url = `${'https://themanojshukla.github.io/mockdata.json'}/${data.id}`;

            const index = this.pagedItems.indexOf(data.id);
            this.pagedItems.splice(index, 1);

            this.deleteUser(data.id)
                .subscribe(null,
                err => {
                    alert('Could not delete user.due to access control issue');
                    // Revert the view back to its original state
                    this.pagedItems.splice(index, 0, data);
                });
        }


    }

    
}
