"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var fs = require("file-system");
var UtilsService = (function () {
    function UtilsService() {
    }
    UtilsService.prototype.getFilename = function (path) {
        var parts = path.split('/');
        return parts[parts.length - 1];
    };
    UtilsService.prototype.documentsPath = function (filename) {
        return fs.knownFolders.documents().path + "/" + filename;
    };
    return UtilsService;
}());
UtilsService = __decorate([
    core_1.Injectable()
], UtilsService);
exports.UtilsService = UtilsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUQ7QUFDakQsZ0NBQWtDO0FBR2xDLElBQWEsWUFBWTtJQUF6QjtJQVVBLENBQUM7SUFSUSxrQ0FBVyxHQUFsQixVQUFtQixJQUFZO1FBQzdCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTSxvQ0FBYSxHQUFwQixVQUFxQixRQUFnQjtRQUNuQyxNQUFNLENBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLFNBQUksUUFBVSxDQUFDO0lBQzNELENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksWUFBWTtJQUR4QixpQkFBVSxFQUFFO0dBQ0EsWUFBWSxDQVV4QjtBQVZZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmaWxlLXN5c3RlbSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBVdGlsc1NlcnZpY2Uge1xyXG5cclxuICBwdWJsaWMgZ2V0RmlsZW5hbWUocGF0aDogc3RyaW5nKSB7XHJcbiAgICBsZXQgcGFydHMgPSBwYXRoLnNwbGl0KCcvJyk7XHJcbiAgICByZXR1cm4gcGFydHNbcGFydHMubGVuZ3RoIC0gMV07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZG9jdW1lbnRzUGF0aChmaWxlbmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gYCR7ZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpLnBhdGh9LyR7ZmlsZW5hbWV9YDtcclxuICB9XHJcbn1cclxuIl19