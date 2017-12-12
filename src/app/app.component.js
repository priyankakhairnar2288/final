"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
var http_1 = require("@angular/http");
var index_1 = require("./_services/index");
var AppComponent = /** @class */ (function () {
    function AppComponent(http, pagerService) {
        this.http = http;
        this.pagerService = pagerService;
        // pager object
        this.pager = {};
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get dummy data
        this.http.get('https://themanojshukla.github.io/mockdata.json')
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            // set items to json response
            _this.allItems = data;
            // initialize to page 1
            _this.setPage(1);
        });
    };
    AppComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);
        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    AppComponent.prototype.expandToggle = function (index) {
        // if ($('#table tr.parent').eq(index).find('.salary-details').hasClass('hide')) {
        //     $('#table tr.parent').eq(index).find('.expand').html('-');
        // }else{
        //      $('#table tr.parent').eq(index).find('.expand').html('+');
        // }
        $('#table tr.parent').eq(index).find('.salary-details').toggleClass('hide');
    };
    // delete record
    AppComponent.prototype.deleteUser = function (id) {
        var url = 'https://themanojshukla.github.io/mockdata.json' + "/" + id;
        return this.http.delete(url)
            .map(function (res) { return res.json(); });
    };
    AppComponent.prototype.deleteItem = function (data) {
        var _this = this;
        if (confirm('Are you sure?')) {
            var url = 'https://themanojshukla.github.io/mockdata.json' + "/" + data.id;
            var index_2 = this.pagedItems.indexOf(data.id);
            this.pagedItems.splice(index_2, 1);
            this.deleteUser(data.id)
                .subscribe(null, function (err) {
                alert('Could not delete user.due to access control issue');
                // Revert the view back to its original state
                _this.pagedItems.splice(index_2, 0, data);
            });
        }
    };
    //sorting table column
    AppComponent.prototype.sortTable = function (n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("table");
        switching = true;
        // Set the sorting direction to ascending:
        dir = "asc";
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.getElementsByTagName("TR");
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                /* Check if the two rows should switch place,
                based on the direction, asc or desc: */
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
                else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                // Each time a switch is done, increase this count by 1:
                switchcount++;
            }
            else {
                /* If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again. */
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [http_1.Http, index_1.PagerService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map