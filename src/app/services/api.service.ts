import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private  http : HttpClient) { }
  urlProfile : string = "https://api.github.com/users/";
  urlSearch : string = "https://api.github.com/search/users";

  getUser(userName : string){
    return this.http.get(this.urlProfile+userName);
 } 

 searchUser(userName:string){
  return this.http.get(this.urlSearch+'?q='+userName);
 }
 
}
