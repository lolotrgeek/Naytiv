"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var services_1 = require("../services");
var models_1 = require("../models");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var router_1 = require("@angular/router");
var ListComponent = (function () {
    function ListComponent(routerExtensions, firebaseService, router) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.router = router;
    }
    ListComponent.prototype.ngOnInit = function () {
        this.lists$ = this.firebaseService.getMyWishList();
        this.message$ = this.firebaseService.getMyMessage();
        this.displayEmail = this.firebaseService.getMyEmail();
    };
    ListComponent.prototype.add = function () {
        var _this = this;
        this.list = new models_1.List(this.id, this.name, this.date, this.description, this.imagepath, this.UID);
        var myList = this.list.name;
        this.firebaseService.add(myList).then(function (message) {
            _this.name = "";
            alert(message);
        });
    };
    ListComponent.prototype.delete = function (list) {
        this.firebaseService.delete(list)
            .catch(function () {
            alert("An error occurred while deleting an item from your list.");
        });
    };
    ListComponent.prototype.viewDetail = function (id) {
        this.router.navigate(["/list-detail", id]);
    };
    ListComponent.prototype.logout = function () {
        this.firebaseService.logout();
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
    };
    return ListComponent;
}());
ListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "gf-list",
        templateUrl: "list.html"
    }),
    __metadata("design:paramtypes", [router_extensions_1.RouterExtensions,
        services_1.FirebaseService,
        router_1.Router])
], ListComponent);
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRDtBQUdoRCx3Q0FBNEQ7QUFDNUQsb0NBQStCO0FBQy9CLG1GQUErRTtBQUMvRSwwQ0FBdUM7QUFPdkMsSUFBYSxhQUFhO0lBZXhCLHVCQUFvQixnQkFBa0MsRUFDNUMsZUFBZ0MsRUFDaEMsTUFBYztRQUZKLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDNUMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDbkIsQ0FBQztJQUVSLGdDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFRLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLFFBQVEsR0FBUSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pELElBQUksQ0FBQyxZQUFZLEdBQVEsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM3RCxDQUFDO0lBRUMsMkJBQUcsR0FBSDtRQUFBLGlCQWNDO1FBYkUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGFBQUksQ0FDbkIsSUFBSSxDQUFDLEVBQUUsRUFDUCxJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFNBQVMsRUFDZCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDWCxJQUFJLE1BQU0sR0FBVSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFXO1lBQ2hELEtBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFBO0lBRUosQ0FBQztJQUVELDhCQUFNLEdBQU4sVUFBTyxJQUFVO1FBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQzlCLEtBQUssQ0FBQztZQUNMLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGtDQUFVLEdBQVYsVUFBVyxFQUFVO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELDhCQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBRSxDQUFDO0lBQ3RFLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUF6REQsSUF5REM7QUF6RFksYUFBYTtJQUx6QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFdBQVcsRUFBRSxXQUFXO0tBQ3pCLENBQUM7cUNBZ0JzQyxvQ0FBZ0I7UUFDM0IsMEJBQWU7UUFDeEIsZUFBTTtHQWpCYixhQUFhLENBeUR6QjtBQXpEWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHtCYWNrZW5kU2VydmljZSwgRmlyZWJhc2VTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXNcIjtcclxuaW1wb3J0IHtMaXN0fSBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyL3JvdXRlci1leHRlbnNpb25zJztcclxuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHNlbGVjdG9yOiBcImdmLWxpc3RcIixcclxuICB0ZW1wbGF0ZVVybDogXCJsaXN0Lmh0bWxcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIGlkOiBzdHJpbmc7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGRhdGU6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGltYWdlcGF0aDogc3RyaW5nO1xyXG4gIFVJRDogc3RyaW5nO1xyXG4gIHB1YmxpYyBsaXN0OiBMaXN0O1xyXG5cclxuICBwdWJsaWMgZGlzcGxheUVtYWlsOiBzdHJpbmc7XHJcblxyXG4gIHB1YmxpYyBsaXN0cyQ6IE9ic2VydmFibGU8YW55PjtcclxuICBwdWJsaWMgbWVzc2FnZSQ6IE9ic2VydmFibGU8YW55PjtcclxuICBcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICBwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxyXG4gICAgKSB7fVxyXG5cclxubmdPbkluaXQoKXtcclxuICB0aGlzLmxpc3RzJCA9IDxhbnk+dGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0TXlXaXNoTGlzdCgpO1xyXG4gIHRoaXMubWVzc2FnZSQgPSA8YW55PnRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldE15TWVzc2FnZSgpO1xyXG4gIHRoaXMuZGlzcGxheUVtYWlsID0gPGFueT50aGlzLmZpcmViYXNlU2VydmljZS5nZXRNeUVtYWlsKCk7XHJcbn1cclxuXHJcbiAgYWRkKCkge1xyXG4gICAgIHRoaXMubGlzdCA9IG5ldyBMaXN0KFxyXG4gICAgICB0aGlzLmlkLFxyXG4gICAgICB0aGlzLm5hbWUsXHJcbiAgICAgIHRoaXMuZGF0ZSxcclxuICAgICAgdGhpcy5kZXNjcmlwdGlvbixcclxuICAgICAgdGhpcy5pbWFnZXBhdGgsXHJcbiAgICAgIHRoaXMuVUlEKVxyXG4gICAgbGV0IG15TGlzdDpzdHJpbmcgPSB0aGlzLmxpc3QubmFtZTtcclxuICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmFkZChteUxpc3QpLnRoZW4oKG1lc3NhZ2U6YW55KSA9PiB7XHJcbiAgICAgIHRoaXMubmFtZSA9IFwiXCI7XHJcbiAgICAgIGFsZXJ0KG1lc3NhZ2UpO1xyXG4gICAgfSkgICBcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgZGVsZXRlKGxpc3Q6IExpc3QpIHtcclxuICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmRlbGV0ZShsaXN0KVxyXG4gICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIGFsZXJ0KFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZGVsZXRpbmcgYW4gaXRlbSBmcm9tIHlvdXIgbGlzdC5cIik7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdmlld0RldGFpbChpZDogc3RyaW5nKXtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9saXN0LWRldGFpbFwiLCBpZF0pO1xyXG4gIH1cclxuXHJcbiAgbG9nb3V0KCkge1xyXG4gICAgdGhpcy5maXJlYmFzZVNlcnZpY2UubG9nb3V0KCk7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9ICk7XHJcbiAgfVxyXG59XHJcblxyXG4iXX0=