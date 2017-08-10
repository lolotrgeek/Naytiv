"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var services_1 = require("../services");
var enums = require("ui/enums");
var imageSource = require("image-source");
var camera = require("nativescript-camera");
var imageModule = require("ui/image");
var img;
var ListDetailComponent = (function () {
    function ListDetailComponent(route, router, ngZone, firebaseService, utilsService) {
        this.route = route;
        this.router = router;
        this.ngZone = ngZone;
        this.firebaseService = firebaseService;
        this.utilsService = utilsService;
    }
    ListDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        camera.requestPermissions();
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.firebaseService.getMyList(_this.id).subscribe(function (list) {
                _this.ngZone.run(function () {
                    for (var prop in list) {
                        //props
                        if (prop === "id") {
                            _this.id = list[prop];
                        }
                        if (prop === "name") {
                            _this.name = list[prop];
                        }
                        if (prop === "description") {
                            _this.description = list[prop];
                        }
                        if (prop === "imagepath") {
                            _this.imagepath = list[prop];
                        }
                    }
                });
            });
        });
    };
    ListDetailComponent.prototype.takePhoto = function () {
        var _this = this;
        var options = {
            width: 300,
            height: 300,
            keepAspectRatio: true,
            saveToGallery: true
        };
        camera.takePicture(options)
            .then(function (imageAsset) {
            imageSource.fromAsset(imageAsset).then(function (res) {
                _this.image = res;
                //save the source image to a file, then send that file path to firebase
                _this.saveToFile(_this.image);
            });
        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
    };
    ListDetailComponent.prototype.saveToFile = function (res) {
        var imgsrc = res;
        this.imagePath = this.utilsService.documentsPath("photo-" + Date.now() + ".png");
        imgsrc.saveToFile(this.imagePath, enums.ImageFormat.png);
    };
    ListDetailComponent.prototype.editList = function (id) {
        var _this = this;
        if (this.image) {
            //upload the file, then save all
            this.firebaseService.uploadFile(this.imagePath).then(function (uploadedFile) {
                _this.uploadedImageName = uploadedFile.name;
                //get downloadURL and store it as a full path;
                _this.firebaseService.getDownloadUrl(_this.uploadedImageName).then(function (downloadUrl) {
                    _this.firebaseService.editList(id, _this.description, downloadUrl).then(function (result) {
                        alert(result);
                    }, function (error) {
                        alert(error);
                    });
                });
            }, function (error) {
                alert('File upload error: ' + error);
            });
        }
        else {
            //just edit the description
            this.firebaseService.editDescription(id, this.description).then(function (result) {
                alert(result);
            }, function (error) {
                alert(error);
            });
        }
    };
    return ListDetailComponent;
}());
ListDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "gf-list-detail",
        templateUrl: "list-detail.html"
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        core_1.NgZone,
        services_1.FirebaseService,
        services_1.UtilsService])
], ListDetailComponent);
exports.ListDetailComponent = ListDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGlzdC1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdEO0FBRXhELDBDQUF1RDtBQUN2RCx3Q0FBNEQ7QUFFNUQsZ0NBQWtDO0FBQ2xDLDBDQUE0QztBQUk1Qyw0Q0FBOEM7QUFHOUMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RDLElBQUksR0FBRyxDQUFDO0FBT1IsSUFBYSxtQkFBbUI7SUFhOUIsNkJBQ2MsS0FBcUIsRUFDckIsTUFBYyxFQUNkLE1BQWMsRUFDZCxlQUFnQyxFQUNoQyxZQUEwQjtRQUoxQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUNuQyxDQUFDO0lBRVAsc0NBQVEsR0FBUjtRQUFBLGlCQXdCRTtRQXZCQSxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQVc7WUFDaEQsS0FBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQUk7Z0JBQ3JELEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO29CQUNkLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLE9BQU87d0JBQ1AsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLElB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Q0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDSixDQUFDLEVBQUUsVUFBQyxLQUFVO2dCQUNaLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNULENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNKLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQVU7Z0JBQ3RFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNqQixDQUFDLEVBQUUsVUFBQyxLQUFVO2dCQUNWLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRUQsMEJBQUM7QUFBRCxDQUFDLEFBcEdELElBb0dDO0FBcEdZLG1CQUFtQjtJQUwvQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLGtCQUFrQjtLQUNoQyxDQUFDO3FDQWVxQix1QkFBYztRQUNiLGVBQU07UUFDTixhQUFNO1FBQ0csMEJBQWU7UUFDbEIsdUJBQVk7R0FsQjdCLG1CQUFtQixDQW9HL0I7QUFwR1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQge1JvdXRlciwgQWN0aXZhdGVkUm91dGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSwgVXRpbHNTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzXCI7XHJcbmltcG9ydCB7TGlzdH0gZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tICd1aS9lbnVtcyc7XHJcbmltcG9ydCAqIGFzIGltYWdlU291cmNlIGZyb20gJ2ltYWdlLXNvdXJjZSc7XHJcbmltcG9ydCB7IGlzQW5kcm9pZCB9IGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xyXG5cclxuaW1wb3J0ICogYXMgY2FtZXJhIGZyb20gXCJuYXRpdmVzY3JpcHQtY2FtZXJhXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmaWxlLXN5c3RlbVwiO1xyXG5cclxudmFyIGltYWdlTW9kdWxlID0gcmVxdWlyZShcInVpL2ltYWdlXCIpO1xyXG52YXIgaW1nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICBzZWxlY3RvcjogXCJnZi1saXN0LWRldGFpbFwiLFxyXG4gIHRlbXBsYXRlVXJsOiBcImxpc3QtZGV0YWlsLmh0bWxcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlzdERldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgXHJcbiAgaWQ6IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBpbWFnZXBhdGg6IHN0cmluZztcclxuICBpbWFnZTogYW55O1xyXG4gIHByaXZhdGUgc3ViOiBhbnk7XHJcbiAgcHJpdmF0ZSBpbWFnZVBhdGg6IHN0cmluZztcclxuICBwcml2YXRlIHVwbG9hZGVkSW1hZ2VOYW1lOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSB1cGxvYWRlZEltYWdlUGF0aDogc3RyaW5nO1xyXG4gIHB1YmxpYyBsaXN0OiBPYnNlcnZhYmxlPGFueT47XHJcbiAgXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZVxyXG4gICAgKSB7fVxyXG5cclxuIG5nT25Jbml0KCkge1xyXG4gICBjYW1lcmEucmVxdWVzdFBlcm1pc3Npb25zKCk7XHJcbiAgIHRoaXMuc3ViID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKChwYXJhbXM6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLmlkID0gcGFyYW1zWydpZCddO1xyXG4gICAgICB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRNeUxpc3QodGhpcy5pZCkuc3Vic2NyaWJlKChsaXN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gbGlzdCkge1xyXG4gICAgICAgICAgICAvL3Byb3BzXHJcbiAgICAgICAgICAgIGlmIChwcm9wID09PSBcImlkXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLmlkID0gbGlzdFtwcm9wXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gXCJuYW1lXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLm5hbWUgPSBsaXN0W3Byb3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9wID09PSBcImRlc2NyaXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gbGlzdFtwcm9wXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gXCJpbWFnZXBhdGhcIikge1xyXG4gICAgICAgICAgICAgIHRoaXMuaW1hZ2VwYXRoID0gbGlzdFtwcm9wXTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7ICBcclxuICB9XHJcblxyXG50YWtlUGhvdG8oKSB7XHJcbiAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMzAwLFxyXG4gICAgICAgICAgICBrZWVwQXNwZWN0UmF0aW86IHRydWUsXHJcbiAgICAgICAgICAgIHNhdmVUb0dhbGxlcnk6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgY2FtZXJhLnRha2VQaWN0dXJlKG9wdGlvbnMpXHJcbiAgICAgICAgLnRoZW4oaW1hZ2VBc3NldCA9PiB7XHJcbiAgICAgICAgICAgIGltYWdlU291cmNlLmZyb21Bc3NldChpbWFnZUFzc2V0KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgLy9zYXZlIHRoZSBzb3VyY2UgaW1hZ2UgdG8gYSBmaWxlLCB0aGVuIHNlbmQgdGhhdCBmaWxlIHBhdGggdG8gZmlyZWJhc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVRvRmlsZSh0aGlzLmltYWdlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLT4gXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcbnNhdmVUb0ZpbGUocmVzKXtcclxuICBsZXQgaW1nc3JjID0gcmVzO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VQYXRoID0gdGhpcy51dGlsc1NlcnZpY2UuZG9jdW1lbnRzUGF0aChgcGhvdG8tJHtEYXRlLm5vdygpfS5wbmdgKTtcclxuICAgICAgICBpbWdzcmMuc2F2ZVRvRmlsZSh0aGlzLmltYWdlUGF0aCwgZW51bXMuSW1hZ2VGb3JtYXQucG5nKTsgICAgICAgXHJcbn1cclxuXHJcblxyXG5lZGl0TGlzdChpZDogc3RyaW5nKXtcclxuICBpZih0aGlzLmltYWdlKXtcclxuICAgIC8vdXBsb2FkIHRoZSBmaWxlLCB0aGVuIHNhdmUgYWxsXHJcbiAgICB0aGlzLmZpcmViYXNlU2VydmljZS51cGxvYWRGaWxlKHRoaXMuaW1hZ2VQYXRoKS50aGVuKCh1cGxvYWRlZEZpbGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy51cGxvYWRlZEltYWdlTmFtZSA9IHVwbG9hZGVkRmlsZS5uYW1lO1xyXG4gICAgICAgICAgLy9nZXQgZG93bmxvYWRVUkwgYW5kIHN0b3JlIGl0IGFzIGEgZnVsbCBwYXRoO1xyXG4gICAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0RG93bmxvYWRVcmwodGhpcy51cGxvYWRlZEltYWdlTmFtZSkudGhlbigoZG93bmxvYWRVcmw6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZpcmViYXNlU2VydmljZS5lZGl0TGlzdChpZCx0aGlzLmRlc2NyaXB0aW9uLGRvd25sb2FkVXJsKS50aGVuKChyZXN1bHQ6YW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgYWxlcnQocmVzdWx0KVxyXG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcclxuICAgICAgICAgIGFsZXJ0KCdGaWxlIHVwbG9hZCBlcnJvcjogJyArIGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICAvL2p1c3QgZWRpdCB0aGUgZGVzY3JpcHRpb25cclxuICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmVkaXREZXNjcmlwdGlvbihpZCx0aGlzLmRlc2NyaXB0aW9uKS50aGVuKChyZXN1bHQ6YW55KSA9PiB7XHJcbiAgICAgICAgYWxlcnQocmVzdWx0KVxyXG4gICAgfSwgKGVycm9yOiBhbnkpID0+IHtcclxuICAgICAgICBhbGVydChlcnJvcik7XHJcbiAgICB9KTtcclxuICB9ICAgIFxyXG59XHJcblxyXG59Il19