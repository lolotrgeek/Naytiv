import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Page} from "ui/page";
import {BackendService, FirebaseService} from "../services";
import {List} from "../models";
import {RouterExtensions} from 'nativescript-angular/router/router-extensions';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: "gf-list",
  templateUrl: "list.html"
})
export class ListComponent implements OnInit {

  id: string;
  name: string;
  date: string;
  description: string;
  imagepath: string;
  UID: string;
  public list: List;

  public displayEmail: string;

  public lists$: Observable<any>;
  public message$: Observable<any>;
  
  constructor(private routerExtensions: RouterExtensions,
    private firebaseService: FirebaseService,
    private router: Router
    ) {}

ngOnInit(){
  this.lists$ = <any>this.firebaseService.getMyWishList();
  this.message$ = <any>this.firebaseService.getMyMessage();
  this.displayEmail = <any>this.firebaseService.getMyEmail();
}

  add() {
     this.list = new List(
      this.id,
      this.name,
      this.date,
      this.description,
      this.imagepath,
      this.UID)
    let myList:string = this.list.name;
    this.firebaseService.add(myList).then((message:any) => {
      this.name = "";
      alert(message);
    })   
    
  }

  delete(list: List) {
    this.firebaseService.delete(list)
      .catch(() => {
        alert("An error occurred while deleting an item from your list.");
      });
  }

  viewDetail(id: string){
    this.router.navigate(["/list-detail", id]);
  }

  logout() {
    this.firebaseService.logout();
    this.routerExtensions.navigate(["/login"], { clearHistory: true } );
  }
}

