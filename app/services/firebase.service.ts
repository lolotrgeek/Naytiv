import {Injectable, NgZone} from "@angular/core";
import {User, List} from "../models";
import { BackendService } from "./backend.service";
import firebase = require("nativescript-plugin-firebase");
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UtilsService} from './utils.service';
import 'rxjs/add/operator/share';

@Injectable()
export class FirebaseService {
  constructor(
    private ngZone: NgZone,
    private utils: UtilsService
  ){}
  
  items: BehaviorSubject<Array<List>> = new BehaviorSubject([]);
  
  private _allItems: Array<List> = [];
  
  register(user: User) {
    return firebase.createUser({
      email: user.email,
      password: user.password
    }).then(
          function (result:any) {
            return JSON.stringify(result);
          },
          function (errorMessage:any) {
            alert(errorMessage);
          }
      )
  }

  login(user: User) {
    return firebase.login({
      type: firebase.LoginType.PASSWORD,
      email: user.email,
      password: user.password
    }).then((result: any) => {
          BackendService.token = result.uid;
          return JSON.stringify(result);
      }, (errorMessage: any) => {
        alert(errorMessage);
      });
  }

  loginFacebook(){
    return  firebase.login({
      type: firebase.LoginType.FACEBOOK,
      // Optional
      facebookOptions: {
        // defaults to ['public_profile', 'email']
        scope: ['public_profile', 'email']
      }
    }).then(
        (result: any) => {
          BackendService.token = result.uid;
          return JSON.stringify(result);
        },
        (errorMessage: any) => {
          console.log(errorMessage);
        }
    );
  }

  loginGoogle(){
    return firebase.login({
      type: firebase.LoginType.GOOGLE
    }).then(
        function (result) {
          JSON.stringify(result);
        },
        function (errorMessage) {
          console.log(errorMessage);
          alert(errorMessage);
        }
    );
  }

  logout(){
    BackendService.token = "";
    firebase.logout();    
  }
  
  resetPassword(email) {
    return firebase.resetPassword({
    email: email
    }).then((result: any) => {
          alert(JSON.stringify(result));
        },
        function (errorMessage:any) {
          alert(errorMessage);
        }
    ).catch(this.handleErrors);
  }

  getMyWishList(): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'Lists';
      
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot(snapshot.value);
            console.log(JSON.stringify(results))
             observer.next(results);
          });
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).share();              
  }

  getMyList(id: string): Observable<any> {
    return new Observable((observer: any) => {
      observer.next(this._allItems.filter(s => s.id === id)[0]);
    }).share();
  }

  getMyName(){
    firebase.getCurrentUser().then(userdata => {
      return userdata.name;
    }, error => {
      alert("Trouble in paradise: " + error);
    });
  }

  getMyEmail(){
    firebase.getCurrentUser().then(userdata => {
      return userdata.email;
      
    }, error => {
      alert("Trouble in paradise: " + error);
    });
  }
  getMyMessage(): Observable<any>{
    return new Observable((observer:any) => {
      firebase.getRemoteConfig({
      developerMode: false, // play with this boolean to get more frequent updates during development
      cacheExpirationSeconds: 300, // 10 minutes, default is 12 hours.. set to a lower value during dev
      properties: [{
      key: "message",
      default: "Default Message!"
    }]
  }).then(
        function (result) {
          console.log("Fetched at " + result.lastFetch + (result.throttled ? " (throttled)" : ""));
          for (let entry in result.properties) 
            { 
              observer.next(result.properties[entry]);
            }
          }
      );
    }).share();
  }

  handleSnapshot(data: any) {
    //empty array, then refill and filter
    this._allItems = [];
    if (data) {
      for (let id in data) {        
        let result = (<any>Object).assign({id: id}, data[id]);
        if(BackendService.token === result.UID){
          this._allItems.push(result);
        }        
      }
      this.publishUpdates();
    }
    return this._allItems;
  }

   publishUpdates() {
    // here, we sort must emit a *new* value (immutability!)
    this._allItems.sort(function(a, b){
        if(a.date < b.date) return -1;
        if(a.date > b.date) return 1;
      return 0;
    })
    this.items.next([...this._allItems]);
  }

  add(list: string) {   
    return firebase.push(
        "/Lists",
        { "name": list, "UID": BackendService.token, "date": 0 - Date.now(), "imagepath": ""}
      ).then(
        function (result:any) {
          return 'Added to the list!';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        }); 
  }

  editList(id:string, description: string, imagepath: string){
    this.publishUpdates();
    return firebase.update("/Lists/"+id+"",{
        description: description, 
        imagepath: imagepath})
      .then(
        function (result:any) {
          return 'You have successfully edited this list!';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        });  
  }
  editDescription(id:string, description: string){
    this.publishUpdates();
    return firebase.update("/Lists/"+id+"",{
        description: description})
      .then(
        function (result:any) {
          return 'You have successfully edited the description!';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        });  
  }
  delete(list: List) {
    return firebase.remove("/Lists/"+list.id+"")
      .catch(this.handleErrors);
  }
  
  uploadFile(localPath: string, file?: any): Promise<any> {
      let filename = this.utils.getFilename(localPath);
      let remotePath = `${filename}`;   
      return firebase.uploadFile({
        remoteFullPath: remotePath,
        localFullPath: localPath,
        onProgress: function(status) {
            console.log("Uploaded fraction: " + status.fractionCompleted);
            console.log("Percentage complete: " + status.percentageCompleted);
        }
      });
  }

  getDownloadUrl(remoteFilePath: string): Promise<any> {
      return firebase.getDownloadUrl({
        remoteFullPath: remoteFilePath})
      .then(
        function (url:string) {
          return url;
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        });
}

  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }
}